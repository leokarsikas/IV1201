import React, { useState } from 'react';
import LoginFormView from '../View/LoginFormView';
import { User, UserData } from '../Model/User';

export default function LoginForm() {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    surname: '',
    pnr: '',
    email: '',
    password: '',
    username: '',
  });

  const handleInputChange = (name: string, value: string) => {
    setUserData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const user = new User(userData);

    try {
     
      const message = await user.registerUser();
      alert(message); 
    } catch (error) {
      console.error('Error during logging in:', error);
      alert('An error occurred during logging in. Please try again.');
    }
  };

  return (
    <LoginFormView
      userData={userData}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
    />
  );
}
