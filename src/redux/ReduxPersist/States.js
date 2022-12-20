import {createSlice} from '@reduxjs/toolkit';
import { act } from 'react-test-renderer';

export const StateSlice = createSlice({
  name: 'status',
  initialState: {
    ratingState: false,
    loginState: false,
  },
  reducers: {
    setRatingState: (state, action) => {
      state.ratingState = !state.ratingState;
    },
    setLoginState: (state, action) => {
      state.loginState = action.payload;
    },
   
  },
});

export const {setRatingState, setLoginState} = StateSlice.actions;

export default StateSlice.reducer;
