import {User, UserData} from '../Model/User';

const API_URL = 'http://localhost:8080/api';

export default class HandleAPI {
  static async registerUser(user: User): Promise<string> {
    try {
      const response = await fetch(`${API_URL}/register-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user.toJSON()),
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      return await response.text();
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }

    static async loginUser(user: User): Promise<string> {
      try {
        const response = await fetch(`${API_URL}/login-user`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          //Ändrade argumentet för bodyn från user.toJSON()
          body: JSON.stringify(user.userData),
        });
  
        if (!response.ok) {
          throw new Error(`Server Error: ${response.status}`);
        }
  
        return await response.text();
      } catch (error) {
        console.error('Error saving user:', error);
        throw error;
      }
    }
  }
