import { useState } from "react";
import { sendApplication } from "../services/applicationService";
import { ApplicationData } from "../types/applicationData";
/**
 * Custom hook for handling job application submission.
 *
 * @returns {Object} An object containing the submit function, loading state, error message, and success state.
 */
export const useApplicationForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  /**
   * Submits a job application to the server.
   * @param {ApplicationData} application - The job application data to submit.
   * @returns A promise that resolves when the submission process completes.
   * @throws {Error} If the application submission fails, sets an error message.
   */
  const submitApplication = async (
    application: ApplicationData
  ): Promise<void> => {
    /** Reset */
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await sendApplication(application);
      setSuccess(result); // sets success to true to render a succesfull message in the frontend
    } catch (err: any) {
      setError(err.message || "Ett fel inträffade vid ansökan.");
    } finally {
      setLoading(false);
    }
  };

  return { submitApplication, loading, error, success };
};
