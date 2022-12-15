import {createSlice} from '@reduxjs/toolkit';

export const UserDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    token: null,
    newUser: true,
    userData: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setNewUser: (state, action) => {
      state.newUser = action.payload;
    },
  },
});

export const {setToken, setUserData, setNewUser} = UserDetailsSlice.actions;

export default UserDetailsSlice.reducer;
