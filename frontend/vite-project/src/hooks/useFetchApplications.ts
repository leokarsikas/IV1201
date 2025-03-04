import { useState, useEffect } from "react";
import { fetchApplications } from "../services/recruiterService";
import { useAuth } from "./useAuthLogin"; // Import Auth context if role-based access is needed

export const useFetchApplications = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { role } = useAuth(); // Get role from AuthContext

  useEffect(() => {
    // Optional: Ensure only admins (role === 1) can fetch applications
    if (role !== 1) {
      setError("Unauthorized access");
      setIsLoading(false);
      return;
    }

    const getApplications = async () => {
      try {
        const data = await fetchApplications();
        setApplications(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getApplications();
  }, [role]); // Re-run if role changes

  return { applications, isLoading, error };
};