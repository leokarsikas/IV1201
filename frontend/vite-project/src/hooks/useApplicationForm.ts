import { useState } from "react";
import { sendApplication } from "../services/applicationService";
import { ApplicationData } from "../types/applicationData";

export const useApplicationForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false)
  
  const submitApplication = async (application: ApplicationData): Promise<void> => {
    /** Reset */
    setLoading(true);
    setError(null); 
    setSuccess(false)

    try {
      const result = await sendApplication(application);
      setSuccess(result)
    } catch (err: any) {
    
      setError(err.message || "Ett fel inträffade vid ansökan.");
    } finally {
      setLoading(false);
    }
  };

  return { submitApplication, loading, error, success };
};