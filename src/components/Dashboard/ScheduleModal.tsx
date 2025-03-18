
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface Schedule {
  enabled: boolean;
  startTime: string;
  endTime: string;
  days: string[];
}

interface ScheduleModalProps {
  type: "light" | "block";
  itemId: string;
  name: string;
  currentSchedule?: Schedule;
  onSchedule: (schedule: Schedule) => void;
}

const ScheduleModal = ({
  type,
  itemId,
  name,
  currentSchedule,
  onSchedule,
}: ScheduleModalProps) => {
  const [isEnabled, setIsEnabled] = useState(currentSchedule?.enabled || false);
  const [startTime, setStartTime] = useState(currentSchedule?.startTime || "08:00");
  const [endTime, setEndTime] = useState(currentSchedule?.endTime || "18:00");
  const [selectedDays, setSelectedDays] = useState<string[]>(currentSchedule?.days || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const handleSchedule = () => {
    if (startTime >= endTime) {
      toast.error("Start time must be before end time");
      return;
    }
    
    setIsLoading(true);
    
    // Create schedule object
    const schedule: Schedule = {
      enabled: isEnabled,
      startTime,
      endTime,
      days: selectedDays,
    };
    
    // Simulate API call
    setTimeout(() => {
      onSchedule(schedule);
      toast.success(`Schedule set for ${name}`);
      setIsLoading(false);
    }, 1000);
  };
  
  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Schedule {type === "light" ? "Light" : "Block"}</DialogTitle>
        <DialogDescription>
          Set up automated scheduling for {name}
        </DialogDescription>
      </DialogHeader>
      
      <div className="flex items-center justify-between py-4">
        <div className="space-y-0.5">
          <h4 className="font-medium">Enable scheduling</h4>
          <p className="text-sm text-muted-foreground">
            Automatically control power based on schedule
          </p>
        </div>
        <Switch
          checked={isEnabled}
          onCheckedChange={setIsEnabled}
        />
      </div>
      
      <div className="grid gap-4 py-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              disabled={!isEnabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              disabled={!isEnabled}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Effective Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                disabled={!isEnabled}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label>Days of Week</Label>
          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <Button
                key={day}
                variant="outline"
                size="sm"
                className={cn(
                  "text-xs",
                  selectedDays.includes(day) && "bg-primary text-primary-foreground"
                )}
                onClick={() => toggleDay(day)}
                disabled={!isEnabled}
              >
                {day.substring(0, 3)}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button onClick={handleSchedule} disabled={isLoading || !isEnabled}>
          {isLoading ? "Saving..." : "Save Schedule"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ScheduleModal;
