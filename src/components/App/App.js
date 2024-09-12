import './App.css';
import React from 'react';
import { UserManagementProvider } from '../../store/context';
import { UsersList } from '../UsersList';
import { UserModal } from '../UserModal';

const App = () => {
  return (
    <UserManagementProvider>
      <UsersList />
      <UserModal />
    </UserManagementProvider>
  );
};

export default App;
