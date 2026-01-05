import type { Task } from "../types/task";

interface Props {
  task: Task;
  onDragStart: () => void;
  onDrop: () => void;
}

export function TaskCard({ task, onDragStart, onDrop }: Props) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="
        bg-white rounded-lg px-3 py-2 shadow-sm
        cursor-grab active:cursor-grabbing
        border border-transparent
        hover:border-orange-400
        hover:shadow-md
        transition
      "
    >
      <p className="text-sm font-medium text-slate-800">
        {task.title}
      </p>
    </div>
  );
}
