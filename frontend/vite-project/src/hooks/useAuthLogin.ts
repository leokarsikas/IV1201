import { useState} from "react";
import { loginUser } from "../services/authService";
import { UserLoginData } from "../types/userLoginData";

export const useLoginUser = () => {
    const [userData, setUserData] = useState<UserLoginData | null>(null); 
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const login = async (userData: UserLoginData): Promise<void> => {
      setLoading(true);
      setError(null); // Reset previous errors
      try {
        const loginUserData = await loginUser(userData); // Register the UserData
        setUserData(loginUserData);
      } catch (err: any) {
        setError(err.message || "An error occurred while registering the UserData.");
      } finally {
        setLoading(false);
      }
    };
  
    return { userData, loading, error, login };
  };

