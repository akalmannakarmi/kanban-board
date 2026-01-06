import { useEffect, useMemo, useState } from "react";
import type { Task, TaskStatus } from "../types/task";
import { COLUMNS } from "../types/kanban";
import { Column } from "./Column";
import { TaskEditor } from "./TaskEditor";
import type { DataMode } from "../App";

import { LocalTaskRepository } from "../repositories/LocalTaskRepository";
import { ApiTaskRepository } from "../repositories/ApiTaskRepository";

const localRepo = new LocalTaskRepository();
const apiRepo = new ApiTaskRepository();

export function Board({ mode }: { mode: DataMode }) {
  const repo = useMemo(
    () => (mode === "local" ? localRepo : apiRepo),
    [mode]
  );

  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  useEffect(() => {
    repo.load().then(setTasks).catch(console.error);
  }, [repo]);

  function openNewTask(status: TaskStatus) {
    const now = new Date().toISOString();

    setActiveTask({
      id: crypto.randomUUID(),
      title: "",
      description: "",
      status,
      position: tasks.filter((t) => t.status === status).length,
      created_at: now,
      updated_at: now,
    });
  }

  async function saveTask(task: Task) {
    const exists = tasks.some((t) => t.id === task.id);

    if (exists) {
      await repo.update(task);
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? task : t))
      );
    } else {
      await repo.create(task);
      setTasks((prev) => [...prev, task]);
    }
  }

  async function deleteTask(id: string) {
    await repo.delete(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function computeNextTasks(
    prev: Task[],
    taskId: string,
    newStatus: TaskStatus,
    newIndex: number
  ): Task[] {
    const task = prev.find((t) => t.id === taskId);
    if (!task) return prev;

    const oldStatus = task.status;

    // Remove task
    const remaining = prev.filter((t) => t.id !== taskId);

    // Target column
    const target = remaining
      .filter((t) => t.status === newStatus)
      .sort((a, b) => a.position - b.position);

    const movedTask: Task = {
      ...task,
      status: newStatus,
      updated_at: new Date().toISOString(),
    };

    target.splice(newIndex, 0, movedTask);

    const updatedTarget = target.map((t, i) => ({
      ...t,
      position: i,
    }));

    // Source column (if different)
    const updatedSource =
      oldStatus === newStatus
        ? []
        : remaining
            .filter((t) => t.status === oldStatus)
            .sort((a, b) => a.position - b.position)
            .map((t, i) => ({
              ...t,
              position: i,
            }));

    // Unaffected
    const unaffected = remaining.filter(
      (t) =>
        t.status !== oldStatus &&
        t.status !== newStatus
    );

    return [...unaffected, ...updatedSource, ...updatedTarget];
  }

  function hasTaskChanged(a: Task, b: Task): boolean {
    return (
      a.status !== b.status ||
      a.position !== b.position ||
      a.title !== b.title ||
      a.description !== b.description ||
      a.updated_at !== b.updated_at
    );
  }


  async function moveTask(
    taskId: string,
    newStatus: TaskStatus,
    newIndex: number
  ) {
    const prevTasks = tasks;
    const nextTasks = computeNextTasks(
      prevTasks,
      taskId,
      newStatus,
      newIndex
    );


    // Find changed tasks
    const changedTasks: Task[] = [];

    for (const next of nextTasks) {
      const prev = prevTasks.find((t) => t.id === next.id);
      if (!prev) {
        changedTasks.push(next);
        continue;
      }

      if (hasTaskChanged(prev, next)) {
        changedTasks.push(next);
      }
    }

    // Optimistic UI update
    setTasks(nextTasks);

    // Persist changes
    try {
      for (const task of changedTasks) {
        await repo.update(task);
      }
    } catch (err) {
      console.error("❌ Failed to persist move", err);
    }
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
          onDelete={
            tasks.some((t) => t.id === activeTask.id)
              ? deleteTask
              : undefined
          }
          onClose={() => setActiveTask(null)}
        />
      )}
    </>
  );
}

