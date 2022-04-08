import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { IUser } from '../../../interfaces/IUser';


export interface UsersState {
  users: IUser[];
  error: string | null;
}


const initialState: UsersState = {
  users: [],
  error: null,
}


const usersSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {
    usersFetchRequest() { },

    usersFetchSuccess(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
    },

    usersFetchFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      const usersState = action.payload.users;

      if (!usersState.users.length && !usersState.error) return state;

      return usersState;
    },
  },
});


export const {
  usersFetchRequest,
  usersFetchSuccess,
  usersFetchFailure
} = usersSlice.actions;


export default usersSlice.reducer;
