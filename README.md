# Forge AI – Persistent Memory Assistant

<div align="center">

![Python](https://img.shields.io/badge/Python-3.13-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688)
![Gemini](https://img.shields.io/badge/Google-Gemini-black)
![Cognee](https://img.shields.io/badge/Cognee-Semantic%20Memory-purple)
![License](https://img.shields.io/badge/License-MIT-green)

**A semantic memory-powered AI assistant built using Cognee, Google Gemini, and FastAPI.**

Store memories permanently, retrieve them intelligently, and chat with an AI that remembers.

</div>

---

# Overview

Forge AI is a Retrieval-Augmented Generation (RAG) application that combines **Cognee's semantic memory engine** with **Google Gemini** to build an intelligent AI assistant capable of remembering users across conversations.

Unlike traditional chatbots that lose context after every session, Forge stores memories in a semantic vector database and retrieves the most relevant information whenever the user asks a question.

The retrieved memories are injected into the LLM prompt, enabling personalized, context-aware conversations.

---

# Features

- Persistent AI Memory
- Semantic Memory Search
- Context-Aware Conversations
- Google Gemini Integration
- Cognee Memory Engine
- FastAPI REST Backend
- Swagger API Documentation
- Vector Embedding Storage
- Environment-based Configuration
- Clean Modular Architecture

---

# Tech Stack

## Backend

- Python 3.13
- FastAPI
- Cognee
- Google Gemini SDK
- LiteLLM
- Pydantic
- Python-dotenv

## AI Models

### LLM

- Gemini 2.5 Flash

### Embeddings

- Gemini Embedding 001

---

# Architecture

```text
                User
                  │
                  ▼
           React Frontend
                  │
                  ▼
          FastAPI Backend
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
   Cognee Remember      Cognee Recall
        │                   │
        ▼                   ▼
   Vector Database     Semantic Search
        │                   │
        └─────────┬─────────┘
                  ▼
           Prompt Builder
                  ▼
            Google Gemini
                  ▼
             AI Response
```

---

# Project Structure

```text
my-app/

│

├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── assets/
│
├── python/
│   ├── app.py
│   ├── .env
│   ├── requirements.txt
│   └── .data/
│
├── README.md
└── .gitignore
```

---

# API Endpoints

## Store Memory

### POST `/remember`

Stores a memory permanently.

### Request

```json
{
    "text":"My name is Darsh."
}
```

### Response

```json
{
    "success":true
}
```

---

## Chat

### POST `/chat`

Retrieves relevant memories and generates an AI response.

### Request

```json
{
    "message":"What is my name?"
}
```

### Response

```json
{
    "response":"Your name is Darsh."
}
```

---

# Workflow

## Memory Storage

```
User Input

↓

Remember API

↓

Cognee

↓

Embeddings

↓

Vector Database

↓

Persistent Memory
```

---

## Memory Retrieval

```
User Question

↓

Cognee Recall

↓

Semantic Search

↓

Relevant Memories

↓

Prompt Construction

↓

Gemini

↓

AI Response
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/forge-ai.git

cd forge-ai
```

---

## Create Virtual Environment

```bash
python -m venv .venv
```

Windows

```bash
.venv\Scripts\activate
```

macOS/Linux

```bash
source .venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Environment

Create a `.env` file.

```env
GEMINI_API_KEY=YOUR_API_KEY

LLM_PROVIDER=gemini

LLM_MODEL=gemini/gemini-2.5-flash

EMBEDDING_MODEL=gemini/gemini-embedding-001

COGNEE_DATABASE=.data
```

---

## Start Backend

```bash
uvicorn app:app --reload
```

Backend

```
http://127.0.0.1:8000
```

Swagger

```
http://127.0.0.1:8000/docs
```

---

## Start Frontend

```bash
npm install

npm run dev
```

---

# Example Usage

### Save Memory

```
My name is Darsh.

I like AI.

I work as a developer.
```

---

### Ask

```
What is my name?
```

---

### Response

```
Your name is Darsh.
```

---

# Why Cognee?

Cognee provides a semantic memory layer that goes beyond simple keyword matching.

It enables:

- Knowledge graphs
- Semantic search
- Vector indexing
- Persistent memory
- Better retrieval quality
- Memory enrichment

This makes conversations more intelligent and personalized.

---

# Future Improvements

- Authentication
- User Accounts
- Memory Editing
- Memory Deletion
- Conversation History
- File Upload Support
- Voice Input
- Streaming Responses
- Memory Ranking
- Knowledge Graph Visualization
- Docker Deployment
- Cloud Database
- Mobile Responsive UI
- Admin Dashboard

---

# Learning Outcomes

This project demonstrates experience with:

- Retrieval-Augmented Generation (RAG)
- Semantic Search
- Vector Databases
- AI Memory Systems
- Prompt Engineering
- FastAPI Development
- REST APIs
- Google Gemini Integration
- Cognee Framework
- Environment Configuration
- Production Backend Architecture

---

# Acknowledgements

- Google Gemini
- Cognee
- FastAPI
- LiteLLM
- Pydantic

---

# License

MIT License

---

# Author

**Darsh**

AI Engineer • Backend Developer • Building intelligent AI systems with semantic memory.

GitHub: https://github.com/Darsh9906

LinkedIn: https://www.linkedin.com/in/darshbhatt-dev
