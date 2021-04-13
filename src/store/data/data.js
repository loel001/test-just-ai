import {createReducer} from '@reduxjs/toolkit';
import {changeFavoriteUsers} from '../../common/utils';
import {
  loadUsers,
  changeCurrentUser,
  changeUsersFavorite,
} from '../action';

const initialState = {
  users: [],
  isDataLoaded: false,
  currentUser: {}
};

const data = createReducer(initialState, (builder) => {
  builder.addCase(loadUsers, (state, action) => {
    state.users = action.payload;
    state.isDataLoaded = true;
  });

  builder.addCase(changeCurrentUser, (state, action) => {
    state.currentUser = action.payload;
  });

  builder.addCase(changeUsersFavorite, (state, action) => {
    state.users = changeFavoriteUsers(state.users, action.payload);
  });
});

export {data};
