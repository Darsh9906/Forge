"use client";

import { useMutation } from "@tanstack/react-query";
import { remember, recall } from "@/services/memory-service";

export function useRemember() {
  return useMutation({
    mutationFn: remember,
  });
}

export function useRecall() {
  return useMutation({
    mutationFn: recall,
  });
}