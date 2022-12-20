import axios from 'axios';
import Toast from 'react-native-simple-toast'

export const refreshToken = async token => {
  try {
    let res = await fetch(
      'http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/refreshToken',
      {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const all = async token => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(
      'http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/home/course/all',
      options,
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log('all course', error);
  }
};

export const signInApi = async objBody => {
  body = objBody;

  try {
    const response = await axios.post(
      'https://assesment-seven.vercel.app/signIn',
      body,
    );
    Toast.show(response.data.message, Toast.SHORT);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    Toast.show(error.response.data.message, Toast.SHORT);
    console.log('mpPasword', error);
  }
};
export const signUpApi = async objBody => {
  body = objBody;

  try {
    const response = await axios.post(
      'https://assesment-seven.vercel.app/signUp',
      body,
    );
    Toast.show(response.data.message, Toast.SHORT);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    Toast.show(error.response.data.message, Toast.SHORT);
    console.log('mpPasword', error);
  }
};

export const forgotPasswordApi = async objBody => {
  body = objBody;

  try {
    const response = await axios.post(
      'https://assesment-seven.vercel.app/forgotPassword',
      body,
    );
    Toast.show(response.data.message, Toast.SHORT);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    Toast.show(error.response.data.message, Toast.SHORT);
    console.log('Pasword', error.response.data);
    if (error.response.data) {
      return error.response.data;
    }
  }
};

export const verifyOtpApi = async objBody => {
  body = objBody;

  try {
    const response = await axios.post(
      'https://assesment-seven.vercel.app/verify',
      body,
    );
    Toast.show(response.data.message, Toast.SHORT);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    Toast.show(error.response.data.message, Toast.SHORT);
    console.log('mpPasword', error.data);
  }
};

export const resendOtpApi = async objBody => {
  body = objBody;

  try {
    const response = await axios.post(
      'https://assesment-seven.vercel.app/resendOtp',
      body,
    );
    Toast.show(response.data.message, Toast.SHORT);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    Toast.show(error.response.data.message, Toast.SHORT);
    console.log('mpPasword', error.data);
  }
};
export const changePasswordApi = async objBody => {
  body = objBody;

  try {
    const response = await axios.post(
      'https://assesment-seven.vercel.app/forgotPassword/createNewPassword',
      body,
    );
    Toast.show(response.data.message, Toast.SHORT);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    Toast.show(error.response.data.message, Toast.SHORT);
    console.log('mpPasword', error);
  }
};

export const nearYouPlaces = async objBody => {
  body = objBody;

  try {
    const response = await axios.get(
      'https://assesment-seven.vercel.app/getNearByPlaces',
      body,
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Toast.show(error.response.data.message, Toast.SHORT);
    console.log('nearYou', error.response.data);
  }
};

export const topPickPlaces = async objBody => {
  body = objBody;

  try {
    const response = await axios.get(
      'https://assesment-seven.vercel.app/topPicksNearYou',
      body,
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Toast.show(error.response.data.message, Toast.SHORT);
    console.log('nearYou', error.response.data);
  }
};
export const popularPlaces = async()=> {


  try {
    const response = await axios.get(
      'https://assesment-seven.vercel.app/popularPlaces',
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Toast.show(error.response.data.message, Toast.SHORT);
    console.log('nearYou', error.response.data);
  }
};

export const placesDetails = async objBody => {
  body = objBody;

  try {
    const response = await axios.get(
      'https://assesment-seven.vercel.app/getParticularPlaceDetails',
      body,
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Toast.show(error.response.data.message, Toast.SHORT);
    console.log('nearYou', error.response.data);
  }
};
