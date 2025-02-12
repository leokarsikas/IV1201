import React from "react";
import { NavLink,  } from 'react-router-dom';
import Input from "../Custom Components/input";
import Button from "../Custom Components/button";
import "../styling/ApplicationForm.css";

interface ApplicationFormViewProps {
  userData: {
    name: string;
    surname: string;
    pnr: string;
    email: string;
    password: string;
    username: string;
  };
  onInputChange: (name: string, value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
}

export default function ApplicationFormView({
  userData,
  onInputChange,
  onSubmit,
}: Readonly<ApplicationFormViewProps>) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onInputChange(name, value);
  };

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
