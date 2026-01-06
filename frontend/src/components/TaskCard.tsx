import type { Task } from "../types/task";

interface Props {
  task: Task;
  onDragStart: () => void;
  onDrop: () => void;
  onEdit: (task: Task) => void;
}

function formatShort(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function TaskCard({ task, onDragStart, onDrop, onEdit }: Props) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      onDoubleClick={() => onEdit(task)}
      className="
        bg-white rounded-xl p-4 shadow-sm
        border border-stone-200
        hover:shadow-md transition
        space-y-2
      "
    >
      <button
        onClick={() => onEdit(task)}
        className="text-left w-full"
      >
        <h4 className="font-semibold text-slate-800 hover:underline">
          {task.title}
        </h4>
      </button>

      {task.description && (
        <p className="text-sm text-slate-600 line-clamp-3">
          {task.description}
        </p>
      )}
    </div>
  );
}

