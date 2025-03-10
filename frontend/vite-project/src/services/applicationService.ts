import { API_URL } from "./apiConfig";
import { ApplicationData } from "../types/applicationData";
 /**
 * Sends a job application to the server.
 *
 * This function makes a POST request to the `/send-application` API endpoint
 * with the application data in JSON format.
 * @param {ApplicationData} applicationData - The application details to be submitted.
 * @returns A promise that resolves to `true` if the request was successful.
 * @throws {Error} If the request fails or an error occurs during submission.
 */

export const sendApplication = async (applicationData : ApplicationData) => {
  try{
    const response = await fetch(`${API_URL}/send-application`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicationData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to send application'); 
    }

    return response.ok
  }catch(error){
    console.log(error)
    throw new Error("Ett fel inträffade vid ansökan. Försök igen om en stund")
  }
  };

