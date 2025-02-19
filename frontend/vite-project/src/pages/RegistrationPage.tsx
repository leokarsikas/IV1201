import React, { useState } from "react";
import { NavLink,  } from 'react-router-dom';
import Input from "../components/input";
import Button from "../components/button";
import { useRegisterUser } from "../hooks/useRegistrationForm";
import { UserData } from "../types/userRegistrationData";
import "../styling/RegistrationForm.css";

export default function RegistrationPage() {
    
  const { register, loading, error } = useRegisterUser();  

  const [userData, setUserData] = useState<UserData>({
    name: '',
    surname: '',
    pnr: '',
    email: '',
    password: '',
    username: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));
  };

  async function onSubmit (event: React.FormEvent){
    console.log(userData)
    event.preventDefault();
    await register(userData);
  }

  return (
    <div className="page-container">
      <NavLink to="/" className="company-name">
            Leos jobbland.
      </NavLink>
      <div className="form-container">
      <h2>Registrera dig</h2>
      <form onSubmit={onSubmit}>
        <div className="name-container">
          <Input
            placeholder="First Name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            type="text"
            width="242px"
          />
          <Input
            placeholder="Last Name"
            name="surname"
            value={userData.surname}
            onChange={handleInputChange}
            type="text"
            width="242px"
          />
        </div>
        <h2>{error}</h2>
        <Input
          placeholder="Personnummer"
          name="pnr"
          value={userData.pnr}
          onChange={handleInputChange}
          type="text"
          width="500px"
        />
        <Input
          placeholder="Email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          type="email"
          width="500px"
        />
        <Input
          placeholder="Password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          type="password"
          width="500px"
        />
        <Input
          placeholder="Username"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
          type="text"
          width="500px"
        />

        <div className="button-container">
          <Button
            className="custom-button"
            text="Registrera dig"
            type="submit"
            padding="15px 100px"
            borderRadius="99px"
            fontWeight="600px"
          />
        </div>
      </form>
      </div>
      
    </div>
  );
}
