
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Home,
  Lightbulb,
  LogOut,
  Menu,
  RefreshCw,
  Settings,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    toast.success("Session refreshed");
  };

  const NavItem = ({
    icon: Icon,
    label,
    href,
  }: {
    icon: React.ElementType;
    label: string;
    href: string;
  }) => {
    const isActive = location.pathname === href;

    return (
      <Link
        to={href}
        className={cn(
          "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
        )}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-30 md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div
        className={cn(
          "fixed inset-0 z-20 bg-background/80 backdrop-blur-sm md:hidden transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={cn(
          "fixed top-0 bottom-0 left-0 z-30 w-64 bg-card shadow-lg transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
                <Lightbulb className="text-primary-foreground h-5 w-5" />
              </div>
              <h2 className="font-bold text-xl">Lumina</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 py-6 px-3 space-y-1">
            <NavItem icon={Home} label="Dashboard" href="/dashboard" />
            <NavItem
              icon={Lightbulb}
              label="Block Management"
              href="/dashboard/blocks"
            />
            <NavItem
              icon={BarChart3}
              label="Analytics"
              href="/dashboard/analytics"
            />
            {user?.role === 'admin' && (
              <NavItem
                icon={Users}
                label="User Management"
                href="/dashboard/users"
              />
            )}
            <NavItem
              icon={Settings}
              label="Settings"
              href="/dashboard/settings"
            />
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={handleLogout}
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Session
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
