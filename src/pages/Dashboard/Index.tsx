
import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Header from "@/components/Dashboard/Header";
import BlockCard from "@/components/Dashboard/BlockCard";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Block, mockBlocks } from "@/lib/mockData";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const { requireAuth, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [newBlock, setNewBlock] = useState({
    name: "",
    location: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  
  useEffect(() => {
    requireAuth();
    
    // Fetch blocks data
    setTimeout(() => {
      setBlocks(mockBlocks);
      setLoading(false);
    }, 1000);
  }, [requireAuth]);
  
  const handleUpdateBlock = (id: string, data: Partial<Block>) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, ...data } : block
    ));
  };
  
  const handleDeleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
    toast.success("Block deleted successfully");
  };
  
  const handleViewBlockDetails = (id: string) => {
    navigate(`/dashboard/blocks/${id}`);
  };
  
  const handleCreateBlock = () => {
    if (!newBlock.name.trim() || !newBlock.location.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    
    setIsCreating(true);
    
    setTimeout(() => {
      const newId = `block-${Date.now()}`;
      
      // Create new block with 30 lights by default
      const lights = Array.from({ length: 30 }, (_, i) => ({
        id: `light-${newId}-${i}`,
        name: `Light ${i + 1}`,
        zone: `Zone ${Math.floor(i / 5) + 1}`,
        isOn: false,
        usageData: {
          hoursOn: 0,
          energyUsed: 0,
          switches: 0,
        },
      }));
      
      const newBlockObj: Block = {
        id: newId,
        name: newBlock.name,
        location: newBlock.location,
        isOn: false,
        lights,
      };
      
      setBlocks([...blocks, newBlockObj]);
      setNewBlock({ name: "", location: "" });
      setIsCreating(false);
      toast.success(`Block ${newBlock.name} created successfully`);
    }, 1500);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBlock(prev => ({ ...prev, [name]: value }));
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 mx-auto border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Header title="Dashboard" />
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Lighting Blocks</h1>
            <p className="text-muted-foreground">
              Manage your lighting blocks and zones
            </p>
          </div>
          
          {isAdmin() && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Add New Block
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Block</DialogTitle>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Block Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., Main Floor"
                      value={newBlock.name}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g., Building A, North Wing"
                      value={newBlock.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button 
                    onClick={handleCreateBlock}
                    disabled={isCreating}
                  >
                    {isCreating ? "Creating..." : "Create Block"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blocks.map(block => (
            <BlockCard
              key={block.id}
              block={block}
              onUpdate={handleUpdateBlock}
              onDelete={handleDeleteBlock}
              onViewDetails={handleViewBlockDetails}
            />
          ))}
          
          {blocks.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center h-60 bg-muted/30 rounded-lg border border-dashed p-8 text-center">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12 text-muted-foreground mx-auto mb-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                  />
                </svg>
              </div>
              <h3 className="font-medium">No Blocks Found</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Create your first lighting block to get started
              </p>
              {isAdmin() && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mt-4">
                      Create Block
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Block</DialogTitle>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Block Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="e.g., Main Floor"
                          value={newBlock.name}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          placeholder="e.g., Building A, North Wing"
                          value={newBlock.location}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button 
                        onClick={handleCreateBlock}
                        disabled={isCreating}
                      >
                        {isCreating ? "Creating..." : "Create Block"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
