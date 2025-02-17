import { API_URL } from "./apiConfig";
import { UserData } from "../types/userRegistrationData";
import { UserLoginData } from "../types/userLoginData";


export const loginUser = async (userData : UserLoginData) => {
    const response = await fetch(`${API_URL}/login-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to login');
    }
  
    return response.json(); // Return the token and user info
  };

  export const registerUser = async (user : UserData) => {
    const response = await fetch(`${API_URL}/register-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
  
    if (!response.ok) {
        const errorBody = await response.json();
        const errorMessage = errorBody?.message || response.status || 'Unknown error';
      throw new Error(errorMessage);
    }
  
    return response.json(); // Return the token and user info
  };

