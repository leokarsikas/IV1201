import React, { useEffect, useState } from 'react';
import '../App.css';
import Input from '../Custom Components/input'


function UsersList() {
  interface User {
    id: number;
    name: string;
  }

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/')
      .then(response =>{
        console.log(response);
        return response.json();
      })    
      .then(data => {
        console.log(data);
      }
      )   
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
    <h2>Application</h2>
     <Input label={'First Name'}></Input>
     <Input label={'Last Name'}></Input>
     <Input label={'Personnummer'}></Input>
     <Input label={'Email'}></Input>
     <Input label={'Password'}></Input>
     <Input label={'Username'}></Input>
     <button>Apply</button>
  </div>
  );
}

export default UsersList;