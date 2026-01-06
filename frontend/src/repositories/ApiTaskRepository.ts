import type { Task } from "../types/task";
import type { TaskRepository } from "./TaskRepository";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export class ApiTaskRepository implements TaskRepository {
  async load(): Promise<Task[]> {
    const res = await fetch(`${API_URL}/tasks`);
    if (!res.ok) throw new Error("Failed to load tasks");
    return res.json();
  }

  async create(task: Task): Promise<Task> {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error("Failed to create task");
    return res.json();
  }

  async update(task: Task): Promise<Task> {
    const res = await fetch(`${API_URL}/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
  }

  async delete(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete task");
  }
}
