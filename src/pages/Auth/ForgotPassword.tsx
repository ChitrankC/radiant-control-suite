
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/Auth/AuthLayout";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate sending password reset email
    setTimeout(() => {
      toast.success("Password reset link sent to your email");
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email to receive a password reset link"
      altLink={{
        text: "Remember your password?",
        linkText: "Sign in",
        href: "/login",
      }}
    >
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <Button
            type="submit"
            className="w-full py-6"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send reset link"}
          </Button>
        </form>
      ) : (
        <div className="text-center space-y-6">
          <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
              />
            </svg>
          </div>
          
          <h3 className="text-xl font-semibold">Check your email</h3>
          <p className="text-muted-foreground">
            We've sent a password reset link to <span className="font-medium">{email}</span>
          </p>
          
          <div className="pt-4">
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="w-full py-6"
            >
              Back to sign in
            </Button>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
