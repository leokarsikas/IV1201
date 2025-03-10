import { API_URL } from "./apiConfig";
import { UserData } from "../types/userRegistrationData";
import { UserLoginData } from "../types/userLoginData";
/**
 * Logs in a user by sending credentials to the server.
 *
 * @param {UserLoginData} userData - The user's login credentials.
 * @returns A promise that resolves with the login response.
 * @throws {Error} If the login fails due to incorrect credentials or server issues.
 */
export const loginUser = async (userData: UserLoginData) => {
  try {
    const response = await fetch(`${API_URL}/login-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Wrong username or password");
      }

      throw new Error("Failed to login");
    }

    const data = await response.text();
    return data;
  } catch (error : any) {
    console.error("Login failed", error);

    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      throw new Error("Could not connect to the server. Please check your internet connection or try again later.");
    }

    // Preserve original error message instead of overriding it
    throw error 
  }
};
/**
 * Fetches user data from the server.
 *
 * @returns A promise that resolves to the user's data.
 * @throws {Error} If the request fails.
 */
export const fetchUserData = async () => {
  try {
    // Send GET request with the token in the Cookie
    const response = await fetch(`${API_URL}/authTest`, {
      method: "GET",
      credentials: "include", // cookie in request
    });

    if (!response.ok) {
      throw new Error("Failed to fetch User data");
    }

    const data = await response.json();
    console.log("User Data:", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
/**
 * Logs out the user by invalidating the session on the server.
 *
 * @returns A promise that resolves when the user is logged out.
 * @throws {Error} If the logout process fails.
 */
export const logoutUser = async () => {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to logout user, try again");
    }
  } catch (error) {
    console.error(error);
  }
};
/**
 * Registers a new user by sending their data to the server.
 *
 * @param {UserData} user - The user's registration details.
 * @returns A promise that resolves with the registration response.
 * @throws {Error} If registration fails due to network issues or server validation errors.
 */
export const registerUser = async (user: UserData) => {
  try {
    const response = await fetch(`${API_URL}/register-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      const errorMessage =
        errorBody?.message || response.status || "Unknown error";
      throw new Error(errorMessage);
    }
    
    return response.json(); // Return the token and user info
  } catch (error : any) {
    console.error("Login failed", error);

    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      throw new Error("Could not connect to the server. Please check your internet connection or try again later.");
    }

    throw error; 
  }
};
