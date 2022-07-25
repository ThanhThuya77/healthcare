import axios from 'axios';
import { API } from '../constants/common';

interface IUserRq {
  userName: string;
  password: string;
}

interface IUserRs {
  fullName: string;
  isAdmin: boolean;
  error?: string;
  message?: string;
  statusCode?: number;
}

export const loginAPI = async (data: IUserRq) => {
  const result: IUserRs = await axios.post(API.LOGIN, data);
  return result;
};
