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



  export const mpChangePassword = async (token, objBody) => {
    body = JSON.stringify(objBody);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await axios.post(
        'http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/changePassword',
        body,
        options,
      );
  
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log('mpPasword', error);
    }
  };