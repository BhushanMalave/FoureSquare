import axios from 'axios';

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
    if (response.data) {
      return response.data;
    }
  } catch (error) {
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
    if (response.data) {
      return response.data;
    }
  } catch (error) {
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
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log('mpPasword', error.data);
  }
};

export const verifyOtpApi = async objBody => {
  body = objBody;

  try {
    const response = await axios.post(
      'https://assesment-seven.vercel.app/verify',
      body,
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
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
    if (response.data) {
      return response.data;
    }
  } catch (error) {
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
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log('mpPasword', error);
  }
};
