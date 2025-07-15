import React from 'react';
import { 
    Container, 
    Box, 
    Typography,
    Paper,
    Grid // Importando o Grid!
} from '@mui/material';
import Header from '@/components/Header';

// --- DADOS DE EXEMPLO (MOCK) ---
// No futuro, isso virá da sua API: GET /api/musicas/{id}
async function getMusicaData(id: string) {
  console.log(`Buscando dados para a MÚSICA com ID: ${id}`);
  
  // Exemplo com "Here Comes The Sun" dos Beatles
  const mockData = {
    id: 1,
    titulo: 'The Beatles - Here Comes The Sun',
    youtubeVideoId: 'GKdl-jINawI', // Vídeo com a letra
    letra: `Here comes the sun, do-do-do-do
Here comes the sun, and I say
It's all right

Little darlin', it's been a long, cold, lonely winter
Little darlin', it feels like years since it's been here

Here comes the sun, do-do-do-do
Here comes the sun, and I say
It's all right

Little darlin', the smiles returning to their faces
Little darlin', it seems like years since it's been here

Here comes the sun, do-do-do-do
Here comes the sun, and I say
It's all right

Sun, sun, sun, here it comes
Sun, sun, sun, here it comes
Sun, sun, sun, here it comes
Sun, sun, sun, here it comes
Sun, sun, sun, here it comes

Little darlin', I feel that ice is slowly melting
Little darlin', it seems like years since it's been clear

Here comes the sun, do-do-do-do
Here comes the sun, and I say
It's all right`,
    textoCurto: 'Esta canção foi escrita por George Harrison e é uma das mais otimistas da banda, celebrando a chegada da primavera e de tempos melhores.'
  };
  return mockData;
}


export default async function MusicaPage({ params }: { params: { id: string } }) {
  
  const musica = await getMusicaData(params.id);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'grey.100' }}>
      <Header />

      <Container component="main" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          {musica.titulo}
        </Typography>

        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 3 }}>
          {/* 1. Usando o Grid para criar as colunas */}
          <Grid container spacing={4}>
            {/* Coluna do Vídeo (metade da tela em telas médias e maiores) */}
            <Grid size={{ xs:12, md:6 }}>
              <Typography variant="h6" component="h2" gutterBottom>Vídeo</Typography>
              <Box 
                sx={{
                  position: 'relative',
                  paddingTop: '56.25%', // Proporção 16:9
                  height: 0,
                  overflow: 'hidden',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${musica.youtubeVideoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>
            </Grid>

            {/* Coluna da Letra (outra metade da tela) */}
            <Grid size={{ xs:12, md:6 }}>
              <Typography variant="h6" component="h2" gutterBottom>Letra</Typography>
              <Box 
                sx={{
                  height: '400px', // Altura fixa para a caixa de letra
                  maxHeight: 'calc(56.25vw / 2)', // Tenta manter a altura parecida com a do vídeo
                  overflowY: 'auto', // Adiciona uma barra de rolagem se a letra for grande
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  // ESSA LINHA É MÁGICA: ela preserva as quebras de linha da sua string
                  whiteSpace: 'pre-wrap', 
                }}
              >
                {musica.letra}
              </Box>
            </Grid>
          </Grid>
          
          {/* 2. Texto curto embaixo */}
          <Box sx={{ mt: 4 }}>
              <Typography variant="body1" paragraph>
                {musica.textoCurto}
              </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}