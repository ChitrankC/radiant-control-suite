
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  altLink: {
    text: string;
    linkText: string;
    href: string;
  };
}

const AuthLayout = ({ children, title, subtitle, altLink }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left panel (decorative) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary/90 to-primary-foreground/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 w-full h-full flex items-center justify-center p-12">
          <div className="glass-card p-8 w-full max-w-md">
            <h1 className="text-3xl font-bold text-white mb-6">Lumina Control</h1>
            <p className="text-white/80 mb-6">
              Advanced lighting management system for intelligent buildings and spaces. Optimize energy usage and enhance comfort with precision control.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-light-on text-lg font-bold mb-1">30%</div>
                <div className="text-white/70 text-sm">Energy Savings</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-light-on text-lg font-bold mb-1">100%</div>
                <div className="text-white/70 text-sm">User Satisfaction</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-light-on text-lg font-bold mb-1">24/7</div>
                <div className="text-white/70 text-sm">Monitoring</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-light-on text-lg font-bold mb-1">Smart</div>
                <div className="text-white/70 text-sm">Automation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel (form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-fadeIn">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground mt-2">{subtitle}</p>
          </div>
          
          <div className="space-y-6">{children}</div>
          
          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              {altLink.text}{" "}
              <Link to={altLink.href} className="text-primary hover:underline font-medium">
                {altLink.linkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
