'use client';

import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Typography, 
    Chip, 
    Button,
    CircularProgress,
    Alert,
    Stack // Stack é ótimo para listas verticais com espaçamento
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Importando o Link para navegação
import axios from 'axios';

// Tipos de dados (não precisamos mais do Nivel aqui)
type Conteudo = {
  id: number;
  nome: string;
  // O progresso e o nível vêm do DTO completo, podemos adicionar depois
  progresso?: string;
};

export default function ContentDashboard() {
  const router = useRouter();

  // Estados simplificados: só precisamos dos conteúdos, loading e erro
  const [conteudos, setConteudos] = useState<Conteudo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
        // Agora buscamos apenas os conteúdos
        const resConteudos = await axios.get('http://localhost:8080/api/conteudos', { headers });
        setConteudos(resConteudos.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Não foi possível carregar os conteúdos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // Se estiver carregando, mostra o spinner
  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  // Se der erro, mostra um alerta
  if (error) {
    return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
  }

  return (
    <Box>
      {/* A seção de Níveis de Conhecimento foi removida */}
      
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
        Lista de conteúdos
      </Typography>
      
      {/* Usando o componente Stack para criar nossa lista de botões */}
      <Stack spacing={2} sx={{ mt: 2 }}>
        {conteudos.length > 0 ? (
          conteudos.map((conteudo, index) => (
            // Cada item agora é um Link que envolve um Botão
            <Link key={conteudo.id} href={`/Conteudos/${conteudo.id}`} passHref style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                fullWidth
                sx={{ 
                  p: 2, 
                  justifyContent: 'space-between', 
                  textAlign: 'left',
                  textTransform: 'none' // Para o texto não ficar em maiúsculas
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {`${index + 1}. ${conteudo.nome}`}
                </Typography>
                
                <Chip 
                  label={conteudo.progresso || "0/10"} 
                  size="small"
                  variant="outlined" 
                />
              </Button>
            </Link>
          ))
        ) : (
          <Typography sx={{ p: 2, color: 'text.secondary' }}>
            Nenhum conteúdo encontrado.
          </Typography>
        )}
      </Stack>
    </Box>
  );
}