import { FormEvent, useEffect, useState } from "react";
import { PlusCircle, X } from "phosphor-react";
import { Clipboard } from "./components/Clipboard";
import { Input } from "./components/Input";
import { Logo } from "./components/Logo";
import {
  Toast,
  ToastTitle,
  ToastButtonClose,
} from "./components/Toast";
import { Task } from "./components/Task";
import { v4 as useId } from "uuid";

interface Task {
  id: string;
  title: string;
  done: boolean;
  created_at: Date;
}

type ActionsType = "add-task" | "invalid-form" | "remove-task";

export function App() {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const tasksStorage = localStorage.getItem("@tasks-ignite");

    if (tasksStorage) {
      return JSON.parse(tasksStorage);
    }

    return [];
  });

  const [actionType, setActionType] = useState<ActionsType | null>(null);

  const [taskName, setTaskName] = useState("");

  const tasksMarkedAsDone = tasks.filter((task) => task.done === true);
  const totalTasks = tasks.length;

  function handleSubmitForm(event: FormEvent) {
    event.preventDefault();

    if (!taskName.trim()) {
      setIsToastOpen(true);
      setActionType("invalid-form");
      return;
    }

    handleAddNewTask({
      id: useId(),
      title: taskName,
      done: false,
      created_at: new Date(),
    });

    setTaskName("");
    setActionType("add-task");
    setIsToastOpen(true);
  }

  function handleAddNewTask(newTask: Task) {
    setTasks((state) => [newTask, ...state]);
    setActionType("add-task");
    setIsToastOpen(true);
  }

  function handleDeleteTask(taskId: string) {
    const tasksFiltered = tasks.filter((task) => task.id !== taskId);

    setTasks(tasksFiltered);
    setActionType("remove-task");
    setIsToastOpen(true);
  }

  function handleMarkTaskAsDone(taskId: string) {
    const tasksUpdated = tasks.map((task) => {
      return task.id === taskId ? { ...task, done: !task.done } : task;
    });

    setTasks(tasksUpdated);
  }

  useEffect(() => {
    localStorage.setItem("@tasks-ignite", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="h-scree">
      <header className="min-h-[200px] bg-gray-700 flex items-center justify-center">
        <Logo />
      </header>

      <div className="w-4/5 max-w-[736px] mx-auto -mt-[30px]">
        <form
          onSubmit={handleSubmitForm}
          className="w-full flex flex-col gap-2 md:flex-row"
        >
          <div className="flex-1">
            <label htmlFor="task" className="sr-only">
              Nome da tarefa
            </label>
            <Input
              type="text"
              id="task"
              placeholder="Adicione uma nova tarefa"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>

          <button className="p-4 bg-blue-600 text-white flex items-center justify-center gap-2 font-bold  text-sm rounded-lg transition-colors hover:bg-blue-500">
            Criar
            <PlusCircle size={16} color="#fff" />
          </button>
        </form>

        <main className="mt-16">
          <section id="tasks">
            <div className="flex flex-col items-center justify-between sm:flex-row">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-blue-500">
                  Tarefas criadas
                </span>
                <span className="h-[25px] w-[25px] px-2 py-[2px] flex items-center justify-center rounded-full bg-gray-400 text-gray-200 font-bold">
                  {totalTasks}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-purple-500">
                  Conclu??das
                </span>
                <span className=" px-2 py-[2px] flex items-center justify-center rounded-full bg-gray-400 text-gray-200 font-bold">
                  {tasksMarkedAsDone.length} de {totalTasks}
                </span>
              </div>
            </div>

            {tasks.length === 0 ? (
              <div className="mt-6 py-16 px-6 flex flex-col items-center">
                <Clipboard />

                <span className="inline-block mt-4 text-gray-300 text-sm text-center font-medium sm:text-base">
                  Voc?? ainda n??o tem tarefas cadastradas
                  <br />
                  Crie tarefas e organize seus itens a fazer
                </span>
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-3">
                {tasks.map((task) => {
                  return (
                    <Task
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      done={task.done}
                      handleDeleteTask={handleDeleteTask}
                      handleMarkTaskAsDone={handleMarkTaskAsDone}
                    />
                  );
                })}
              </div>
            )}
          </section>
        </main>
      </div>

      <Toast
        open={isToastOpen}
        onOpenChange={() => setIsToastOpen(!open)}
        duration={2500}
      >
        <ToastTitle>
          {actionType === "invalid-form" && "Preencha o formul??rio"}
          {actionType === "add-task" && "tarefa adicionada"}
          {actionType === "remove-task" && "tarefa deletada"}
        </ToastTitle>

        <ToastButtonClose title="fechar toast">
          <X />
        </ToastButtonClose>
      </Toast>
    </div>
  );
}
