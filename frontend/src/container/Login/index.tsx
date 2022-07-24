import React, { useContext, useState } from 'react';
import './styles.scss';
import { Form, Input, Button, Typography } from 'antd';
import { Context } from '../../store/Context';
import { commonState } from '../../store/constants';

const { Text } = Typography;

const layout = {
  labelCol: {
    span: 8,
  },
};

interface IProps {}

const Login = ({}: IProps) => {
  const { state, dispatch } = useContext(Context);

  //

  const onFinish = (values: any) => {
    console.log('values', values);

    dispatch({
      type: commonState.SET_LOGIN_INFO,
      payload: { isLogin: true, isAdmin: false, fullName: 'Thuy Nguyen' },
    });
    sessionStorage.setItem(
      'isLogin',
      JSON.stringify({ isLogin: true, isAdmin: false, fullName: 'Thuy Nguyen' })
    );
  };

  return (
    <div className="login">
      <Form
        {...layout}
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
          label="Email"
          name="email"
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
