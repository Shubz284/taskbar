import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import getErrorMessage from "@/lib/utils";
import TodoFormModal from "./TodoFormModal";

interface AddTodoModalProps {
  onAddTodo: (todo: any) => void;
}

const AddTodoModal = ({ onAddTodo }: AddTodoModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddTodo = async (values: any) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/todo/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", token: token || "" },
          body: JSON.stringify({ ...values, completed: false }),
        },
      );

      if (!response.ok) throw new Error("Failed to add");

      const data = await response.json();
      onAddTodo(data.todo);

      toast.success("Todo added successfully!");
      setOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-[#1d4ed8] px-4 py-2 text-white shadow-sm hover:bg-[#2563eb] hover:text-white"
      >
        <Plus /> Add New List
      </Button>

      <TodoFormModal
        open={open}
        onOpenChange={setOpen}
        title="Add New Todo"
        onSubmit={handleAddTodo}
        loading={loading}
      />
    </>
  );
};

export default AddTodoModal;
