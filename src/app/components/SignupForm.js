
'use client'
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Login from '../actions/Login';
import Signup from '../actions/Signup';
import Link from 'next/link';
import { UserContext } from '../userProvider/UserProvider';
import { useRouter } from 'next/navigation';
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
const SignupForm = () => {
  const { SetUser } = useContext(UserContext)
  const router = useRouter()
  const [form_data, SetFormData] = useState({ account: '', password: '', confirm_password: '', name: '' })
  const [error, setError] = useState({ account_error: '', password_error: '', confirm_password_error: '' })
  const validateForm = () => {
    setError(error => { return { account_error: '', password_error: '', confirm_password_error: '' } })
    if (form_data.account.length < 8) {
      setError(error => { return { ...error, account_error: 'Account length must longer than 8 charater !' } })

    }
    if (form_data.password != form_data.confirm_password) {
      setError(error => { return { ...error, confirm_password_error: 'Passwords are not similar !' } })

    }
    if (form_data.password.length < 8) {
      setError(error => { return { ...error, password_error: 'Password length must longer than 8 charater !' } })

    }

  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = await Signup(form_data)
    if (user) {

      SetUser(user)
      router.push('/')
    }

  }
  return (
    <Container>
      <Form onSubmit={handleSubmit} action='post'>
        <Title>Sign up</Title>
        <Input
          type="text"
          placeholder="Account"
          name='account'
          value={form_data.account}
          onChange={(e) => SetFormData(form_data => { return { ...form_data, account: e.target.value } })}
          required
        />
        {error.account_error}<br />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={form_data.password}
          onChange={(e) => SetFormData(form_data => { return { ...form_data, password: e.target.value } })}
          required
        />
        {error.password_error}<br />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={form_data.confirm_password}
          onChange={(e) => SetFormData(form_data => { return { ...form_data, confirm_password: e.target.value } })}
          required
        />
        {error.confirm_password_error}<br />
        <Input
          type="text"
          placeholder="Name"
          value={form_data.name}
          onChange={(e) => SetFormData(form_data => { return { ...form_data, name: e.target.value } })}
          required
        />

        <Button type="submit" onClick={() => { validateForm() }}>Sign up</Button>
        <Link href={"/login"} style={{ 'textDecoration': 'underline', 'margin-top': '8px' }} >Login</Link>
      </Form>

    </Container>
  );
};
export default SignupForm;