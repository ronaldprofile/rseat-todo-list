import { Trash } from "phosphor-react";

interface TaskProps {
  id: string;
  title: string;
  done: boolean;
  handleDeleteTask: (taskId: string) => void;
  handleMarkTaskAsDone: (taskId: string) => void;
}

export function Task({
  id,
  title,
  done,
  handleDeleteTask,
  handleMarkTaskAsDone,
}: TaskProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={done}
          onChange={() => handleMarkTaskAsDone(id)}
        />
        <span
          className={`text-sm ${
            done ? "line-through text-gray-300" : "text-gray-100"
          }`}
        >
          {title}
        </span>
      </div>

      <button
        onClick={() => handleDeleteTask(id)}
        className="w-6 h-6 flex items-center justify-center rounded transition-colors text-gray-300 hover:bg-gray-400 hover:text-red-500"
      >
        <Trash size={20} />
      </button>
    </div>
  );
}
