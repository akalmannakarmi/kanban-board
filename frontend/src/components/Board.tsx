import { useState } from "react";
import { COLUMNS } from "../types/kanban";
import type { Task } from "../types/task";
import { Column } from "./Column";

const initialTasks: Task[] = [
  { id: "1", title: "Setup project", status: "todo", position: 0 },
  { id: "2", title: "Design UI", status: "todo", position: 1 },
  { id: "3", title: "Implement backend", status: "in_progress", position: 0 },
  { id: "4", title: "Write README", status: "in_review", position: 0 },
  { id: "5", title: "Deploy app", status: "done", position: 0 },
];

export function Board() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  function moveTask(taskId: string, newStatus: Task["status"], newIndex: number) {
    setTasks((prev) => {
      const task = prev.find((t) => t.id === taskId);
      if (!task) return prev;

      const remaining = prev.filter((t) => t.id !== taskId);
      const target = remaining.filter((t) => t.status === newStatus);

      target.splice(newIndex, 0, { ...task, status: newStatus });

      const others = remaining.filter((t) => t.status !== newStatus);

      return [...others, ...target].map((t, index) => ({
        ...t,
        position: index,
      }));
    });
  }

  return (
    <main className="flex-1 p-6">
      <div className="grid grid-cols-4 gap-6 h-full">
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            title={col.title}
            columnId={col.id}
            tasks={tasks
              .filter((t) => t.status === col.id)
              .sort((a, b) => a.position - b.position)}
            draggedTaskId={draggedTaskId}
            setDraggedTaskId={setDraggedTaskId}
            moveTask={moveTask}
          />
        ))}
      </div>
    </main>
  );
}
