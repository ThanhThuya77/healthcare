import { useContext, useEffect, useMemo } from 'react';
import Login from './container/Login';
import Dashboard from './container/Dashboard';
import Layout from './container/Layout';
import { Context } from './store/Context';
import { commonState } from './store/constants';
import { ICommonState } from './store/Reducer';
import { getSessionDataByKey } from './utils/common';

function App() {
  const { state, dispatch } = useContext(Context);

  const sessionData: ICommonState = useMemo(
    () => getSessionDataByKey('userInfo'),
    []
  );

  useEffect(() => {
    if (sessionData) {
      dispatch({
        type: commonState.SET_LOGIN_INFO,
        payload: sessionData,
      });
    }
  }, [sessionData, dispatch]);

  return !state.id && !sessionData?.id ? (
    <Login />
  ) : (
    <Layout>
      <Dashboard />
    </Layout>
  );
}

export default App;
