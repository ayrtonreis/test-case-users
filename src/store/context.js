import { createContext, useReducer } from 'react';
import { initialState, reducer } from './state';

/**
 * @typedef {Object} UserState
 * @typedef {React.DispatchWithoutAction} UserDispatch
 */

/** @type {React.Context<UserState>} */
export const UserManagementContext = createContext(null);

/** @type {React.Context<UserDispatch | null>} */
export const UserManagementDispatchContext = createContext(null);

export const UserManagementProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserManagementContext.Provider value={state}>
      <UserManagementDispatchContext.Provider value={dispatch}>{children}</UserManagementDispatchContext.Provider>
    </UserManagementContext.Provider>
  );
};
