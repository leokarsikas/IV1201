import HandleAPI from "../utils/HandleAPI";
import { ApiError } from "../utils/ErrorType";

export interface UserData {
  name: string;
  surname: string;
  pnr: string;
  email: string;
  password: string;
  username: string;
}

export class User {
  userData: UserData;

  constructor(data: UserData) {
    this.userData = data;
  }

  async registerUser(): Promise<string> {
    try {
      const message = await HandleAPI.registerUser(this);
      return message;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`API error (${error.status}): ${error.message}`);
        throw new ApiError(error.status, error.message);
      }
      console.log(error)
      throw error;
    }
  }

  async loginUser(): Promise<string> {
    try {
      const message = await HandleAPI.loginUser(this)
      return message;
    }catch (error: any){
      throw new Error("Error during logging in: " + error.message)
    }
  }
  toJSON(): object {
    return {
      name: this.userData.name,
      surname: this.userData.surname,
      pnr: this.userData.pnr,
      email: this.userData.email,
      username: this.userData.username,
    };
  }
}
