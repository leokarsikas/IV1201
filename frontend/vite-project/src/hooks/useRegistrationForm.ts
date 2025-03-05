import { useState} from "react";
import { registerUser } from "../services/authService";
import { UserData } from "../types/userRegistrationData";

export const useRegisterUser = () => {
    const [userData, setUserData] = useState<UserData | null>(null); 
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
  
    const register = async (userData: UserData): Promise<void> => {
      setLoading(true);
      setError(null); // Reset previous errors
      try {
        const registeredUserData = await registerUser(userData); // Register the UserData
        setUserData(registeredUserData);
      } catch (err: any) {
        setError(err.message || "An error occurred while registering the UserData.");
      } finally {
        setLoading(false);
        setSuccess(true)
      }
    };
  
    return { userData, loading, error, register, success };
  };

