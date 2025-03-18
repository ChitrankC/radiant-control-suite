
import { useState } from "react";
import { Lightbulb, MoreVertical, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Light } from "@/lib/mockData";
import ScheduleModal from "./ScheduleModal";
import { useAuth } from "@/hooks/useAuth";

interface LightControlProps {
  light: Light;
  onUpdate: (id: string, data: Partial<Light>) => void;
  onDelete: (id: string) => void;
}

const LightControl = ({ light, onUpdate, onDelete }: LightControlProps) => {
  const { isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const toggleLight = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const newStatus = !light.isOn;
      onUpdate(light.id, { isOn: newStatus });
      toast.success(`Light ${light.name} ${newStatus ? "turned on" : "turned off"}`);
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <div className={`p-4 bg-card rounded-lg border transition-all ${light.isOn ? "border-light-on/30" : "border-border"}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <button
            className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              light.isOn ? "bg-light-on/20" : "bg-secondary"
            }`}
            onClick={toggleLight}
            disabled={isLoading}
          >
            <Lightbulb className={`h-5 w-5 light-bulb ${light.isOn ? "on" : "off"}`} />
            {light.isOn && (
              <div className="absolute inset-0 rounded-full animate-pulse opacity-50 bg-light-on/10"></div>
            )}
          </button>
          <div>
            <h3 className="font-medium">{light.name}</h3>
            <p className="text-xs text-muted-foreground">{light.zone}</p>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Schedule
                </DropdownMenuItem>
              </DialogTrigger>
              <ScheduleModal 
                type="light"
                itemId={light.id}
                name={light.name}
                currentSchedule={light.schedule}
                onSchedule={(schedule) => onUpdate(light.id, { schedule })}
              />
            </Dialog>
            {isAdmin() && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete(light.id)}
                  className="text-destructive focus:text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {light.schedule && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <Clock className="h-3 w-3" />
          <span>
            {light.schedule.startTime} - {light.schedule.endTime}
          </span>
        </div>
      )}
      
      <div className="flex items-center justify-between mt-3">
        <p className="text-sm font-medium">Status</p>
        <span className={`text-xs px-2 py-1 rounded-full ${
          light.isOn 
            ? "bg-light-on/10 text-light-on" 
            : "bg-secondary text-muted-foreground"
        }`}>
          {light.isOn ? "On" : "Off"}
        </span>
      </div>
    </div>
  );
};

export default LightControl;
