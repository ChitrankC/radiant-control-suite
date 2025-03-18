
import { useEffect, useState } from "react";
import Header from "@/components/Dashboard/Header";
import AnalyticsChart from "@/components/Dashboard/AnalyticsChart";
import { useAuth } from "@/hooks/useAuth";
import { ArrowDown, ArrowUp, Lightbulb, Zap } from "lucide-react";
import { mockAnalytics } from "@/lib/mockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Analytics = () => {
  const { requireAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(mockAnalytics);
  const [selectedBlock, setSelectedBlock] = useState("all");
  
  useEffect(() => {
    requireAuth();
    
    // Fetch analytics data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [requireAuth]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 mx-auto border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }
  
  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon,
    description,
    iconColor,
  }: { 
    title: string,
    value: string, 
    change: { value: number, isIncrease: boolean },
    icon: React.ElementType,
    description: string,
    iconColor: string,
  }) => (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className={`p-2 rounded-full ${iconColor}`}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          <span className={`text-xs ${change.isIncrease ? "text-green-500" : "text-red-500"} flex items-center gap-1`}>
            {change.isIncrease ? (
              <ArrowUp className="h-3 w-3" />
            ) : (
              <ArrowDown className="h-3 w-3" />
            )}
            {change.value}%
          </span>
          <span className="text-xs text-muted-foreground ml-1">vs. last period</span>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="min-h-screen">
      <Header title="Analytics" />
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Lighting Analytics</h1>
            <p className="text-muted-foreground">
              Monitor and analyze lighting usage and efficiency
            </p>
          </div>
          
          <div className="w-[180px]">
            <Select value={selectedBlock} onValueChange={setSelectedBlock}>
              <SelectTrigger>
                <SelectValue placeholder="Select block" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Blocks</SelectItem>
                <SelectItem value="block-1">Building A</SelectItem>
                <SelectItem value="block-2">Building B</SelectItem>
                <SelectItem value="block-3">Building C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatCard
            title="Total Active Lights"
            value="126 / 214"
            change={{ value: 12, isIncrease: true }}
            icon={Lightbulb}
            description="Currently active lights across all blocks"
            iconColor="bg-primary/10 text-primary"
          />
          <StatCard
            title="Energy Consumption"
            value="1,284 kWh"
            change={{ value: 5.2, isIncrease: false }}
            icon={Zap}
            description="Total energy usage in the current period"
            iconColor="bg-light-on/10 text-light-on"
          />
          <StatCard
            title="Average Usage"
            value="5.2 hours/day"
            change={{ value: 3.1, isIncrease: true }}
            icon={Lightbulb}
            description="Average daily lighting hours per light"
            iconColor="bg-primary/10 text-primary"
          />
          <StatCard
            title="Efficiency Rating"
            value="92%"
            change={{ value: 4, isIncrease: true }}
            icon={Zap}
            description="Overall system efficiency score"
            iconColor="bg-light-on/10 text-light-on"
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <AnalyticsChart
            title="Light Usage"
            description="Number of active lights and energy consumption over time"
            data={data.lightUsage}
          />
          <AnalyticsChart
            title="Energy Efficiency"
            description="Energy efficiency metrics and optimization levels"
            data={data.energyEfficiency}
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Block Comparison</CardTitle>
              <CardDescription>
                Compare performance across different blocks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <AnalyticsChart
                  title=""
                  description=""
                  data={data.blockComparison}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Optimization Insights</CardTitle>
              <CardDescription>
                Key insights and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-medium text-sm">Energy Saving Opportunity</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Turn off unused lights in Building A - potential 15% energy saving
                </p>
              </div>
              
              <div className="p-3 bg-light-on/5 rounded-lg border border-light-on/20">
                <h4 className="font-medium text-sm">Schedule Optimization</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Adjust Building C schedule to match actual usage patterns
                </p>
              </div>
              
              <div className="p-3 bg-secondary rounded-lg border">
                <h4 className="font-medium text-sm">Maintenance Alert</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  5 lights in Building B have been on continuously for 72+ hours
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
