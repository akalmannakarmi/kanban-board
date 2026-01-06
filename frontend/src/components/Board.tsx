import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import type { Task, TaskStatus } from "../types/task";
import { loadTasks, saveTasks } from "../utils/storage";
import { COLUMNS } from "../types/kanban";
import { Column } from "./Column";
import { TaskEditor } from "./TaskEditor";

export function Board() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = loadTasks();
    return stored.length ? stored : [];
  });

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  useEffect(() => saveTasks(tasks), [tasks]);

  function openNewTask(status: TaskStatus) {
    const now = new Date().toISOString();

    setActiveTask({
      id: nanoid(),
      title: "",
      description: "",
      status,
      position: tasks.filter((t) => t.status === status).length,
      created_at: now,
      updated_at: now,
    });
  }

  function saveTask(task: Task) {
    setTasks((prev) => {
      const exists = prev.some((t) => t.id === task.id);
      return exists
        ? prev.map((t) => (t.id === task.id ? task : t))
        : [...prev, task];
    });
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function moveTask(taskId: string, status: TaskStatus, index: number) {
    setTasks((prev) => {
      const task = prev.find((t) => t.id === taskId);
      if (!task) return prev;

      const remaining = prev.filter((t) => t.id !== taskId);
      const target = remaining.filter((t) => t.status === status);

      target.splice(index, 0, { ...task, status });

      const others = remaining.filter((t) => t.status !== status);

      return [...others, ...target].map((t, i) => ({
        ...t,
        position: i,
        updated_at: new Date().toISOString(),
      }));
    });
  }

  return (
    <>
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
              onAdd={() => openNewTask(col.id)}
              onEdit={setActiveTask}
              draggedTaskId={draggedTaskId}
              setDraggedTaskId={setDraggedTaskId}
              moveTask={moveTask}
            />
          ))}
        </div>
      </main>

      {activeTask && (
        <TaskEditor
          task={activeTask}
          onSave={saveTask}
          onDelete={tasks.some((t) => t.id === activeTask.id) ? deleteTask : undefined}
          onClose={() => setActiveTask(null)}
        />
      )}
    </>
  );
}

