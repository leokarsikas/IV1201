import { useState, useEffect } from "react";
import { fetchApplications } from "../services/recruiterService";
import { useAuth } from "./useAuthLogin";
import { useNavigate } from "react-router-dom";
/**
 * Custom hook to fetch job applications.
 *
 * @returns {Object} An object containing application data, loading state, and error message.
 */
export const useFetchApplications = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { role } = useAuth(); // Get role from AuthContext
  const navigate = useNavigate(); // Add navigate from useNavigate
  /**
   * Fetches job applications only if the user has the correct role.
   * Redirects unauthorized users and updates state accordingly.
   * @param {Function} callback - Function executed on component mount and when dependencies change.
   * @param {Array} dependencies - Dependencies that trigger the effect.
   */
  useEffect(() => {
    /* Ensure only admins (role === 1) can fetch applications */
    if (role !== 1) {
      setError("Unauthorized access");
      setIsLoading(false);
      return;
    }

/**
* Fetches application data from the server.
* @function getApplications
* @throws {Error} If fetching applications fails, the error message is set, and the user is redirected.    
*/
    const getApplications = async () => {
      try {
        const data = await fetchApplications();
        setApplications(data);
      } catch (err: any) {
        navigate("/error");
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getApplications();
  }, [role]); // Re-run if role changes

  return { applications, isLoading, error };
};