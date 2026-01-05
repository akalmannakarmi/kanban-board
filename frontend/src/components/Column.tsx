import type { Task } from "../types/task";
import { TaskCard } from "./TaskCard";

const COLUMN_STYLES: Record<
  string,
  { bg: string; accent: string }
> = {
  todo: {
    bg: "bg-stone-50",
    accent: "bg-stone-400",
  },
  in_progress: {
    bg: "bg-orange-50",
    accent: "bg-orange-400",
  },
  in_review: {
    bg: "bg-purple-50",
    accent: "bg-purple-400",
  },
  done: {
    bg: "bg-emerald-50",
    accent: "bg-emerald-400",
  },
};


interface Props {
  title: string;
  columnId: Task["status"];
  tasks: Task[];
  draggedTaskId: string | null;
  setDraggedTaskId: (id: string | null) => void;
  moveTask: (taskId: string, status: Task["status"], index: number) => void;
}

export function Column({
  title,
  columnId,
  tasks,
  draggedTaskId,
  setDraggedTaskId,
  moveTask,
}: Props) {
  const styles = COLUMN_STYLES[columnId];

  return (
    <section
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        if (draggedTaskId) {
          moveTask(draggedTaskId, columnId, tasks.length);
          setDraggedTaskId(null);
        }
      }}
      className={`flex flex-col rounded-xl shadow-md overflow-hidden ${styles.bg}`}
    >
      <div className={`h-2 ${styles.accent}`} />

      <h3 className="px-4 py-3 font-semibold text-slate-700">
        {title}
      </h3>

      <div className="flex-1 px-4 pb-4 flex flex-col gap-2">
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={() => setDraggedTaskId(task.id)}
            onDrop={() =>
              draggedTaskId &&
              moveTask(draggedTaskId, columnId, index)
            }
          />
        ))}
      </div>
    </section>
  );
}
