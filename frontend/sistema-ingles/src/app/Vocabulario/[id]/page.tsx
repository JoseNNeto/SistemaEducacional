import React from 'react';
import { Container, Box, Paper, Typography, Button } from '@mui/material';
import Header from '@/components/Header';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import VocabularyList from '@/components/Vocabulary/VocabularyList';

// --- DADOS DE EXEMPLO (MOCK) ---
// No futuro, virá de: GET /api/vocabularios/{id}
async function getVocabularioData(id: string) {
  console.log(`Buscando dados para o VOCABULÁRIO com ID: ${id}`);
  
  return {
    id: 1,
    titulo: 'Vocabulário da Aula 1',
    palavras: [
      { id: 1, palavra: 'Sun', traducao: 'Sol' },
      { id: 2, palavra: 'Winter', traducao: 'Inverno' },
      { id: 3, palavra: 'Smile', traducao: 'Sorriso' },
      { id: 4, palavra: 'Ice', traducao: 'Gelo' },
    ]
  };
}

export default async function VocabularioPage({ params }: { params: { id: string } }) {
  
  const vocabularioData = await getVocabularioData(params.id);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'grey.100' }}>
      <Header />
      <Container component="main" sx={{ mt: 4, mb: 4 }}>
        <Button 
            component={Link}
            href="/conteudos/1" // Exemplo: volta para a tela de detalhes do conteúdo
            startIcon={<ArrowBackIcon />} 
            sx={{ mb: 2 }}
        >
            Voltar
        </Button>
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            {vocabularioData.titulo}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Digite a tradução correta para cada palavra e clique em "Enviar" para verificar.
          </Typography>
          <VocabularyList palavras={vocabularioData.palavras} />
        </Paper>
      </Container>
    </Box>
  );
}