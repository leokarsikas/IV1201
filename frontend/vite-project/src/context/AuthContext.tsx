import { createContext, useState, useEffect, ReactNode } from "react";
import { loginUser, fetchUserData, logoutUser } from "../services/authService";
import { UserLoginData } from "../types/userLoginData";

/**
 * Interface defining the structure of the authentication context.
 * @interface AuthContextType
 * @property {string | null} userName - The authenticated user's username.
 * @property {number | null} role - The user's role identifier.
 * @property {Function} login - Function to log in the user.
 * @property {Function} logout - Function to log out the user.
 * @property {boolean} isLoading - Indicates whether authentication is in progress.
 * @property {string | null} error - Stores authentication errors.
 */
interface AuthContextType {
  userName: string | null;
  role: number | null;
  login: (userData: UserLoginData) => Promise<string | null>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}
/**
 * Authentication context to provide user authentication state.
 * @constant {React.Context<AuthContextType | undefined>} AuthContext - The authentication context.
 */
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
/**
 * Provides authentication state management
 * @function AuthProvider
 * @param {ReactNode} children - React components that will have access to authentication state.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [role, setRole] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches user data on component mount to restore authentication state.
   *
   * @function useEffect
   */
  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchUserData();
        if (userData) {
          setUserName(userData.username);
          setRole(userData.role);
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
  /**
   * Logs in the user by calling the authentication service.
   * @param {UserLoginData} userData - The user's login credentials.
   * @returns {Promise<string | null>} A promise resolving to `null` on success or an error message on failure.
   */
  const login = async (userData: UserLoginData): Promise<string | null> => {
    setError(null); // Reset errors
    setIsLoading(true);
    try {
      await loginUser(userData);
      console.log(userData);
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

  /**
   * Logs out the user by clearing authentication state and local storage.
   * @function logout
   */
  const logout = () => {
    setUserName(null);
    setRole(null);
    logoutUser();
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{ userName, role, login, logout, isLoading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
