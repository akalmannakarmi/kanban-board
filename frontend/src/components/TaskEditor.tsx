import { useState } from "react";
import type { Task, TaskStatus } from "../types/task";

interface Props {
  task: Task;
  onSave: (task: Task) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "in_review", label: "In Review" },
  { value: "done", label: "Done" },
];

function formatFull(date: string) {
  return new Date(date).toLocaleString();
}

export function TaskEditor({ task, onSave, onDelete, onClose }: Props) {
  const [draft, setDraft] = useState<Task>(task);

  function save() {
    onSave({
      ...draft,
      updated_at: new Date().toISOString(),
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-stone-50 rounded-xl shadow-xl w-full max-w-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-orange-600">
          {onDelete ? "Edit Task" : "New Task"}
        </h2>

        <input
          className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          placeholder="Title"
          value={draft.title}
          onChange={(e) =>
            setDraft({ ...draft, title: e.target.value })
          }
        />

        <textarea
          className="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
          placeholder="Description"
          rows={4}
          value={draft.description || ""}
          onChange={(e) =>
            setDraft({ ...draft, description: e.target.value })
          }
        />

        <select
          className="w-full rounded border px-3 py-2"
          value={draft.status}
          onChange={(e) =>
            setDraft({
              ...draft,
              status: e.target.value as TaskStatus,
            })
          }
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <div className="text-xs text-slate-500 bg-stone-100 rounded p-2">
          <p>Created: {formatFull(task.created_at)}</p>
          <p>Last updated: {formatFull(task.updated_at)}</p>
        </div>

        <div className="flex justify-between pt-4">
          {onDelete && (
            <button
              onClick={() => {
                onDelete(task.id);
                onClose();
              }}
              className="text-sm text-red-600 hover:underline"
            >
              Delete
            </button>
          )}

          <div className="ml-auto flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded hover:bg-stone-200"
            >
              Cancel
            </button>
            <button
              onClick={save}
              className="px-4 py-2 text-sm rounded bg-orange-500 text-white hover:bg-orange-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

