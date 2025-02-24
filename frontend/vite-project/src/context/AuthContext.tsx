import { createContext, useState, useEffect, ReactNode } from "react";
import { loginUser, fetchUserData, logoutUser } from "../services/authService"; // Adjust path if needed
import { UserLoginData } from "../types/userLoginData";

interface AuthContextType {
  user: any | null;
  login: (userData: UserLoginData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)

  // Fetch user data on app load
  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);
        console.log(userData)
      } catch (error : any) {
        console.error("Failed to fetch user", error)
        setError(error?.message || "Failed to fetch user information"); 
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  const login = async (userData: UserLoginData) => {
    try {
      await loginUser(userData);
      const user = await fetchUserData(); // Fetch user details after login
      setUser(user);
    } catch (error: any) {
      console.error("Login failed", error);
      setError(error?.message || "Login failed"); 
    }
  };

  const logout = () => {
    setUser(null); 
    logoutUser()
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
