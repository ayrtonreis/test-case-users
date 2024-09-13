import { usersData } from '../mock/usersData';
import {
  CHANGE_PAGINATION,
  CANCEL_MODAL,
  DELETE_USER,
  CONFIRM_MODAL,
  SET_NEW_USER_NAME,
  SET_USER_ABOUT,
  SET_USER_BIRTHDAY,
  SET_USER_ICON,
  SHOW_MODAL,
} from './actions';
import { PAGINATION_LENGTH } from '../constants';

export const initialState = {
  users: usersData,
  draftUser: null,
  isModalVisible: false,
  isEditMode: false,
  currentPagination: 1,
};

export function reducer(state, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        draftUser: action.payload,
        isEditMode: !!action.payload.id,
        isModalVisible: true,
      };
    case CANCEL_MODAL:
      return {
        ...state,
        isModalVisible: false,
        draftUser: null,
      };
    case CONFIRM_MODAL:
      if (state.isEditMode) {
        return {
          ...state,
          users: state.users.map(user => (user.id === state.draftUser.id ? { ...user, ...state.draftUser } : user)),
          isModalVisible: false,
          draftUser: null,
        };
      } else {
        return {
          ...state,
          users: [...state.users, { id: state.users.length + 1, ...state.draftUser }],
          isModalVisible: false,
          currentPagination: Math.ceil((state.users.length + 1) / PAGINATION_LENGTH) + 1,
          draftUser: null,
        };
      }
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== state.draftUser.id),
        isModalVisible: false,
        draftUser: null,
      };
    case SET_NEW_USER_NAME:
      return {
        ...state,
        draftUser: {
          ...state.draftUser,
          name: action.payload,
        },
      };
    case SET_USER_ICON:
      return {
        ...state,
        draftUser: {
          ...state.draftUser,
          icon: action.payload,
        },
      };
    case SET_USER_BIRTHDAY:
      return {
        ...state,
        draftUser: {
          ...state.draftUser,
          birthday: action.payload,
        },
      };
    case SET_USER_ABOUT:
      return {
        ...state,
        draftUser: {
          ...state.draftUser,
          about: action.payload,
        },
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
