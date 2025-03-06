import { API_URL } from "./apiConfig";
import { UserData } from "../types/userRegistrationData";
import { UserLoginData } from "../types/userLoginData";

export const loginUser = async (userData: UserLoginData) => {
  try {
    const response = await fetch(`${API_URL}/login-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data = await response.text(); // backend currently sends the token in the response body
    console.log(data);
    return data;
  } catch (error) {
    console.error("Login failed", error);
    throw new Error("Something went wrong... Try again later");
  }
};

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
  } catch (error) {
    console.error("Login failed", error);
    throw new Error("Something went wrong... Try again later");
  }
};
