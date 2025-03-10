import { useState } from "react";
import { registerUser } from "../services/authService";
import { UserData } from "../types/userRegistrationData";
/**
 * Custom hook for handling user registration.
 *
 * @returns {Object} An object containing user data, loading state, error message, success state, and the register function.
 */
export const useRegisterUser = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false)
  /**
   * Registers a new user by calling the authentication service.
   * @param {UserData} userData - The user data to register.
   * @returns A promise that resolves when the registration process completes.
   * @throws {Error} Sets the error state if registration fails.
   */
  const register = async (userData: UserData): Promise<void> => {
    setLoading(true);
    setError(null); // Reset previous errors
    setSuccess(false); // Reset previous success
    try {
      const registeredUserData = await registerUser(userData); // Register the user
      setUserData(registeredUserData);
      setSuccess(true); //  for the frontend to render a success message
    } catch (err: any) {
      const errorMessage = err.message || "An error occurred while registering.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { userData, loading, error, success, register };
};
