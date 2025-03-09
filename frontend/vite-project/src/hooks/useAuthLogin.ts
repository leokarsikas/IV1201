import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 *  The `useAuth` custom hook is returning the `context` obtained from the
 * `useContext(AuthContext)` hook. If the `context` is not available (i.e., `!context`), an error is
 * thrown with the message "useAuth must be used within an AuthProvider".
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};