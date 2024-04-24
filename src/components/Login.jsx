import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        'http://localhost:4040/api/login',
        formData
      );
      const token = await response.data.data.token;
      localStorage.setItem('token', token);
      console.log('Sign In successful:', response.data.data.token);
      useNavigate('/home');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="email"
          onChange={handleChange}
          name="email"
          value={formData.email}
        />
        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          name="password"
          value={formData.password}
        />
        <button type="submit">Log in</button>
      </form>
    </>
  );
};

export default Login;
