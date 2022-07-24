import React, { useContext } from 'react';
import './styles.scss';
import { Layout, Typography, Menu, Avatar, Dropdown, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Context } from '../../store/Context';
import { commonState } from '../../store/constants';

const { Text } = Typography;
const { Header, Content } = Layout;

const LayoutComponent = ({ children }) => {
  const { state, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({
      type: commonState.SET_LOGIN_INFO,
      payload: { isLogin: false, isAdmin: false },
    });
    sessionStorage.removeItem('isLogin');
  };

  const profileActions = (
    <Menu
      items={[
        {
          key: 'logout',
          label: (
            <Button type="text" onClick={handleLogout}>
              Logout
            </Button>
          ),
        },
        {
          key: 'change Role Admin',
          label: (
            <Button
              type="text"
              onClick={() => {
                dispatch({
                  type: commonState.SET_LOGIN_INFO,
                  payload: { isLogin: true, isAdmin: true },
                });
              }}
            >
              change Role Admin
            </Button>
          ),
        },
        {
          key: 'change Role HR',
          label: (
            <Button
              type="text"
              onClick={() => {
                dispatch({
                  type: commonState.SET_LOGIN_INFO,
                  payload: { isLogin: true, isAdmin: false },
                });
              }}
            >
              change Role HR
            </Button>
          ),
        },
      ]}
    />
  );

  return (
    <Layout>
      <Header>
        {state.isLogin ? (
          <Dropdown overlay={profileActions} placement="bottomRight">
            <div>
              {state.fullName ? (
                <Text className="fullName">{state.fullName}</Text>
              ) : null}
              <Avatar size="large" icon={<UserOutlined />} />
            </div>
          </Dropdown>
        ) : null}
      </Header>

      <Content className="layout-container">{children}</Content>
    </Layout>
  );
};

export default LayoutComponent;
