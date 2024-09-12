import React from 'react';
import { Button } from 'antd';
import { useUserManagementDispatch, useUserManagementState } from '../../store/hooks';
import { SHOW_MODAL } from '../../store/actions';
import { UserModal } from '../UserModal';

const UsersList = () => {
  const state = useUserManagementState();
  const dispatch = useUserManagementDispatch();

  const showModal = (user = null) => dispatch({ type: SHOW_MODAL, payload: user });

  return (
    <div style={{ padding: '20px' }}>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {state.users.map(user => (
          <li key={user.id} style={{ margin: '10px 0' }}>
            <span>
              {user.icon} {user.name}
            </span>
            <Button onClick={() => showModal(user)}>Edit</Button>
          </li>
        ))}
      </ul>
      <Button onClick={() => showModal()}>Add User</Button>
      <UserModal />
    </div>
  );
};

export default UsersList;
