import { useContext } from 'react';
import { UserManagementContext, UserManagementDispatchContext } from './context';

export const useUserManagementState = () => useContext(UserManagementContext);
export const useUserManagementDispatch = () => useContext(UserManagementDispatchContext);
