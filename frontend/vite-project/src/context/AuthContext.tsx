import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from '../services/authService';
import {UserData} from '../types/userRegistrationData'

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);

  async function handleRegister(userData: UserData) {
    await registerUser(userData);
    setUser(userData);
  }

  async function handleLogin(username: string, password: string) {
    await loginUser(username, password);
    setUser({ username, name: "", surname: "", pnr: "", email: "", password }); 
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, handleRegister, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
