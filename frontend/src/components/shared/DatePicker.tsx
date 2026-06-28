// src/components/shared/DatePicker.tsx
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

interface DatePickerProps {
  selectedDate?: Date;
  onDateChange: (date: Date | undefined) => void;
}

export default function DatePicker({
  selectedDate,
  onDateChange,
}: DatePickerProps) {
  // Use current date if no date is selected
  const defaultDate = selectedDate || new Date();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-52 cursor-pointer items-center justify-start border-none bg-transparent px-0 text-lg font-semibold shadow-none",
            !selectedDate && "text-muted-foreground",
          )}
        >
          {selectedDate
            ? format(selectedDate, "do MMM, yyyy")
            : format(defaultDate, "do MMM, yyyy")}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 " align="start">
        <Calendar
          mode="single"
          selected={selectedDate || defaultDate}
          onSelect={onDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
