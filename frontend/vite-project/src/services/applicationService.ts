import { API_URL } from "./apiConfig";
import { ApplicationData } from "../types/applicationData";

export const sendApplication = async (applicationData : ApplicationData) => {
    const response = await fetch(`${API_URL}/send-application`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicationData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to send application');
    }
  };
