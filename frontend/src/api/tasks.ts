import type { Task } from "../types/task.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API_BASE_URL}/tasks`);
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return res.json();
}

export async function createTask(payload: {
  title: string;
  description?: string;
  status: string;
  position?: number;
}): Promise<Task> {
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create task");
  }

  return res.json();
}
