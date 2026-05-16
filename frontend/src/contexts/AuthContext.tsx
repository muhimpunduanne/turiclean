import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Role, LoginCredentials, RegisterData, AuthResponse } from '@/types';
import { mockUsers, mockPasswords } from '@/data/mockUsers';
import { delay } from '@/lib/utils';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isHousehold: boolean;
  isCompany: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    if (stored && token) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.clear();
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    await delay(800);
    const foundUser = mockUsers.find((u) => u.email === credentials.email);
    if (!foundUser || mockPasswords[credentials.email] !== credentials.password) {
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }
    const tokens = { accessToken: 'mock-access-' + Date.now(), refreshToken: 'mock-refresh-' + Date.now() };
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('user', JSON.stringify(foundUser));
    setUser(foundUser);
    setIsLoading(false);
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    await delay(1000);
    if (mockUsers.find((u) => u.email === data.email)) {
      setIsLoading(false);
      throw new Error('Email already exists');
    }
    const newUser: User = {
      id: 'usr-' + Date.now(),
      email: data.email,
      fullName: data.fullName,
      role: data.role,
      phone: data.phone,
      provider: 'local',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const tokens = { accessToken: 'mock-access-' + Date.now(), refreshToken: 'mock-refresh-' + Date.now() };
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    isHousehold: user?.role === Role.HOUSEHOLD,
    isCompany: user?.role === Role.COMPANY,
    isAdmin: user?.role === Role.ADMIN,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
