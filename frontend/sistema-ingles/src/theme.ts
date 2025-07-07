'use client'; 

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0D47A1', // Azul escuro
    },
    secondary: {
      main: '#00BFA5', // Verde/turquesa para o botão
    },
    background: {
      default: '#e3f2fd', // Fundo padrão (se necessário)
    },
  },
});