import { useTasks } from "../hooks/useTasks.ts";
import { Column } from "./Column.tsx";

export function Board() {
  const { tasks, loading, error } = useTasks();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const todo = tasks.filter((t) => t.status === "todo");
  const inProgress = tasks.filter((t) => t.status === "in_progress");
  const done = tasks.filter((t) => t.status === "done");

  return (
    <div style={{ display: "flex", gap: "16px", padding: "16px" }}>
      <Column title="To Do" tasks={todo} />
      <Column title="In Progress" tasks={inProgress} />
      <Column title="Done" tasks={done} />
    </div>
  );
}
