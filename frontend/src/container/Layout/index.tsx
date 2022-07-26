import React, { useContext } from 'react';
import './styles.scss';
import { Layout, Typography, Menu, Avatar, Dropdown, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Context } from '../../store/Context';
import { commonState } from '../../store/constants';

const { Text } = Typography;
const { Header, Content } = Layout;

interface IProps {
  children: React.ReactNode;
}

const LayoutComponent = ({ children }: IProps) => {
  const { state, dispatch } = useContext(Context);

  const handleLogout = () => {
    sessionStorage.removeItem('userInfo');
    dispatch({
      type: commonState.SET_LOGIN_INFO,
      payload: { id: null },
    });
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
      ]}
    />
  );

  return (
    <Layout>
      <Header>
        {state.id ? (
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
