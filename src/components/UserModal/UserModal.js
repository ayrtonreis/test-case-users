import React from 'react';
import { Button, Input, Modal } from 'antd';
import { useUserManagementDispatch, useUserManagementState } from '../../store/hooks';
import { HANDLE_CANCEL, HANDLE_DELETE, HANDLE_OK, SET_NEW_USER_NAME } from '../../store/actions';

const UserModal = ({}) => {
  const state = useUserManagementState();
  const dispatch = useUserManagementDispatch();

  const handleOk = () => dispatch({ type: HANDLE_OK });
  const handleDelete = () => dispatch({ type: HANDLE_DELETE });
  const handleCancel = () => dispatch({ type: HANDLE_CANCEL });
  const handleSetNewUserName = name => dispatch({ type: SET_NEW_USER_NAME, payload: name });

  return (
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
  );
};

export default UserModal;
