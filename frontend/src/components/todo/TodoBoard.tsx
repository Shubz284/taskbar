import { useEffect, useState } from "react";
import { toast } from "sonner";
import getErrorMessage from "@/lib/utils";
import TodoCard from "./TodoCard";
import TodoTabs from "./TodoTabs";
import AddTodoModal from "./AddTodoModal";
import DatePicker from "../shared/DatePicker";
import SearchInput from "../shared/SearchInput";

interface TodoProps {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  onDelete: (todoId: string) => void;
}

const TodoBoard = () => {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDeleteTodo = async (todoId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/todo/delete/${todoId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json", token: token },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete");
      }
      setTodos((prev) => prev.filter((todo) => todo._id !== todoId));

      toast.success("Content deleted successfully!");
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error("Failed to delete content");
    }
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
          headers: { "Content-Type": "application/json", token: token },
          body: JSON.stringify({ completed }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      // Update local state
      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === todoId ? { ...todo, completed } : todo,
        ),
      );

      toast.success(completed ? "Task completed!" : "Task marked as active");
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Failed to update todo");
      throw error; // Re-throw so TodoCard can revert the checkbox
    }
  };

  const handleAddTodo = (newTodo: TodoProps) => {
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleUpdateTodo = (updatedTodo: TodoProps) => {
    setTodos((prev) =>
      prev.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)),
    );
  };

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
          headers: { "Content-Type": "application/json", token: token },
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

  // Filter todos based on active tab and search query
  const filteredTodos = todos.filter((todo) => {
    // Filter by tab (active/completed)
    const matchesTab =
      activeTab === "active" ? !todo.completed : todo.completed;

    // Filter by search query (case-insensitive search in title and description)
    const matchesSearch =
      searchQuery.trim() === "" ||
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (todo.description &&
        todo.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading todos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-4 mt-4 flex items-center justify-between border-b rounded-l border-slate-200 bg-white px-2 pb-4 pt-1">
        <DatePicker selectedDate={date} onDateChange={setDate} />
        <div className="flex items-center gap-3">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
          <AddTodoModal onAddTodo={handleAddTodo} />
        </div>
      </div>
      <div className="mx-4 rounded-md rounded-l min-h-full bg-white  pb-6">
        <div className="px-4 pt-4">
          <TodoTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <div className="grid grid-cols-1 gap-4 px-4 pb-4 pt-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {filteredTodos.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center">
              {searchQuery.trim() !== ""
                ? "No todos found matching your search."
                : activeTab === "active"
                  ? "No active tasks. Add your todoS!"
                  : "No completed tasks yet."}
            </p>
          ) : (
            filteredTodos.map((todo, index) => (
              <TodoCard
                key={todo._id}
                _id={todo._id}
                title={todo.title}
                description={todo.description}
                completed={todo.completed}
                createdAt={todo.createdAt}
                colorIndex={index}
                onDelete={handleDeleteTodo}
                onToggleComplete={handleToggleComplete}
                onUpdateTodo={handleUpdateTodo}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default TodoBoard;
