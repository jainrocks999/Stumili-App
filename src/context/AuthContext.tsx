import React, { createContext, useContext, useEffect, useState } from "react";
import { appStorage } from "../storage/AppStorage";
import { STORAGE_KEYS } from "../storage/storageKeys";
import { UserType } from "../types/AuthTypes";
import { loginUser, registerUser } from "../api/authApi";

interface AuthContextType {
  user: UserType | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (form: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Auto Login
  useEffect(() => {
    const loadStorage = async () => {
      const savedToken = await appStorage.getString(STORAGE_KEYS.TOKEN);
      const savedUser = await appStorage.getObject<UserType>(STORAGE_KEYS.USER);

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(savedUser);
      }

      setLoading(false);
    };

    loadStorage();
  }, []);

  // LOGIN
  const login = async (email: string, password: string) => {
    const res = await loginUser(email, password);
    if(res.status){
    appStorage.setString(STORAGE_KEYS.TOKEN,res.accessToken)
    appStorage.setString(STORAGE_KEYS.USER,JSON.stringify(res.user));
    }
  };

  // REGISTER
  const register = async (form: any) => {
    const res = await registerUser(form);
    
  };

  // LOGOUT
  const logout = async () => {
    setUser(null);
    setToken(null);

    await appStorage.remove(STORAGE_KEYS.TOKEN);
    await appStorage.remove(STORAGE_KEYS.USER);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
