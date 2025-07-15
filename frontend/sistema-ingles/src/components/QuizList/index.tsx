'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert, Divider, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ExerciseComponent from '../ExerciseComponent';

// Tipo de dado que vem do backend
type QuizDTO = {
  id: number;
  titulo: string;
  respostaCorreta: string;
  opcoes: string[];
};

// Props que o componente recebe
interface QuizListProps {
  conteudoId: number;
}

// Função para embaralhar a lista de opções
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function QuizListComponent({ conteudoId }: QuizListProps) {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<QuizDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/login');
        return;
      }
      const headers = { 'Authorization': `Bearer ${token}` };

      try {
        const response = await axios.get(`http://localhost:8080/api/conteudos/${conteudoId}/completo`, { headers });
        console.log("Dados recebidos:", response.data);
        if (response.data && response.data.quizzes) {
          setQuizzes(response.data.quizzes);
        }
      } catch (err) {
        setError("Não foi possível carregar os exercícios.");
        console.error("Erro ao buscar quizzes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [conteudoId, router]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;

  return (
    <Stack spacing={4} divider={<Divider />}>
      {quizzes.length > 0 ? (
        quizzes.map(quiz => {
          
          const exerciseData = {
            id: quiz.id,
            pergunta: quiz.titulo,
            opcoes: quiz.opcoes, // Usa a lista de opções que já veio pronta
            respostaCorreta: quiz.respostaCorreta, // Usa a resposta correta que já veio
          };

          return (
            <Box key={quiz.id} sx={{ pt: 2, pb: 2 }}>
              <ExerciseComponent data={exerciseData} />
            </Box>
          );
        })
      ) : (
        <Typography>Nenhum exercício encontrado para este conteúdo.</Typography>
      )}
    </Stack>
  );
}