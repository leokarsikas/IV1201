import React, { useEffect, useState } from 'react';
import '../App.css';


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
    <h2>Users</h2>
    <ul>

     {} {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  </div>
  );
}

export default UsersList;