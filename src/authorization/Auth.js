import axios from 'axios';
import Toast from 'react-native-simple-toast';

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
    // Toast.show(error.response.data.message, Toast.SHORT);
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

export const giveFeedBack = async (token, body) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(
      'https://assesment-seven.vercel.app/giveFeedback',
      body,
      options,
    );
    Toast.show(response.data.message, Toast.SHORT);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    Toast.show(error.response.data.message, Toast.SHORT);
    console.log('give feedback', error);
  }
};

export const gettProfile = async token => {
  try {
    const response = await axios.post(
      'https://assesment-seven.vercel.app/getProfile',
      {}, 
      {
        headers: { 
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // Toast.show(response.data.message, Toast.SHORT);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
   // Toast.show(error.response.data.message, Toast.SHORT);
    console.log('get Profile', error.response.data);
  }
};

export const logoutApi = async token => {
  try {
    const response = await axios.post(
      'https://assesment-seven.vercel.app/logout',
      {}, 
      {
        headers: { 
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // Toast.show(response.data.message, Toast.SHORT);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    Toast.show(error.response.data.message, Toast.SHORT);
    console.log('get Profile', error.response.data);
  }
};

export const nearYouPlaces = async objBody => {
  body = objBody;

  try {
    const response = await axios.post(
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
    const response = await axios.post(
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
export const popularPlaces = async (body) => {
  try {
    const response = await axios.post(
      'https://assesment-seven.vercel.app/popularPlaces',
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

export const placeDetails = async objBody => {
  body = objBody;

  try {
    const response = await axios.post(
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

export const aboutUsApi = async () => {
  try {
    const response = await axios.get(
      'https://assesment-seven.vercel.app/aboutUS',
      body,
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
   // Toast.show(error.response.data.message, Toast.SHORT);
    console.log('aboutus', error);
  }
};

export const placeCategoryLunch = async body => {
  body = body;

  try {
    const response = await axios.post(
      'https://assesment-seven.vercel.app/lunchPlace',
      body,
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Toast.show(error.response.data.message, Toast.SHORT);
    console.log('placeCategory', error.response.data);
  }
};
export const placeCategoryCafe = async body => {
  body = body;

  try {
    const response = await axios.post(
      'https://assesment-seven.vercel.app/cafePlace',
      body,
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Toast.show(error.response.data.message, Toast.SHORT);
    console.log('placeCategory', error.response.data);
  }
};



export const viewReviewApi = async body => {
  body = body;

  try {
    const response = await axios.post(
      'https://assesment-seven.vercel.app//getOnlyReviewsText',
      body,
    );
    if (response.data.data) {
      return response.data.data;
    }
  } catch (error) {
    // Toast.show(error.response.data.message, Toast.SHORT);
    console.log('viewreview', error.response.data);
  }
};

export const viewPhotoApi = async body => {
  body = body;

  try {
    const response = await axios.post(
      'https://assesment-seven.vercel.app/getImagesByPlaceId',
      body,
    );
    if (response.data.data) {
      return response.data.data;
    }
  } catch (error) {
    // Toast.show(error.response.data.message, Toast.SHORT);
    console.log('viewphotos', error.response.data);
  }
};

export const addRatingApi = async (token,body) => {
 
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(
      'https://assesment-seven.vercel.app/addRating',
      body,
      options,
    );
  
    if (response.data) {
      Toast.show(response.data.message, Toast.SHORT);
      return response.data.message;
    }
  } catch (error) {
    // Toast.show(error.response.data.message, Toast.SHORT);
    console.log('add ratings', error.response.data);
  }
};



export const addFavouriteApi = async (token, body) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.put(
      'https://assesment-seven.vercel.app/addToFavourites',
      body,
      options,
    );
    Toast.show(response.data.message, Toast.SHORT);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
   // Toast.show(error.response.data.message, Toast.SHORT);
    console.log('add favourite', error);
  }
};

export const getFavouriteApi = async (token,body) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(
      'https://assesment-seven.vercel.app/getFavourite',
      body,
      options,
    );
   // Toast.show(response.data.message, Toast.SHORT);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    //Toast.show(error.response.data.message, Toast.SHORT);
    console.log('get favourite', error);
  }
};


export const favSearchApi = async (token,body) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      'https://assesment-seven.vercel.app/searchFromFavourite',
      body,
      options,
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Toast.show(error.response.data.message, Toast.SHORT);
    console.log('searchFromFavourite', error.response.data);
  }
};

export const SearchApi = async (body) => {
  

  try {
    const response = await axios.post(
      'https://assesment-seven.vercel.app/searchPlace',
      body,
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Toast.show(error.response.data.message, Toast.SHORT);
    console.log('searchPlace', error.response.data);
  }
};

export const filterSearchApi = async (body) => {
  

  try {
    const response = await axios.post(
      'https://assesment-seven.vercel.app//searchByFilter',
      body,
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Toast.show(error.response.data.message, Toast.SHORT);
    console.log('searchPlace', error.response.data);
  }
};

export const getNearByCityApi = async (body) => {
  try {
    const response = await axios.post(
      'https://assesment-seven.vercel.app/getNearByCity',
      body,
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Toast.show(error.response.data.message, Toast.SHORT);
    console.log('getNearByCity', error.response.data);
  }
};


export const addReview = async (token, payload) => {
  try {
    let res = await fetch(
      'https://assesment-seven.vercel.app/addReviews',
      {
        method: 'put',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    const jsonResponse = res;
    return res.status;
  } catch (err) {
     console.log('addReview', err);
   // Toast.show('Something Went Wrong,Try Again!!!',Toast.SHORT)
  }
};

export const addImages = async (token, payload) => {
  try {
    let res = await fetch(
      'https://assesment-seven.vercel.app/addReviews',
      {
        method: 'put',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    const jsonResponse = res;
    return res.status;
  } catch (err) {
     console.log('addReview', err);
   // Toast.show('Something Went Wrong,Try Again!!!',Toast.SHORT)
  }
};

