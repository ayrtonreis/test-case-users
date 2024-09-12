import './App.css';
import React from 'react';
import { UserManagementProvider } from '../../store/context';
import { UsersList } from '../UsersList';

const App = () => {
  return (
    <UserManagementProvider>
      <UsersList />
    </UserManagementProvider>
  );
};

export default App;
