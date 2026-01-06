import type { Task } from "../types/task";

export interface TaskRepository {
  load(): Promise<Task[]>;
  create(task: Task): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
}
