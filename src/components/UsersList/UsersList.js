import React from 'react';
import { Avatar, Button, List } from 'antd';
import { useUserManagementDispatch, useUserManagementState } from '../../store/hooks';
import { CHANGE_PAGINATION, SHOW_MODAL } from '../../store/actions';
import { calculateAge } from '../../utils';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

const UsersList = () => {
  const state = useUserManagementState();
  const dispatch = useUserManagementDispatch();

  const showModal = (user = null) => dispatch({ type: SHOW_MODAL, payload: user });
  const handleChangePagination = page => dispatch({ type: CHANGE_PAGINATION, payload: page });

  return (
    <div style={{ padding: '20px' }}>
      <List
        pagination={{
          position: 'top',
          align: 'end',
          pageSize: 4,
          onChange: handleChangePagination,
          current: state.currentPagination,
        }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(null)}>
              New user
            </Button>
          </div>
        }
        dataSource={state.users}
        renderItem={user => (
          <List.Item
            key={user.id}
            actions={[<Button type="text" icon={<EditOutlined />} onClick={() => showModal(user)} />]}
          >
            <List.Item.Meta
              avatar={<Avatar style={{ backgroundColor: 'rgba(255,255,255,0)' }}>{user.icon}</Avatar>}
              title={
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div>{user.name}</div>
                  <div style={{ fontWeight: 'lighter', fontStyle: 'italic' }}>{calculateAge(user.birthday)} y/o</div>
                </div>
              }
              description={user.about}
            />
          </List.Item>
        )}
      ></List>
    </div>
  );
};

export default UsersList;
