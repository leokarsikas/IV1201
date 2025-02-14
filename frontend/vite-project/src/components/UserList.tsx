import React, { useEffect, useState } from 'react';
import '../App.css';
import Input from '../Custom Components/input';

function UsersList() {
  /*User information when register */
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    pnr: '',
    email: '',
    password: '',
    username: ''
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/')
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
  };

  // send data to Spring Boot
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
  };
    try {
      const response = await fetch('http://localhost:8080/api/register-user', request);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div>
      <h2>Application</h2>
      <form method="post" onSubmit={handleSubmit}>
        <Input label="First Name" name="name" value={formData.name} onChange={handleInputChange} type='text' />
        <Input label="Last Name" name="surname" value={formData.surname} onChange={handleInputChange} type='text'/>
        <Input label="Personnummer" name="pnr" value={formData.pnr} onChange={handleInputChange} type='text'/>
        <Input label="Email" name="email" value={formData.email} onChange={handleInputChange} type='text'/>
        <Input label="Password" name="password" value={formData.password} onChange={handleInputChange} type="password" />
        <Input label="Username" name="username" value={formData.username} onChange={handleInputChange} type='text'/>

        <button type="submit">Apply</button>
      </form>
    </div>
  );
}

export default UsersList;
