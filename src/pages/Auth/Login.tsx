
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import AuthLayout from "@/components/Auth/AuthLayout";
import GoogleAuthButton from "@/components/Auth/GoogleAuthButton";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      // For demo purposes - in a real app, this would check credentials
      if (email === "admin@example.com" && password === "password") {
        localStorage.setItem("user", JSON.stringify({ 
          id: "1", 
          email, 
          name: "Admin User",
          role: "admin" 
        }));
        toast.success("Logged in successfully");
        navigate("/dashboard");
      } else if (email === "user@example.com" && password === "password") {
        localStorage.setItem("user", JSON.stringify({ 
          id: "2", 
          email, 
          name: "Standard User",
          role: "user" 
        }));
        toast.success("Logged in successfully");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    // Simulate Google login
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ 
        id: "3", 
        email: "google@example.com", 
        name: "Google User",
        role: "user" 
      }));
      toast.success("Logged in with Google");
      navigate("/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your credentials to access your account"
      altLink={{
        text: "Don't have an account?",
        linkText: "Sign up",
        href: "/register",
      }}
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="py-6"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="py-6"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full py-6"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
        
        <div className="flex items-center gap-4 py-2">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">OR</span>
          <Separator className="flex-1" />
        </div>
        
        <GoogleAuthButton type="login" onClick={handleGoogleLogin} />
        
        <div className="text-xs text-center text-muted-foreground mt-6">
          <p>Demo Accounts:</p>
          <p>Admin: admin@example.com / password</p>
          <p>User: user@example.com / password</p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
