import React, { useContext, useState } from 'react';
import './styles.scss';
import { Form, Input, Button, Typography } from 'antd';
import { Context } from '../../store/Context';
import { commonState } from '../../store/constants';
import { loginAPI } from '../../api/Login';

const { Text } = Typography;

const Login = () => {
  const { dispatch } = useContext(Context);
  const [messageError, setMessageError] = useState<string>('');

  const onFinish = async (values: any) => {
    try {
      const result = await loginAPI(values);

      dispatch({
        type: commonState.SET_LOGIN_INFO,
        payload: result,
      });

      sessionStorage.setItem('userInfo', JSON.stringify(result));
    } catch (error: any) {
      setMessageError(error.message);
    }
  };

  return (
    <div className="login">
      <Form
        labelCol={{ span: 8 }}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item>
          <h3 className="title">Login</h3>
        </Form.Item>
        <Form.Item
          label="Username"
          name="userName"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Text type="danger">{messageError}</Text>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="loginBtn">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
