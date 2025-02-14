import React, { useState } from 'react';
import RegistrationFormView from '../View/RegistrationFormView';
import { ApiError } from '../utils/ErrorType';
import { User, UserData } from '../Model/User';

export default function RegistrationForm() {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    surname: '',
    pnr: '',
    email: '',
    password: '',
    username: '',
  });

  const [message, setMessage] = useState<string>('');

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
      console.log(message)
      setMessage(message);
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('An error occurred during registration. Please try again.'); // Update the message on error
    }
  };

  return (
    <RegistrationFormView
      userData={userData}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      message={message}
    />
  );
}
