import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const mpUserDetails = createAsyncThunk(
  'userData/mpUserDetails',
  async token => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        'http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/myProfile',
        options,
      );
      return response.data;
    } catch (error) {
     console.log('myprof', error.response.data);
    }
  },
);

const MPUserDetailsSlice = createSlice({
  name: 'userData',
  initialState: {
    data: null,
    status: null,
  },
  reducer: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
    setRemoveData:(state,action)=>{
      console.log(state.data)
    },
  },
  extraReducers: builder => {
    builder
    .addCase(mpUserDetails.pending, (state, action) => {
      state.data = null;
        state.status = 'loading';
      })
      .addCase(mpUserDetails.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(mpUserDetails.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});
export const {setUserData,setRemoveData} = MPUserDetailsSlice.actions;
export default MPUserDetailsSlice.reducer;
