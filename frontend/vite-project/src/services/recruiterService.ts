import { API_URL } from "./apiConfig";

/**
 * Fetches all job applications from the server.
 *
 * This function sends a GET request to the API endpoint responsible for retrieving
 * all applications. The request includes credentials, such as cookies.
 * 
 * @returns A promise that resolves to the JSON response containing job applications.
 * @throws {Error} If the request fails or returns a non-OK response.
 */
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