import { useEffect, useState } from "react";
import type { Task } from "../types/task.ts";
import { fetchTasks, createTask } from "../api/tasks.ts";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  async function addTask(title: string, status: Task["status"]) {
    const newTask = await createTask({
      title,
      status,
      position: tasks.length,
    });
    setTasks((prev) => [...prev, newTask]);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    addTask,
  };
}
