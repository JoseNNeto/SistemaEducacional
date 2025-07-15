import React from 'react';
import { Container, Box, Button } from '@mui/material';
import Header from '@/components/Header';
import ConteudoDetail from '@/components/ConteudoDetail';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function DetalheConteudoPage({ params: { id } }: { params: { id: string } }) {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ mt: 3, mb: 4, flexGrow: 1 }}>
        <Button 
            component={Link}
            href={`/Conteudos`} 
            startIcon={<ArrowBackIcon />} 
            sx={{ mb: 2 }}
        >
            Voltar
        </Button>
        <ConteudoDetail conteudoId={id} />
      </Container>
    </Box>
  );
}