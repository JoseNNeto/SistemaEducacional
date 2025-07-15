import React from 'react';
import { Container, Box, Paper } from '@mui/material';
import Header from '@/components/Header';
import ExerciseComponent from '@/components/ExerciseComponent';

// --- DADOS DE EXEMPLO (MOCK) ---
// Esta função buscaria os dados de um exercício específico
async function getExercicioData(id: string) {
  console.log(`Buscando dados para o EXERCÍCIO com ID: ${id}`);
  
  return {
    id: parseInt(id),
    pergunta: 'Qual a tradução correta para "book"?',
    opcoes: ['Caneta', 'Livro', 'Mesa', 'Cadeira'],
    respostaCorreta: 'Livro'
  };
}

export default async function ExercicioPage({ params }: { params: { id: string } }) {
  
  const exercicioData = await getExercicioData(params.id);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
          {/* A página agora renderiza diretamente o componente de exercício */}
          <ExerciseComponent data={exercicioData} />
        </Paper>
      </Container>
    </Box>
  );
}