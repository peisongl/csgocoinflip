/*
 * @Author: xuthus
 * @Date: 2017-06-17 20:35:04
 * @Last Modified by: xuthus
 * @Last Modified time: 2017-07-07 16:04:10
 */
import axios from '../utils/axiosService' // 引入加了拦截器的axios

// 注册和登录api， 通过type判断
export const loginByUsername = (email, password) => {
  const data = {
    email,
    password
  }
  return axios.post('/auth/login', data).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
}

export const signupByUsername = (email, password) => {
    const data = {
      email,
      password
    }
    return axios.post('/auth/signup', data)
  }

export const fetchSignUser = () => {
  return axios.get('/auth/user')
}

export const fetchUserById = (id) => {
  return axios.get(`/auth/users/${id}`)
}
