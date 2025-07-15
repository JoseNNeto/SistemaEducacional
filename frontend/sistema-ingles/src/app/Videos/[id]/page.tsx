import React from 'react';
import { Container, Box, Paper, Typography, Button } from '@mui/material';
import Header from '@/components/Header';
import VideoClient from '@/components/VideoClient';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function VideoPage({ params, searchParams }: { params: { id: string }, searchParams: { conteudoId: string } }) {
  
  // Converte os IDs (que vêm como string da URL) para número
  const videoId = parseInt(params.id, 10);
  const conteudoId = parseInt(searchParams.conteudoId, 10);

  // Verifica se os IDs são válidos
  if (isNaN(videoId) || isNaN(conteudoId)) {
    return (
      <Box>
        <Header />
        <Container sx={{ mt: 4 }}><Typography color="error">URL inválida.</Typography></Container>
      </Box>
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
          <VideoClient videoId={videoId} conteudoId={conteudoId} />
        </Paper>
      </Container>
    </Box>
  );
}