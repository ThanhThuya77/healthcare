import { commonState } from './constants';

export interface ICommonState {
  isAdmin: boolean;
  fullName: string;
  id: string | null;
}

export const initState: ICommonState = {
  isAdmin: false,
  fullName: '',
  id: null,
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
