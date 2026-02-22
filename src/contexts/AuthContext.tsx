import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface User {
  name: string;
  email: string;
  plan: string;
  picture?: string;
  level?: { level: number; name: string; xp: number; next_name?: string; progress?: number };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("myalgo_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading] = useState(false);

  const login = async (email: string, _password: string) => {
    const u: User = { name: email.split("@")[0], email, plan: "free", level: { level: 1, name: "Beginner", xp: 0, next_name: "Explorer", progress: 0 } };
    setUser(u);
    localStorage.setItem("myalgo_user", JSON.stringify(u));
  };

  const register = async (name: string, email: string, _password: string) => {
    const u: User = { name, email, plan: "free", level: { level: 1, name: "Beginner", xp: 0, next_name: "Explorer", progress: 0 } };
    setUser(u);
    localStorage.setItem("myalgo_user", JSON.stringify(u));
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("myalgo_user");
  };

  const refreshUser = useCallback(async () => {
    const saved = localStorage.getItem("myalgo_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
