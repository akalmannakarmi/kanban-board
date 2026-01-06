import type { Task } from "../types/task";
import { loadTasks, saveTasks } from "../utils/storage";
import type { TaskRepository } from "./TaskRepository";

export class LocalTaskRepository implements TaskRepository {
  async load(): Promise<Task[]> {
    return loadTasks();
  }

  async create(task: Task): Promise<Task> {
    const tasks = loadTasks();
    saveTasks([...tasks, task]);
    return task;
  }

  async update(task: Task): Promise<Task> {
    const tasks = loadTasks().map((t) =>
      t.id === task.id ? task : t
    );
    saveTasks(tasks);
    return task;
  }

  async delete(id: string): Promise<void> {
    const tasks = loadTasks().filter((t) => t.id !== id);
    saveTasks(tasks);
  }
}
