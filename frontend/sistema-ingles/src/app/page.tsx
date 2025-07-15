'use client'; 

import LoginForm from '@/components/CardLogin';
import { theme } from '@/theme';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: 'linear-gradient(to bottom, #4fc3f7, #01579b)',
      }}
    >
      <Image
        src={"/LogoInglesVerso.png"} // Ajuste o caminho da imagem conforme necessário
        alt="InglêsVerso Logo"
        width={150}
        height={50}
        style={{ marginBottom: '1rem' }}
        priority // Ajuda a carregar a logo mais rápido
      />
      <LoginForm />
    </Box>
  );
}