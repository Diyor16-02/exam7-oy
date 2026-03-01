import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input } from 'antd';
import { instance } from '../../hooks';
import { toast } from "react-hot-toast"
import { useCookies } from "react-cookie"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../components';

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [, setCookie,] = useCookies(['token']);
  const LoginFn = useMutation({
    mutationFn: (data: { email: string, password: string }) => instance().post("/auth/login", data),
    onSuccess: (res) => {
      toast.success("Successfully signed!")
      setLoading(false)
      setTimeout(() => {
        setCookie("token", res.data.data.tokens.accessToken)
        navigate(PATH.home)
      },1000)
    },
    onError: (err) => {
      toast.error(err.message)
      setLoading(false)
    }
  })
  const onFinish = (values: { email: string, password: string }) => {
    setLoading(true)
    LoginFn.mutate(values)
  };
  return (
    <div className='h-screen bg-slate-900/50 flex items-center justify-center'>
      <Form
        className='bg-white p-5! rounded-xl'
        autoComplete='off'
        name="login"
        style={{ minWidth: 400 }}
        onFinish={onFinish}
      >
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
          <Input allowClear size='large' prefix={<UserOutlined className='text-[18px] text-[#c6c6c6]!' />} placeholder="example@gmail.com" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input.Password size='large' prefix={<LockOutlined className='text-[18px] text-[#c6c6c6]!' />} type="password" placeholder="*********" />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} className='bg-amber-600! font-bold!' size='middle' block type="primary" htmlType="submit">Log in</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;