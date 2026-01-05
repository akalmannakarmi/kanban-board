import type { Task } from "../types/task.ts";
import { TaskCard } from "./TaskCard.tsx";

interface Props {
  title: string;
  tasks: Task[];
}

export function Column({ title, tasks }: Props) {
  return (
    <div style={{ flex: 1, padding: "8px", background: "#f4f5f7" }}>
      <h3>{title}</h3>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
