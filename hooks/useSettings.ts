"use client";

import { useState } from "react";

export function useSettings() {
  const [theme, setTheme] = useState("dark");

  return {
    theme,
    setTheme,
  };
}