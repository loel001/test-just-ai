import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  LOAD_USERS: `data/loadUsers`,
  CHANGE_CURRENT_USER: `data/changeCurrentUser`,
  CHANGE_USERS_FAVORITE: `data/changeUsersFavorite`,
};


export const loadUsers = createAction(ActionType.LOAD_USERS, (users) => {
  return {
    payload: users,
  };
});

export const changeCurrentUser = createAction(ActionType.CHANGE_CURRENT_USER, (currentUser) => {
  return {
    payload: currentUser,
  };
});

export const changeUsersFavorite = createAction(ActionType.CHANGE_USERS_FAVORITE, (users) => {
  return {
    payload: users,
  };
});
