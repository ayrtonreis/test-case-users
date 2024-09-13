import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { Button, Input, Modal } from 'antd';
import { useUserManagementDispatch, useUserManagementState } from '../../store/hooks';
import {
  CANCEL_MODAL,
  DELETE_USER,
  CONFIRM_MODAL,
  SET_NEW_USER_NAME,
  SET_USER_ABOUT,
  SET_USER_BIRTHDAY,
  SET_USER_ICON,
} from '../../store/actions';
import { GridContainer, StyledButton, StyledDatePicker } from './styled';
import { EmojiModal } from './EmojiModal';

const UserModal = () => {
  const state = useUserManagementState();
  const dispatch = useUserManagementDispatch();

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleOk = () => dispatch({ type: CONFIRM_MODAL });
  const handleDelete = () => dispatch({ type: DELETE_USER });
  const handleCancel = () => {
    dispatch({ type: CANCEL_MODAL });
    setShowEmojiPicker(false);
  };
  const handleSetNewUserName = name => dispatch({ type: SET_NEW_USER_NAME, payload: name });
  const handleSetBirthday = date => dispatch({ type: SET_USER_BIRTHDAY, payload: date });
  const handleSetAbout = about => dispatch({ type: SET_USER_ABOUT, payload: about });

  const handleEmojiClick = useCallback(
    emojiObject => {
      const emoji = emojiObject.emoji;
      dispatch({ type: SET_USER_ICON, payload: emoji });
      setShowEmojiPicker(false);
    },
    [dispatch],
  );

  const handleCancelEmojiClick = useCallback(() => setShowEmojiPicker(false), []);

  const shouldDisableSave = !state.draftUser?.name || !state.draftUser?.birthday;

  return (
    <Modal
      title={state.isEditMode ? 'Edit User' : 'Add User'}
      data-testid="modal-edit-create"
      open={state.isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        state.isEditMode && (
          <Button key="delete" onClick={handleDelete} data-testid="button-delete">
            Delete
          </Button>
        ),
        <Button key="submit" type="primary" onClick={handleOk} disabled={shouldDisableSave}>
          {state.isEditMode ? 'Save' : 'Add'}
        </Button>,
      ]}
    >
      <GridContainer>
        <StyledButton shape="circle" onClick={() => setShowEmojiPicker(true)}>
          {state.draftUser?.icon}
        </StyledButton>
        {showEmojiPicker && <EmojiModal onConfirm={handleEmojiClick} onCancel={handleCancelEmojiClick} />}

        <Input
          data-testid="input-username"
          placeholder="User Name"
          value={state.draftUser?.name}
          onChange={e => handleSetNewUserName(e.target.value)}
          maxLength={40}
        />
        <StyledDatePicker
          value={state.draftUser?.birthday ? dayjs(state.draftUser.birthday) : null}
          onChange={handleSetBirthday}
          format="DD-MM-YYYY"
          placeholder="Select Birthday"
        />
        <Input.TextArea
          data-testid="input-about"
          placeholder="About"
          value={state.isModalVisible ? state.draftUser?.about : ''}
          onChange={e => handleSetAbout(e.target.value)}
          autoSize={{ minRows: 2, maxRows: 4 }}
          maxLength={150}
        />
      </GridContainer>
    </Modal>
  );
};

export default UserModal;
