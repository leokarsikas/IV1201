import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './components/App.tsx';
import UsersList from './components/UserList.tsx';

function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/api" element={<UsersList />} />
      </Routes>
    </Router>
  );
}

export default Root;