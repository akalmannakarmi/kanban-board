export type TaskStatus =
  | "todo"
  | "in_progress"
  | "in_review"
  | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  position: number;
  created_at: string;
  updated_at: string;
}
