
'use client'

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Login from '../actions/Login';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserContext } from '../userProvider/UserProvider';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #333;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  &:focus {
    outline: none;
    border-color: #fda085;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background: #fda085;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  &:hover {
    background: #f6d365;
  }
`;
const LoginForm = () => {
  const router = useRouter()
  const { SetUser } = useContext(UserContext)
  const [form_data, setFormData] = useState({
    account: '',
    password: ''

  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = await Login(form_data)
    if (user) {

      SetUser(user)
      router.push('/')
    }

  }
  return (
    <Container>
      <Form onSubmit={handleSubmit} action='post'>
        <Title>Login</Title>
        <Input
          type="text"
          placeholder="Account"
          name='account'
          value={form_data.account}
          onChange={(e) => setFormData(form_data => { return { ...form_data, account: e.target.value } })}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={form_data.password}
          onChange={(e) => setFormData(form_data => { return { ...form_data, password: e.target.value } })}
          required
        />
        <Button type="submit">Log In</Button>
        <Link href={"/signup"} style={{ 'textDecoration': 'underline', 'margin-top': '8px' }} >Signup</Link>
      </Form>

    </Container>
  );
};
export default LoginForm;