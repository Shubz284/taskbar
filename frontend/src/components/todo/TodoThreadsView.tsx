import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

import AddTodoModal from "./AddTodoModal";
import getErrorMessage from "@/lib/utils";

interface TodoProps {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  completed: boolean;
  createdAt: string;
}

const TodoThreadsView = () => {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/todo/getalltodos`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json", token },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      setError(getErrorMessage(error));
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = (newTodo: TodoProps) => {
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggleComplete = async (todoId: string, completed: boolean) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/todo/update/${todoId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", token },
          body: JSON.stringify({ completed }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === todoId ? { ...todo, completed } : todo,
        ),
      );

      toast.success(completed ? "Task completed!" : "Task marked active");
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Failed to update todo");
    }
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#050816] text-slate-100">
        <div className="flex items-center gap-3 text-slate-300">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading todos...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#050816] text-red-300">
        <p>{error}</p>
      </div>
    );
  }

  const renderThreadCard = (todo: TodoProps, accent: string) => (
    <div className="relative pl-10">
      <span className="absolute left-4 top-1/2 h-px w-6 -translate-y-1/2 bg-white/15" />
      <span
        className={`absolute left-4 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full ${accent} ring-4 ring-[#050816]`}
      />
      <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-slate-100 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm transition hover:border-white/20 hover:bg-white/8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label={
              todo.completed ? "Mark todo active" : "Mark todo complete"
            }
            onClick={() => handleToggleComplete(todo._id, !todo.completed)}
            className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${
              todo.completed
                ? "border-emerald-400 bg-emerald-400 text-slate-950"
                : "border-sky-400 bg-transparent text-transparent"
            }`}
          >
            <Check className="h-4 w-4" />
          </button>
          <h3
            className={`text-base font-medium ${
              todo.completed ? "text-slate-400 line-through" : "text-slate-100"
            }`}
          >
            {todo.title}
          </h3>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#050816] text-slate-100">
      <div className="flex flex-col gap-6 px-6 pb-8 pt-6 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Todos
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Organize and track your tasks
            </p>
          </div>

          <AddTodoModal onAddTodo={handleAddTodo} />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-sky-400/20 bg-slate-950/40 p-5 shadow-[0_0_0_1px_rgba(59,130,246,0.08)] backdrop-blur">
            <div className="mb-6 flex items-center justify-between rounded-2xl border border-sky-400/25 bg-sky-400/10 px-5 py-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                Active Tasks
              </h2>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-sm font-semibold text-white">
                {activeTodos.length}
              </span>
            </div>

            <div className="relative space-y-8 pl-1">
              <div className="absolute left-4 top-0 bottom-0 border-l border-dashed border-sky-400/20" />
              {activeTodos.length === 0 ? (
                <p className="px-2 py-10 text-center text-sm text-slate-400">
                  No active tasks.
                </p>
              ) : (
                activeTodos.map((todo) => renderThreadCard(todo, "bg-sky-500"))
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-emerald-400/20 bg-slate-950/40 p-5 shadow-[0_0_0_1px_rgba(16,185,129,0.08)] backdrop-blur">
            <div className="mb-6 flex items-center justify-between rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-5 py-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
                Completed Tasks
              </h2>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-sm font-semibold text-white">
                {completedTodos.length}
              </span>
            </div>

            <div className="relative space-y-8 pl-1">
              <div className="absolute left-4 top-0 bottom-0 border-l border-dashed border-emerald-400/20" />
              {completedTodos.length === 0 ? (
                <p className="px-2 py-10 text-center text-sm text-slate-400">
                  No completed tasks yet.
                </p>
              ) : (
                completedTodos.map((todo) =>
                  renderThreadCard(todo, "bg-emerald-500"),
                )
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TodoThreadsView;
