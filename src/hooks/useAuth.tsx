
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const requireAuth = (callback?: () => void) => {
    if (!context.isLoading && !context.isAuthenticated) {
      navigate('/login');
    } else if (callback && !context.isLoading && context.isAuthenticated) {
      callback();
    }
  };

  const requireAdmin = (callback?: () => void) => {
    if (!context.isLoading && !context.isAuthenticated) {
      navigate('/login');
    } else if (!context.isLoading && context.isAuthenticated && !context.isAdmin()) {
      navigate('/dashboard');
    } else if (callback && !context.isLoading && context.isAuthenticated && context.isAdmin()) {
      callback();
    }
  };

  return {
    ...context,
    requireAuth,
    requireAdmin,
  };
};
