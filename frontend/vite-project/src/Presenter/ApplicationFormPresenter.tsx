import React, { useState } from 'react';
import ApplicationFormView from '../View/ApplicationFormView';
import { User, UserData } from '../Model/User';

export default function ApplicationFormPresenter() {
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
      console.error('Error during registration:', error);
      alert('An error occurred during registration. Please try again.');
    }
  };

  return (
    <ApplicationFormView
      userData={userData}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
    />
  );
}
