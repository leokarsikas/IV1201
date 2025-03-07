import { API_URL } from "./apiConfig";

export const fetchApplications = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/get-all-applications`, {
        method: "GET",
        credentials: "include", // If using cookies for auth
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching applications:", error);
      throw error;
    }
  };