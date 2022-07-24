import { commonState } from './constants';

export interface ICommonState {
  isLogin: boolean;
  isAdmin: boolean;
  fullName: string;
}

export const initState: ICommonState = {
  isLogin: false,
  isAdmin: false,
  fullName: '',
};

function reducer(state: ICommonState, action: any) {
  switch (action.type) {
    case commonState.SET_LOGIN_INFO:
      state = { ...state, ...action.payload };
      break;

    default:
      break;
  }

  return state;
}

export default reducer;
