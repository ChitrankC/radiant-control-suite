
import { useState } from "react";
import { Building, Lightbulb, MoreVertical, Power, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ScheduleModal from "./ScheduleModal";
import { Block } from "@/lib/mockData";
import { useAuth } from "@/hooks/useAuth";

interface BlockCardProps {
  block: Block;
  onUpdate: (id: string, data: Partial<Block>) => void;
  onDelete: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const BlockCard = ({ block, onUpdate, onDelete, onViewDetails }: BlockCardProps) => {
  const { isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const togglePower = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Determine new power state
      const newStatus = !block.isOn;
      
      // Update all lights to match the new block power state
      const updatedLights = block.lights.map(light => ({
        ...light,
        isOn: newStatus
      }));
      
      // Update the block with new status and lights
      onUpdate(block.id, { 
        isOn: newStatus,
        lights: updatedLights
      });
      
      toast.success(`Block ${block.name} ${newStatus ? "powered on" : "powered off"}`);
      setIsLoading(false);
    }, 1000);
  };
  
  // Calculate percentage of lights that are on
  const lightsOnPercentage = block.lights.filter(light => light.isOn).length / block.lights.length * 100;
  
  // Helper function to format schedule time
  const formatSchedule = () => {
    if (!block.schedule) return "Not scheduled";
    return `${block.schedule.startTime} - ${block.schedule.endTime}`;
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${block.isOn ? "bg-light-on/20" : "bg-secondary"}`}>
              <Building className={`h-5 w-5 ${block.isOn ? "text-light-on" : "text-muted-foreground"}`} />
            </div>
            <div>
              <CardTitle className="text-base">{block.name}</CardTitle>
              <CardDescription>{block.location}</CardDescription>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewDetails(block.id)}>
                View Details
              </DropdownMenuItem>
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Schedule
                  </DropdownMenuItem>
                </DialogTrigger>
                <ScheduleModal 
                  type="block"
                  itemId={block.id}
                  name={block.name}
                  currentSchedule={block.schedule}
                  onSchedule={(schedule) => onUpdate(block.id, { schedule })}
                />
              </Dialog>
              {isAdmin() && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDelete(block.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    Delete
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className={`h-4 w-4 ${block.isOn ? "text-light-on" : "text-muted-foreground"}`} />
            <span className="text-sm text-muted-foreground">
              {block.lights.filter(light => light.isOn).length} / {block.lights.length} lights on
            </span>
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{formatSchedule()}</span>
          </div>
        </div>
        
        <div className="mt-3 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-light-on transition-all ease-in-out duration-500"
            style={{ width: `${lightsOnPercentage}%` }}
          ></div>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/30 flex justify-between">
        <Button 
          variant={block.isOn ? "default" : "outline"} 
          size="sm"
          className={`gap-2 ${block.isOn ? "bg-light-on text-background hover:bg-light-on/90" : ""}`}
          onClick={togglePower}
          disabled={isLoading}
        >
          <Power className="h-4 w-4" />
          {block.isOn ? "Powered On" : "Powered Off"}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onViewDetails(block.id)}
        >
          View Lights
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlockCard;
