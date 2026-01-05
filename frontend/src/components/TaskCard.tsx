import type { Task } from "../types/task.ts";

export function TaskCard({ task }: { task: Task }) {
  return (
    <div
      style={{
        padding: "8px",
        marginBottom: "8px",
        background: "#fff",
        borderRadius: "4px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <strong>{task.title}</strong>
      {task.description && (
        <p style={{ fontSize: "12px" }}>{task.description}</p>
      )}
    </div>
  );
}
