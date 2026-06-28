import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

interface TodoFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  initialValues?: any;
  onSubmit: (values: any) => void;
  loading?: boolean;
}

const TodoFormModal = ({
  open,
  onOpenChange,
  title,
  initialValues,
  onSubmit,
  loading,
}: TodoFormModalProps) => {
  const [taskTitle, setTaskTitle] = useState("");
  // const [startTime, setStartTime] = useState("");
  // const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialValues) {
      setTaskTitle(initialValues.title || "");
      setDescription(initialValues.description || "");
      // setStartTime(initialValues.startTime || "");
      // setEndTime(initialValues.endTime || "");
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: taskTitle,
      description,
      // startTime,
      // endTime,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          <div className="mt-2 grid gap-4">
            <Input
              placeholder="Task name*"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />

            {/* <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            /> */}

            {/* <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            /> */}

            <Textarea
              placeholder="Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TodoFormModal;
