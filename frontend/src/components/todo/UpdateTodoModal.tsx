import { useState } from "react";
import { toast } from "sonner";
import getErrorMessage from "@/lib/utils";
import TodoFormModal from "./TodoFormModal";

interface UpdateTodoModalProps {
  todo: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateTodo: (todo: any) => void;
}

const UpdateTodoModal = ({
  todo,
  open,
  onOpenChange,
  onUpdateTodo,
}: UpdateTodoModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleUpdateTodo = async (values: any) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/todo/update/${todo._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", token: token || "" },
          body: JSON.stringify(values),
        },
      );

      if (!response.ok) throw new Error("Failed to update");

      const data = await response.json();
      onUpdateTodo(data.todo);

      toast.success("Todo updated successfully!");
      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <TodoFormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Update Todo"
      initialValues={todo}
      onSubmit={handleUpdateTodo}
      loading={loading}
    />
  );
};

export default UpdateTodoModal;
