import React, { useState } from 'react';
import { useHistory } from 'react-router';

import {Container, Typography, Button, TextField, FormControl} from '@material-ui/core';

import { supabase } from 'supabase/supabase';

export const Login = () => {
  const history = useHistory();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  function handleOnChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
   }
  //! ---------------------------------
  //! en consola porque sale
  // error de email no confirmado
  // error Invalid email or password
  //! ---------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('hit')
    try {
      let info = await supabase.auth.signIn({
        email: data.email,
        password: data.password,
      });

      if (info.error) return alert(info.error.message);
      return history.push('/home/home');
    } catch (error) {
      console.log(error);
    }
  };

  const singUpRoute = () => {
    history.push('/register');
  };

  return (
    <Container maxWidth='sm'>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Typography variant='h3'> LOGIN</Typography>
              <TextField
                required
                label='Email'
                name='email'
                type='text'
                value={data.email}
                onChange={handleOnChange}
                />
              <TextField
                required
                label='Password'
                name='password'
                type='password'
                value={data.password}
                onChange={handleOnChange}
                />
              <Button type='submit' variant='contained' color='primary'>Login</Button>
              <Button variant='contained' color='primary' onClick={singUpRoute}>
                Sing up
              </Button>
          </FormControl>
        </form>
    </Container>
  );
};