import axios from 'axios';
import { storage } from '../utils/storage';
import { STORAGE_KEY } from '../commons/constants';

const axiosContainer = {
  key: null,
  instance: null,
};

export const Axios = () => {
  const accessToken = storage.get(STORAGE_KEY.ACCESS_TOKEN);
  if (axiosContainer.instance === null || accessToken !== axiosContainer.key) {
    axiosContainer.key = accessToken;
    axiosContainer.instance = axios.create({
      baseURL: `${process.env.REACT_APP_SERVER_URL}`,
      headers: {
        'content-type': 'application/json',
        ...(accessToken && { authorization: `Bearer ${accessToken}` }),
      },
      timeout: 5000,
      // withCredentials: true,
    });
  }

  return axiosContainer.instance;
};
