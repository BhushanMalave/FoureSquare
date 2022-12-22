import {createSlice} from '@reduxjs/toolkit';
import { act } from 'react-test-renderer';

export const StateSlice = createSlice({
  name: 'status',
  initialState: {
    ratingState: false,
    loginState: 0,
    initialState:false,
  },
  reducers: {
    setRatingState: (state, action) => {
      state.ratingState = !state.ratingState;
    },
    setLoginState: (state, action) => {
      state.loginState = action.payload;
    },
    setInitialState: (state, action) => {
      state.initialState = !state.initialState;
    },

   
  },
});

export const {setRatingState, setLoginState,setInitialState} = StateSlice.actions;

export default StateSlice.reducer;
