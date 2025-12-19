// app/context/AuthProvider.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { API_BASE_URL, getAuthHeaders } from "@/lib/api/config";

interface User {
  id: string;
  email: string;
  full_name: string;
  is_premium: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  fetchUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: "GET",
        headers: getAuthHeaders(),
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const { data } = await res.json();
      const userResponse = data.user;

      setUser({
        id: userResponse.id || "",
        email: userResponse.email,
        full_name: userResponse.fullName || userResponse.full_name,
        is_premium: userResponse.isPremium || userResponse.is_premium || false,
      });
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
