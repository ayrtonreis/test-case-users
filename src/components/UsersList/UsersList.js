import React from 'react';
import { Button, Input, Modal } from 'antd';
import { useUserManagementDispatch, useUserManagementState } from '../../store/hooks';
import { HANDLE_CANCEL, HANDLE_DELETE, HANDLE_OK, SET_NEW_USER_NAME, SHOW_MODAL } from '../../store/actions';

const UsersList = () => {
  const state = useUserManagementState();
  const dispatch = useUserManagementDispatch();

  const showModal = (user = null) => dispatch({ type: SHOW_MODAL, payload: user });
  const handleOk = () => dispatch({ type: HANDLE_OK });
  const handleDelete = () => dispatch({ type: HANDLE_DELETE });
  const handleCancel = () => dispatch({ type: HANDLE_CANCEL });
  const handleSetNewUserName = name => dispatch({ type: SET_NEW_USER_NAME, payload: name });

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
      <Modal
        title={state.isEditMode ? 'Edit User' : 'Add User'}
        open={state.isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          state.isEditMode && (
            <Button key="delete" onClick={handleDelete}>
              Delete
            </Button>
          ),
          <Button key="submit" type="primary" onClick={handleOk}>
            {state.isEditMode ? 'Save' : 'Add'}
          </Button>,
        ]}
      >
        <Input placeholder="User Name" value={state.newUserName} onChange={e => handleSetNewUserName(e.target.value)} />
      </Modal>
    </div>
  );
};

export default UsersList;
