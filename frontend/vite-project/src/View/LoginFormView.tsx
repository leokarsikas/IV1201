import React from "react";
import { NavLink,  } from 'react-router-dom';
import Input from "../Custom Components/input";
import Button from "../Custom Components/button";
import "../styling/LoginForm.css";

interface LoginFormProps {
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

export default function LoginFormView({
  userData,
  onInputChange,
  onSubmit,
}: Readonly<LoginFormProps>) {
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
      <h2>Logga in</h2>
      <form onSubmit={onSubmit}>
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
        <div className="button-container">
          <Button
            className="custom-button"
            text="Logga in"
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
