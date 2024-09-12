import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Button, DatePicker, Input, Modal } from 'antd';
import { useUserManagementDispatch, useUserManagementState } from '../../store/hooks';
import {
  HANDLE_CANCEL,
  HANDLE_DELETE,
  HANDLE_OK,
  SET_NEW_USER_NAME,
  SET_USER_ABOUT,
  SET_USER_BIRTHDAY,
  SET_USER_ICON,
} from '../../store/actions';
import EmojiPicker from 'emoji-picker-react';
import TextArea from 'antd/es/input/TextArea';
import { GridContainer } from './styled';

const UserModal = () => {
  const state = useUserManagementState();
  const dispatch = useUserManagementDispatch();

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleOk = () => dispatch({ type: HANDLE_OK });
  const handleDelete = () => dispatch({ type: HANDLE_DELETE });
  const handleCancel = () => {
    dispatch({ type: HANDLE_CANCEL });
    setShowEmojiPicker(false);
  };
  const handleSetNewUserName = name => dispatch({ type: SET_NEW_USER_NAME, payload: name });
  const handleSetBirthday = date => dispatch({ type: SET_USER_BIRTHDAY, payload: date });
  const handleSetIcon = icon => dispatch({ type: SET_USER_ICON, payload: icon });
  const handleSetAbout = about => dispatch({ type: SET_USER_ABOUT, payload: about });

  const handleEmojiClick = emojiObject => {
    const emoji = emojiObject.emoji;
    handleSetIcon(emoji);
    setShowEmojiPicker(false);
  };

  const shouldDisableSave = !state.draftUser?.name || !state.draftUser?.birthday;

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
        <Button key="submit" type="primary" onClick={handleOk} disabled={shouldDisableSave}>
          {state.isEditMode ? 'Save' : 'Add'}
        </Button>,
      ]}
    >
      <GridContainer>
        <Button
          shape="circle"
          style={{ backgroundColor: 'rgba(255,255,255,0)' }}
          onClick={() => setShowEmojiPicker(true)}
        >
          {state.draftUser?.icon}
        </Button>
        {showEmojiPicker && (
          <div style={{ position: 'absolute', zIndex: 1 }}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        <Input
          placeholder="User Name"
          value={state.draftUser?.name}
          onChange={e => handleSetNewUserName(e.target.value)}
          maxLength={40}
        />
        <DatePicker
          style={{ width: '100%' }}
          value={state.draftUser?.birthday ? dayjs(state.draftUser.birthday) : null}
          onChange={handleSetBirthday}
          format="DD-MM-YYYY"
          placeholder="Select Birthday"
        />
        <TextArea
          value={state.draftUser?.about}
          onChange={e => handleSetAbout(e.target.value)}
          placeholder="About"
          autoSize={{ minRows: 2, maxRows: 4 }}
          maxLength={150}
        />
      </GridContainer>
    </Modal>
  );
};

export default UserModal;
