
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "@/components/Dashboard/Sidebar";

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";

// Dashboard Pages
import Dashboard from "./pages/Dashboard/Index";
import BlockManagement from "./pages/Dashboard/BlockManagement";
import Analytics from "./pages/Dashboard/Analytics";
import UserManagement from "./pages/Dashboard/UserManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex">
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
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
              
              {/* Redirect Index to Login */}
              <Route path="/" element={<Login />} />
              
              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
