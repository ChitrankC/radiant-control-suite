
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Lightbulb, PlusCircle, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Dashboard/Header";
import LightControl from "@/components/Dashboard/LightControl";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { mockBlocks, Light, Block } from "@/lib/mockData";
import { useAuth } from "@/hooks/useAuth";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BlockManagement = () => {
  const { requireAuth, isAdmin } = useAuth();
  const { blockId } = useParams<{ blockId: string }>();
  const navigate = useNavigate();
  
  const [block, setBlock] = useState<Block | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterZone, setFilterZone] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [newLight, setNewLight] = useState({
    name: "",
    zone: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isTogglingAll, setIsTogglingAll] = useState(false);
  
  useEffect(() => {
    requireAuth();
    
    // Fetch block data
    setTimeout(() => {
      const foundBlock = mockBlocks.find(b => b.id === blockId);
      if (foundBlock) {
        setBlock(foundBlock);
      } else {
        toast.error("Block not found");
        navigate("/dashboard");
      }
      setLoading(false);
    }, 1000);
  }, [blockId, navigate, requireAuth]);
  
  if (loading || !block) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 mx-auto border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading block details...</p>
        </div>
      </div>
    );
  }
  
  const handleUpdateLight = (id: string, data: Partial<Light>) => {
    const updatedLights = block.lights.map(light => 
      light.id === id ? { ...light, ...data } : light
    );
    
    setBlock({ ...block, lights: updatedLights });
  };
  
  const handleDeleteLight = (id: string) => {
    setBlock({
      ...block,
      lights: block.lights.filter(light => light.id !== id),
    });
    toast.success("Light deleted successfully");
  };
  
  const handleCreateLight = () => {
    if (!newLight.name.trim() || !newLight.zone.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    
    setIsCreating(true);
    
    setTimeout(() => {
      const newId = `light-${Date.now()}`;
      
      const newLightObj: Light = {
        id: newId,
        name: newLight.name,
        zone: newLight.zone,
        isOn: false,
        usageData: {
          hoursOn: 0,
          energyUsed: 0,
          switches: 0,
        },
      };
      
      setBlock({
        ...block,
        lights: [...block.lights, newLightObj],
      });
      
      setNewLight({ name: "", zone: "" });
      setIsCreating(false);
      toast.success(`Light ${newLight.name} added successfully`);
    }, 1500);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLight(prev => ({ ...prev, [name]: value }));
  };
  
  const toggleAllLights = () => {
    setIsTogglingAll(true);
    
    // Determine the new state (opposite of current block state)
    const newState = !block.isOn;
    
    setTimeout(() => {
      const updatedLights = block.lights.map(light => ({
        ...light,
        isOn: newState,
      }));
      
      setBlock({
        ...block,
        isOn: newState,
        lights: updatedLights,
      });
      
      toast.success(`All lights ${newState ? "turned on" : "turned off"}`);
      setIsTogglingAll(false);
    }, 1500);
  };
  
  // Get unique zones for filtering
  const zones = Array.from(new Set(block.lights.map(light => light.zone)));
  
  // Filter lights based on selected zone and status
  const filteredLights = block.lights.filter(light => {
    const zoneMatch = filterZone === "all" || light.zone === filterZone;
    const statusMatch = 
      filterStatus === "all" || 
      (filterStatus === "on" && light.isOn) || 
      (filterStatus === "off" && !light.isOn);
    
    return zoneMatch && statusMatch;
  });
  
  return (
    <div className="min-h-screen">
      <Header title={block.name} />
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">{block.name}</h1>
            <p className="text-muted-foreground">{block.location}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={block.isOn ? "default" : "outline"}
              className={`gap-2 ${block.isOn ? "bg-light-on text-background hover:bg-light-on/90" : ""}`}
              onClick={toggleAllLights}
              disabled={isTogglingAll}
            >
              <Power className="h-4 w-4" />
              {isTogglingAll 
                ? "Processing..." 
                : block.isOn 
                  ? "Turn Off All Lights" 
                  : "Turn On All Lights"
              }
            </Button>
            
            {isAdmin() && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Add Light
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Light</DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Light Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="e.g., Ceiling Light 1"
                        value={newLight.name}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zone">Zone</Label>
                      <Input
                        id="zone"
                        name="zone"
                        placeholder="e.g., Meeting Room"
                        value={newLight.zone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      onClick={handleCreateLight}
                      disabled={isCreating}
                    >
                      {isCreating ? "Adding..." : "Add Light"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
        
        <div className="bg-card rounded-lg border p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Lightbulb className={`h-5 w-5 ${block.isOn ? "text-light-on" : "text-muted-foreground"}`} />
              <span>
                {block.lights.filter(light => light.isOn).length} of {block.lights.length} lights on
              </span>
            </div>
            
            <Separator orientation="vertical" className="h-6 hidden sm:block" />
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="w-full sm:w-[180px]">
                <Select value={filterZone} onValueChange={setFilterZone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Zones</SelectItem>
                    {zones.map(zone => (
                      <SelectItem key={zone} value={zone}>
                        {zone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-[180px]">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="on">On</SelectItem>
                    <SelectItem value="off">Off</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredLights.map(light => (
            <LightControl
              key={light.id}
              light={light}
              onUpdate={handleUpdateLight}
              onDelete={handleDeleteLight}
            />
          ))}
          
          {filteredLights.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center h-40 bg-muted/30 rounded-lg border border-dashed p-6 text-center">
              <Lightbulb className="w-8 h-8 text-muted-foreground mb-2" />
              <h3 className="font-medium">No lights found</h3>
              <p className="text-muted-foreground text-sm mt-1">
                {block.lights.length === 0
                  ? "Add lights to this block to get started"
                  : "No lights match your current filters"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockManagement;
