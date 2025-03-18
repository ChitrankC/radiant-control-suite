
import { useState } from "react";
import { Bell, MoonStar, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const { user } = useAuth();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b px-6 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        
        <div className="flex items-center gap-2">
          <div className="relative max-w-xs hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 w-[200px] bg-secondary"
            />
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground"
          >
            {theme === "light" ? (
              <MoonStar className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4 border-b">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="py-2">
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div>
                    <p className="font-medium">System update complete</p>
                    <p className="text-sm text-muted-foreground">The system has been successfully updated.</p>
                    <p className="text-xs text-muted-foreground mt-1">Just now</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div>
                    <p className="font-medium">Block A maintenance</p>
                    <p className="text-sm text-muted-foreground">Scheduled maintenance for Block A completed.</p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
