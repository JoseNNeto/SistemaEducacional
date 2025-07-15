import React from 'react';
import { Container, Box, Paper, Typography, Button } from '@mui/material';
import Header from '@/components/Header';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QuizListComponent from '@/components/QuizList';

// A página recebe os 'params' da URL
export default function ExercicioListPage({ params }: { params: { id: string } }) {
  
  // O 'id' aqui é o ID do Conteúdo
  const conteudoId = parseInt(params.id, 10);

  if (isNaN(conteudoId)) {
    return (
      <Box><Header /><Container sx={{ mt: 4 }}><Typography color="error">ID de conteúdo inválido.</Typography></Container></Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'grey.100' }}>
      <Header />
      <Container component="main" sx={{ mt: 4, mb: 4 }}>
        <Button 
            component={Link}
            href={`/Conteudos/${conteudoId}`} 
            startIcon={<ArrowBackIcon />} 
            sx={{ mb: 2 }}
        >
            Voltar para os recursos
        </Button>
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Exercícios do Conteúdo
          </Typography>
          <QuizListComponent conteudoId={conteudoId} />
        </Paper>
      </Container>
    </Box>
  );
}