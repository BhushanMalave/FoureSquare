import {createSlice} from '@reduxjs/toolkit';

export const UserDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    token: null,
    userFavData: null,
    userlatitude:null,
    userlongitude:null,
    overAllRating:null,
    placeId:null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserFavData: (state, action) => {
      state.userFavData = action.payload;
    },
    setuserlatitude: (state, action) => {
      state.userlatitude = action.payload;
    },
    setuserlongitude: (state, action) => {
      state.userlongitude = action.payload;
    },
    setOverallRating: (state, action) => {
      state.overAllRating = action.payload;
    },
    setPlaceId: (state, action) => {
      state.placeId = action.payload;
    },


  },
});

export const {setToken, setUserFavData,setuserlatitude,setuserlongitude,setOverallRating,setPlaceId} = UserDetailsSlice.actions;

export default UserDetailsSlice.reducer;
