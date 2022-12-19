import {createSlice} from '@reduxjs/toolkit';

export const StateSlice = createSlice({
  name: 'status',
  initialState: {
    ratingState: false,
    mockState: false,
  },
  reducers: {
    setRatingState: (state, action) => {
      state.ratingState = !state.ratingState;
    },
    setMockstate: (state, action) => {
      state.mockState = !state.mockState;
    },
   
  },
});

export const {setRatingState, setMockstate} = StateSlice.actions;

export default StateSlice.reducer;
