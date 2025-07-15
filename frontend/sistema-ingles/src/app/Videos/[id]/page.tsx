import React from 'react';
import { 
    Container, 
    Box, 
    Typography,
    Paper // Usaremos o Paper para dar um fundo branco ao conteúdo
} from '@mui/material';
import Header from '@/components/Header';

// --- DADOS DE EXEMPLO (MOCK) ---
// No futuro, isso virá da sua API: GET /api/recursos/{id}
async function getRecursoData(id: string) {
  console.log(`Buscando dados para o recurso com ID: ${id}`);
  
  // Simula a busca de um recurso que é um vídeo do YouTube
  const mockData = {
    id: 1,
    titulo: 'Adjetivos comuns e demonstrativos - Aula 1',
    // A gente só precisa do ID do vídeo do YouTube
    youtubeVideoId: 'rs1p52V6q_w', // Exemplo: um vídeo sobre adjetivos
    textoExplicativo: `Nesta aula, vamos explorar os adjetivos mais comuns na língua inglesa e como usar os pronomes demonstrativos "this", "that", "these" e "those" para apontar para objetos e pessoas. Preste atenção nos exemplos e tente criar suas próprias frases. A prática leva à perfeição!`
  };
  return mockData;
}


export default async function RecursoVideoPage({ params }: { params: { id: string } }) {
  
  // Busca os dados do recurso específico no servidor
  const recurso = await getRecursoData(params.id);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'grey.100' }}>
      {/* 1. Nosso Header padrão */}
      <Header />

      <Container component="main" sx={{ mt: 4, mb: 4 }}>
        {/* 2. Título da página */}
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          {recurso.titulo}
        </Typography>

        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 3 }}>
          {/* 3. Player de Vídeo do YouTube Responsivo */}
          <Box 
            sx={{
              position: 'relative',
              paddingTop: '56.25%', // Proporção 16:9 (para vídeos widescreen)
              height: 0,
              overflow: 'hidden',
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${recurso.youtubeVideoId}`}
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

          {/* 4. Texto Explicativo */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Explicação do Conteúdo
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              {recurso.textoExplicativo}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}