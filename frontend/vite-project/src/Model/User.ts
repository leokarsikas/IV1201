import HandleAPI from "../utils/HandleAPI";

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
    } catch (error: any) {
      throw new Error('Error during registration: ' + error.message);
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
      password: this.userData.password
    };
  }
}
