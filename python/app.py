"""
Forge AI – FastAPI backend
==========================
Endpoints
---------
POST /remember  – stores text inside Cognee memory
POST /chat      – retrieves relevant memories and sends them to Gemini
"""

import os
import logging

import cognee
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from contextlib import asynccontextmanager
from google import genai as google_genai
from pydantic import BaseModel

# Load environment variables from parent directory's env files to align configuration
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(dotenv_path=os.path.join(parent_dir, ".env.local"))
load_dotenv(dotenv_path=os.path.join(parent_dir, ".env"))
load_dotenv()          # picks up .env (or .env.local when running locally)


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # ── Configure writeable directories to avoid SQLite permissions errors ───
    system_dir = os.path.expanduser("~/.cognee_system")
    cognee.config.system_root_directory(system_dir)
    cognee.config.data_root_directory(os.path.join(system_dir, "data"))

    # ── Configure Gemini LLM & Embedding provider inside Cognee ──────────────
    api_key = os.environ.get("GEMINI_API_KEY", "").strip()
    if api_key:
        raw_model = os.environ.get("GEMINI_MODEL", "gemini-1.5-flash").strip()
        model_name = f"gemini/{raw_model}" if not raw_model.startswith("gemini/") else raw_model

        cognee.config.set_llm_provider("gemini")
        cognee.config.set_llm_model(model_name)
        cognee.config.set_llm_api_key(api_key)

        cognee.config.set_embedding_provider("gemini")
        cognee.config.set_embedding_model("gemini/gemini-embedding-001")
        cognee.config.set_embedding_api_key(api_key)
        logger.info("Cognee initialized and configured with Gemini.")
    else:
        logger.warning("GEMINI_API_KEY not found. Cognee memory ingestion may fail.")

    # ── Run database migrations ──────────────────────────────────────────────
    try:
        await cognee.run_migrations()
        logger.info("Applied relational database migrations successfully.")
    except Exception as exc:
        logger.exception("Failed to run Cognee migrations on startup: %s", exc)

    yield


app = FastAPI(title="Forge AI", version="1.0.0", lifespan=lifespan)



# ---------------------------------------------------------------------------
# Request / response schemas
# ---------------------------------------------------------------------------

class RememberRequest(BaseModel):
    """Payload for POST /remember."""
    text: str


class RememberResponse(BaseModel):
    """Response for POST /remember."""
    success: bool


class ChatRequest(BaseModel):
    """Payload for POST /chat."""
    message: str


class ChatResponse(BaseModel):
    """Response for POST /chat."""
    response: str


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _get_gemini_client() -> google_genai.Client:
    """
    Build and return an authenticated Gemini client.

    Reads GEMINI_API_KEY from the environment. Raises a 500 HTTPException
    (not a 401) so that the key is never mentioned in a client-facing error
    message, preventing accidental exposure.
    """
    api_key = os.environ.get("GEMINI_API_KEY", "").strip()
    if not api_key:
        logger.error("GEMINI_API_KEY is not set or is empty.")
        raise HTTPException(
            status_code=500,
            detail="Server is not configured with a Gemini API key.",
        )
    return google_genai.Client(api_key=api_key)


def _build_prompt(memory_text: str, user_message: str) -> str:
    """
    Combine recalled memories with the user's question into a single prompt.

    The memory block is clearly delimited so the model understands its role
    as background context rather than part of the conversation.
    """
    if memory_text.strip():
        return (
            "You are Forge AI, a helpful assistant with access to the user's "
            "personal memory.\n\n"
            "## Relevant memories\n"
            f"{memory_text}\n\n"
            "## User question\n"
            f"{user_message}"
        )

    # No memories found — answer without context injection
    return (
        "You are Forge AI, a helpful assistant.\n\n"
        f"## User question\n{user_message}"
    )


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@app.post("/remember", response_model=RememberResponse)
async def remember(body: RememberRequest) -> RememberResponse:
    """
    POST /remember
    --------------
    Accepts a JSON body {"text": "..."} and stores the text inside
    Cognee's long-term memory graph.

    Steps
    ~~~~~
    1. Validate that 'text' is non-empty.
    2. Call cognee.remember() -- this ingests the text, runs entity
       extraction and knowledge-graph construction, and persists everything
       to the local Cognee store.
    3. Return {"success": true} on success or raise an HTTP 500 on
       any unexpected error.
    """
    if not body.text.strip():
        raise HTTPException(
            status_code=422,
            detail="'text' must be a non-empty string.",
        )

    try:
        await cognee.remember(body.text)
        logger.info("Stored %d chars in Cognee memory.", len(body.text))
        return RememberResponse(success=True)

    except Exception as exc:
        logger.exception("cognee.remember() failed: %s", exc)
        raise HTTPException(
            status_code=500,
            detail=f"Failed to store memory: {exc}",
        ) from exc


@app.post("/chat", response_model=ChatResponse)
async def chat(body: ChatRequest) -> ChatResponse:
    """
    POST /chat
    ----------
    Accepts a JSON body {"message": "..."} and returns a Gemini-generated
    reply that is grounded in the user's stored Cognee memories.

    Steps
    ~~~~~
    1. Validate that 'message' is non-empty.
    2. Call cognee.recall(message) to retrieve the most semantically
       relevant memories for the incoming question.
    3. Flatten the recall results into a single string block.
    4. Build a prompt that injects the memories as context (via _build_prompt).
    5. Send the prompt to gemini-2.0-flash (or the model set in GEMINI_MODEL)
       using the google-genai SDK.
    6. Return the model's text reply as {"response": "..."}.
    """
    if not body.message.strip():
        raise HTTPException(
            status_code=422,
            detail="'message' must be a non-empty string.",
        )

    # Step 1: Recall relevant memories
    try:
        memories = await cognee.recall(body.message)
        logger.info("Recalled %d memory item(s).", len(memories) if memories else 0)
    except Exception as exc:
        logger.exception("cognee.recall() failed: %s", exc)
        raise HTTPException(
            status_code=500,
            detail=f"Failed to recall memory: {exc}",
        ) from exc

    # Step 2: Flatten recalled memories into plain text
    memory_lines: list[str] = []
    if memories:
        for item in memories:
            # Cognee recall can return strings, dicts, or MemoryEntry objects.
            if isinstance(item, str):
                memory_lines.append(item.strip())
            elif hasattr(item, "text"):
                memory_lines.append(str(item.text).strip())
            elif isinstance(item, dict):
                # Best-effort: join all string values in the dict
                values = " | ".join(
                    str(v) for v in item.values() if isinstance(v, str)
                )
                if values:
                    memory_lines.append(values)

    memory_text = "\n".join(filter(None, memory_lines))

    # Step 3: Build the prompt
    prompt = _build_prompt(memory_text, body.message)

    # Step 4: Call Gemini
    model_name = (
        os.environ.get("GEMINI_MODEL", "gemini-2.0-flash").strip()
        or "gemini-2.0-flash"
    )

    try:
        client = _get_gemini_client()
        gemini_response = client.models.generate_content(
            model=model_name,
            contents=prompt,
        )
        reply = gemini_response.text or ""
        logger.info("Gemini replied with %d chars.", len(reply))
        return ChatResponse(response=reply)

    except HTTPException:
        raise  # re-raise our own 500 from _get_gemini_client()

    except Exception as exc:
        logger.exception("Gemini generate_content() failed: %s", exc)
        raise HTTPException(
            status_code=502,
            detail=f"Gemini API error: {exc}",
        ) from exc


# ---------------------------------------------------------------------------
# Dev entry-point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
