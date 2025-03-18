import { createContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  isAdmin: () => boolean;
  requireAuth: () => boolean;
  requireAdmin: () => boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
  isAdmin: () => false,
  requireAuth: () => false,
  requireAdmin: () => false,
});

// Predefined admin user
const adminUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@lumina.com',
  role: 'admin'
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set the predefined admin user immediately
    setUser(adminUser);
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    // We still keep this method for future use, but it just resets to admin
    setUser(adminUser);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // New methods to handle authentication requirements
  const requireAuth = () => {
    // Since we've removed login functionality and always have admin user,
    // this always returns true but we keep it for future use
    return true;
  };

  const requireAdmin = () => {
    // Since we've removed login functionality and always have admin user with admin role,
    // this always returns true but we keep it for future use
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        isAdmin,
        requireAuth,
        requireAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
