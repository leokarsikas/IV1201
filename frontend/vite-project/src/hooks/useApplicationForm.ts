import { useState } from "react";
import { sendApplication } from "../services/applicationService";
import { ApplicationData } from "../types/applicationData";
import { useNavigate } from "react-router-dom";

export const useApplicationForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submitApplication = async (application: ApplicationData): Promise<void> => {
    /** Reset */
    setLoading(true);
    setError(null); 

    try {
      await sendApplication(application);
      alert("Ansökan har skickats!");
    } catch (err: any) {
      navigate("/error");
      setError(err.message || "Ett fel inträffade vid ansökan.");
    } finally {
      setLoading(false);
    }
  };

  return { submitApplication, loading, error };
};