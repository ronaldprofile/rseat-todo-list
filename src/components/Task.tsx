import { styled } from "@stitches/react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check as CheckIcon, Trash } from "phosphor-react";
interface TaskProps {
  id: string;
  title: string;
  done: boolean;
  handleDeleteTask: (taskId: string) => void;
  handleMarkTaskAsDone: (taskId: string) => void;
}

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  width: 25,
  height: 25,
  border: "2px solid #4ea8de",
  borderRadius: 9999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:not([data-state=checked]):hover": {
    background: "#1e6f9f",
  },

  "&[data-state=checked]": {
    background: "#5e60ce",
    borderColor: "#5e60ce",

    "&:hover": {
      background: "#8284fa",
      borderColor: "#8284fa",
    },
  },
});

export function Task({
  id,
  title,
  done,
  handleDeleteTask,
  handleMarkTaskAsDone,
}: TaskProps) {
  return (
    <div className="p-4 flex items-start justify-between bg-gray-500 rounded-lg border border-gray-400 shadow">
      <div className="flex items-start gap-3">
        <StyledCheckbox
          checked={done}
          onClick={() => handleMarkTaskAsDone(id)}
          className="transition-colors"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>

        <span className={`text-sm ${done ? "line-through text-gray-300" : "text-gray-100"} transition-all`}
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
