import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Header from '@/components/Header';
import ContentDashboard from '@/components/ContentDashboard';

export default function ConteudosPage() {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Conteúdos Disponíveis
        </Typography>
        
        {/* Renderiza o dashboard sem passar props de dados */}
        <ContentDashboard />

      </Container>
    </Box>
  );
}