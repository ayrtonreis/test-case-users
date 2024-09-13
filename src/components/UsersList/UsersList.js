import React from 'react';
import { Avatar, Button, List } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { CHANGE_PAGINATION, SHOW_MODAL } from '../../store/actions';
import { useUserManagementDispatch, useUserManagementState } from '../../store/hooks';
import { calculateAge, generateEmptyUser } from '../../utils';
import { PAGINATION_LENGTH } from '../../constants';
import { ButtonWrapper, LayoutWrapper, SecondaryText, StyledAvatar, StyledList, TitleContainer } from './styled';

const UsersList = () => {
  const state = useUserManagementState();
  const dispatch = useUserManagementDispatch();

  const showModal = (user = null) => dispatch({ type: SHOW_MODAL, payload: user });
  const handleChangePagination = page => dispatch({ type: CHANGE_PAGINATION, payload: page });

  return (
    <LayoutWrapper>
      <StyledList
        pagination={{
          position: 'top',
          align: 'end',
          pageSize: PAGINATION_LENGTH,
          onChange: handleChangePagination,
          current: state.currentPagination,
        }}
        footer={
          <ButtonWrapper>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(generateEmptyUser())}>
              New user
            </Button>
          </ButtonWrapper>
        }
        dataSource={state.users}
        renderItem={user => (
          <List.Item
            key={user.id}
            actions={[<Button type="text" icon={<EditOutlined />} onClick={() => showModal(user)} />]}
          >
            <List.Item.Meta
              avatar={<StyledAvatar>{user.icon}</StyledAvatar>}
              title={
                <TitleContainer>
                  {user.name}
                  <SecondaryText>{calculateAge(user.birthday)} y/o</SecondaryText>
                </TitleContainer>
              }
              description={user.about}
            />
          </List.Item>
        )}
      />
    </LayoutWrapper>
  );
};

export default UsersList;
