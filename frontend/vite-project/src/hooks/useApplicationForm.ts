import { useState} from "react";
import { sendApplication } from "../services/applicationService";
import { ApplicationData } from "../types/applicationData";

export const useApplicationForm = () => {
    const [applicationData, setUserData] = useState<ApplicationData | null>(null); 
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const competence = async (application : ApplicationData): Promise<void> => {
      setLoading(true);
      setError(null); // Reset previous errors
      try {
        const registeredApplicationData = await sendApplication(application); // Register the UserData
        setUserData(registeredApplicationData);
      } catch (err: any) {
        setError(err.message || "An error occurred while handeling competence");
      } finally {
        setLoading(false);
      }
    };
  
    return { applicationData, loading, error, competence};
  };