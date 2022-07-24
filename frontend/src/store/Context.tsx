import { createContext, ReactNode, useReducer } from 'react';
import reducer, { ICommonState, initState } from './Reducer';

interface IContextProps {
  state: ICommonState;
  dispatch: React.Dispatch<any>;
}

export const Context = createContext<IContextProps>({
  state: initState,
  dispatch: () => null,
});

interface IProvider {
  children: ReactNode;
}

export const StoreProvider = ({ children }: IProvider) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
