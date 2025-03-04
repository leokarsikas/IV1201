import { useState } from "react";
import { sendApplication } from "../services/applicationService";
import { ApplicationData } from "../types/applicationData";

export const useApplicationForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitApplication = async (application: ApplicationData): Promise<void> => {
    /** Reset */
    setLoading(true);
    setError(null); 

    try {
      await sendApplication(application);
      alert("Ansökan har skickats!");
    } catch (err: any) {
      setError(err.message || "Ett fel inträffade vid ansökan.");
    } finally {
      setLoading(false);
    }
  };

  return { submitApplication, loading, error };
};