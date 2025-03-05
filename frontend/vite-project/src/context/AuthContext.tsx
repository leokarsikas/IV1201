import { createContext, useState, useEffect, ReactNode } from "react";
import { loginUser, fetchUserData, logoutUser } from "../services/authService"; 
import { UserLoginData } from "../types/userLoginData";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  userName: string | null;
  role: number | null;
  login: (userData: UserLoginData) => Promise<string | null>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [role, setRole] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Fetch user data on app load
  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchUserData();
        if (userData) {
          setUserName(userData.username); 
          setRole(userData.role);        
          console.log("User fetched:", userData);
        } else {
          console.warn("No user data received");
          setUserName(null);
          setRole(null);
        }
      } catch (error: any) {
        console.error("Failed to fetch user", error);
        setError(error?.message || "Failed to fetch user information");
        setUserName(null);
        setRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  const login = async (userData: UserLoginData): Promise<string | null> => {
    setError(null); // Reset errors
    setIsLoading(true)
    try {
      await loginUser(userData);
      const fetchedUser = await fetchUserData(); 
      if (fetchedUser) {
        setUserName(fetchedUser.username); 
        setRole(fetchedUser.role);         
      }
      return null; // Indicate success (no error)
    } catch (error: any) {
      console.error("Login failed in Context", error);
      const errorMessage = error?.message || "Login failed";
      setError(errorMessage);
      return errorMessage; // Return the error
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUserName(null);
    setRole(null);
    logoutUser();
  };

  return (
    <AuthContext.Provider value={{ userName, role, login, logout, isLoading, error}}>
      {children}
    </AuthContext.Provider>
  );
};

