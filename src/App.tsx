
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "@/components/Dashboard/Sidebar";

// Dashboard Pages
import Dashboard from "./pages/Dashboard/Index";
import BlockManagement from "./pages/Dashboard/BlockManagement";
import Analytics from "./pages/Dashboard/Analytics";
import UserManagement from "./pages/Dashboard/UserManagement";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "@/context/ThemeContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex">
              <Routes>
                {/* Dashboard Routes */}
                <Route
                  path="/dashboard/*"
                  element={
                    <div className="min-h-screen flex w-full">
                      <Sidebar />
                      <div className="flex-1 md:ml-64">
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/blocks" element={<Dashboard />} />
                          <Route path="/blocks/:blockId" element={<BlockManagement />} />
                          <Route path="/analytics" element={<Analytics />} />
                          <Route path="/users" element={<UserManagement />} />
                          <Route path="/settings" element={<Dashboard />} />
                        </Routes>
                      </div>
                    </div>
                  }
                />
                
                {/* Redirect all paths to Dashboard */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
