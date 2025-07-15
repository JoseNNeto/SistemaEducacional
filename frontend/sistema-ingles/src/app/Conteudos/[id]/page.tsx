import React from 'react';
import { Container, Box } from '@mui/material';
import Header from '@/components/Header';
// Lembre-se que você pode ter renomeado este componente
import ConteudoDetail from '@/components/ConteudoDetail';

// A MUDANÇA ESTÁ AQUI NA LINHA DE BAIXO 👇
export default function DetalheConteudoPage({ params: { id } }: { params: { id: string } }) {
  
  // Agora a variável 'id' já está disponível diretamente para nós.

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ mt: 3, mb: 4, flexGrow: 1 }}>
        {/* E A GENTE USA O 'id' DIRETAMENTE AQUI 👇 */}
        <ConteudoDetail conteudoId={id} />
      </Container>
    </Box>
  );
}