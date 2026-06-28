import { Check, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UpdateTodoModal from "./UpdateTodoModal";

interface TodoProps {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  colorIndex?: number;
  onDelete: (todoId: string) => void;
  onToggleComplete: (todoId: string, completed: boolean) => void;
  onUpdateTodo: (updatedTodo: TodoProps) => void;
}

const TodoCard = (props: TodoProps) => {
  const [isChecked, setIsChecked] = useState(props.completed);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const colors = [
    "bg-blue-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-orange-200",
    "bg-teal-200",
    "bg-indigo-200",
  ];

  const bgColor = colors[(props.colorIndex || 0) % colors.length];

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleUpdateClick = () => {
    setShowUpdateModal(true);
  };

  const handleCheckboxToggle = async () => {
    const newCompletedState = !isChecked;
    setIsChecked(newCompletedState);

    try {
      props.onToggleComplete(props._id, newCompletedState);
    } catch (error) {
      // Revert on error
      setIsChecked(!newCompletedState);
      toast.error("Failed to update todo status");
    }
  };

  const handleConfirmDelete = () => {
    props.onDelete(props._id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "<strong>{props.title}</strong>".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <UpdateTodoModal
        todo={props}
        open={showUpdateModal}
        onOpenChange={setShowUpdateModal}
        onUpdateTodo={props.onUpdateTodo}
      />
      <div
        className={`flex min-h-36 w-full flex-col gap-3 rounded-2xl ${bgColor} p-4 shadow-sm`}
      >
        <div className="flex justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              role="checkbox"
              aria-checked={isChecked}
              onClick={handleCheckboxToggle}
              className={`mt-1 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded border-2 transition-colors
            ${
              isChecked
                ? "bg-blue-600 border-blue-600"
                : "bg-white border-gray-300 hover:border-gray-400"
            }`}
            >
              {isChecked && <Check className="h-3 w-3 text-white" />}
            </button>
            <div>
              <h3
                className={`flex font-medium transition-all duration-200 ${
                  isChecked ? "line-through text-gray-500" : "text-gray-900"
                }`}
              >
                {props.title}
              </h3>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-6 w-7 cursor-pointer rounded p-1 transition-colors hover:bg-white/25">
                <EllipsisVertical size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={handleUpdateClick}
                className="cursor-pointer"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Update
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDeleteClick}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div className="mt-3">
            <p
              className={`text-sm transition-all duration-200 ${
                isChecked ? "text-gray-500" : "text-gray-700"
              }`}
            >
              {props.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoCard;
