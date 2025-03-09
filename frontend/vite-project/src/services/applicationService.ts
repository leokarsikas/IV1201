import { API_URL } from "./apiConfig";
import { ApplicationData } from "../types/applicationData";

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
