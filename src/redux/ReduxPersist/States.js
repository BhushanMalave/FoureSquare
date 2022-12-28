import {createSlice} from '@reduxjs/toolkit';
import { act } from 'react-test-renderer';

export const StateSlice = createSlice({
  name: 'status',
  initialState: {
    ratingState: false,
    loginState: 0,
    initialState:false,
    textRadius:"",
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
    setTextRadius: (state, action) => {
      console.info(action.payload);
      state.textRadius = action.payload;
    },

   
  },
});

export const {setRatingState, setLoginState,setInitialState,setTextRadius} = StateSlice.actions;

export default StateSlice.reducer;
