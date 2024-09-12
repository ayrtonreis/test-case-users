import { usersData } from '../mock/usersData';
import { CHANGE_PAGINATION, HANDLE_CANCEL, HANDLE_DELETE, HANDLE_OK, SET_NEW_USER_NAME, SHOW_MODAL } from './actions';

const PAGINATION_LENGTH = 8;

export const initialState = {
  users: usersData,
  selectedUser: null,
  isModalVisible: false,
  newUserName: '',
  isEditMode: false,
  currentPagination: 0,
};

export function reducer(state, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        selectedUser: action.payload,
        isEditMode: !!action.payload,
        isModalVisible: true,
      };
    case HANDLE_CANCEL:
      return {
        ...state,
        isModalVisible: false,
      };
    case HANDLE_OK:
      if (state.isEditMode) {
        return {
          ...state,
          users: state.users.map(user =>
            user.id === state.selectedUser.id ? { ...user, name: state.newUserName } : user,
          ),
          isModalVisible: false,
          newUserName: '',
        };
      } else {
        return {
          ...state,
          users: [...state.users, { id: state.users.length + 1, name: state.newUserName, icon: '🆕' }],
          isModalVisible: false,
          newUserName: '',
          currentPagination: Math.ceil((state.users.length + 1) / PAGINATION_LENGTH) + 1,
        };
      }
    case HANDLE_DELETE:
      return {
        ...state,
        users: state.users.filter(user => user.id !== state.selectedUser.id),
        isModalVisible: false,
        newUserName: '',
      };
    case SET_NEW_USER_NAME:
      return {
        ...state,
        newUserName: action.payload,
      };
    case CHANGE_PAGINATION:
      return {
        ...state,
        currentPagination: action.payload,
      };
    default:
      return state;
  }
}
