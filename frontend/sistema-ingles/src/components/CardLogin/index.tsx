'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email: email,
        password: password,
      });

      const { token } = response.data;
      console.log('Login com sucesso! Token:', token);

      // Guarda o token no localStorage para usar depois
      localStorage.setItem('authToken', token);
      
      // Redireciona o usuário para a página principal ou dashboard
      router.push('/Conteudos'); 

    } catch (err: any) {
      console.error('Falha no login:', err);
      if (err.response && err.response.status === 401) {
        setError('E-mail ou senha inválidos. Tente novamente.');
      } else {
        setError('Ocorreu um erro. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 31, 63, 0.9)',
          padding: 4,
          borderRadius: 3,
          boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.2)',
        }}
      > 
        <Typography component="h1" variant="h5" color="white">
          Login
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: 'white' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#42a5f5' },
                '&:hover fieldset': { borderColor: '#90caf9' },
                '&.Mui-focused fieldset': { borderColor: 'secondary.main' },
                '& input': { color: 'white' },
              },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: 'white' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#42a5f5' },
                '&:hover fieldset': { borderColor: '#90caf9' },
                '&.Mui-focused fieldset': { borderColor: 'secondary.main' },
                '& input': { color: 'white' },
              },
            }}
          />
          <Link href="#" variant="body2" sx={{ float: 'right', color: '#90caf9' }}>
            Esqueceu a senha?
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, padding: '10px', fontWeight: 'bold', color: 'white' }}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}