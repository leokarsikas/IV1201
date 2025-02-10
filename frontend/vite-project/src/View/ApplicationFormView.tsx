import React from 'react';
import Input from '../Custom Components/input';

interface ApplicationFormViewProps {
  userData: {
    name: string,
    surname: string,
    pnr: string,
    email: string,
    password: string,
    username: string
  };
  onInputChange: (name: string, value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
}

export default function ApplicationFormView({ userData, onInputChange, onSubmit }: Readonly<ApplicationFormViewProps>) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onInputChange(name, value);
  };

  return (
    <div>
      <h2>Application</h2>
      <form onSubmit={onSubmit}>
        <Input label="First Name" name="name" value={userData.name} onChange={handleInputChange} type='text' />
        <Input label="Last Name" name="surname" value={userData.surname} onChange={handleInputChange} type='text'/>
        <Input label="Personnummer" name="pnr" value={userData.pnr} onChange={handleInputChange} type='text'/>
        <Input label="Email" name="email" value={userData.email} onChange={handleInputChange} type='text'/>
        <Input label="Password" name="password" value={userData.password} onChange={handleInputChange} type="password"/>
        <Input label="Username" name="username" value={userData.username} onChange={handleInputChange} type='text'/>

        <button type="submit">Apply</button>
      </form>
    </div>
  );
}
