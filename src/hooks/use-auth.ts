/**
 * Authentication Hook
 * Manages login, logout, and user state
 */

import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { LoginPayload } from '../types/api';

export function useAuth() {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: api.auth.login,
    onSuccess: (data) => {
      if (data.success && data.token) {
        api.auth.setToken(data.token);
        if (data.user) {
          api.auth.setUser(data.user);
        }
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error(data.error || 'Login failed');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed');
    },
  });

  const login = (payload: LoginPayload) => {
    loginMutation.mutate(payload);
  };

  const logout = () => {
    api.auth.logout();
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const isAuthenticated = () => {
    return !!api.auth.getToken();
  };

  const getUser = () => {
    return api.auth.getUser();
  };

  return {
    login,
    logout,
    isAuthenticated,
    getUser,
    isLoading: loginMutation.isPending,
  };
}
