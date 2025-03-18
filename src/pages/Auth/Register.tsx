
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import AuthLayout from "@/components/Auth/AuthLayout";
import GoogleAuthButton from "@/components/Auth/GoogleAuthButton";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({
        id: "4",
        name: formData.name,
        email: formData.email,
        role: "user",
      }));
      
      toast.success("Account created successfully");
      navigate("/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleRegister = () => {
    setIsLoading(true);
    
    // Simulate Google registration
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({
        id: "5",
        name: "Google User",
        email: "google@example.com",
        role: "user",
      }));
      
      toast.success("Account created with Google");
      navigate("/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Enter your information to create an account"
      altLink={{
        text: "Already have an account?",
        linkText: "Sign in",
        href: "/login",
      }}
    >
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
            className="py-6"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="py-6"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
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
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={8}
            className="py-6"
          />
        </div>

        <Button
          type="submit"
          className="w-full py-6"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
        
        <div className="flex items-center gap-4 py-2">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">OR</span>
          <Separator className="flex-1" />
        </div>
        
        <GoogleAuthButton type="register" onClick={handleGoogleRegister} />
      </form>
    </AuthLayout>
  );
};

export default Register;
