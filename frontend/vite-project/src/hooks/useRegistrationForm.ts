import { useState } from "react";
import { registerUser } from "../services/authService";
import { UserData } from "../types/userRegistrationData";

export const useRegisterUser = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (userData: UserData): Promise<string | null> => {
    setLoading(true);
    setError(null); // Reset previous errors

    try {
      const registeredUserData = await registerUser(userData); // Register the user
      setUserData(registeredUserData);
      return null; // Indicate success (no error)
    } catch (err: any) {
      const errorMessage = err.message || "An error occurred while registering.";
      setError(errorMessage);
      return errorMessage; // Return the error message
    } finally {
      setLoading(false);
    }
  };

  return { userData, loading, error, register };
};
