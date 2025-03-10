import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Retrieves the authentication context.
 * @function useAuth
 * @throws {Error} If the hook is used outside of an `AuthProvider`.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};