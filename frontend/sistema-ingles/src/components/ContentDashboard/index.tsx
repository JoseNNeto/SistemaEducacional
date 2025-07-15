'use client';

import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Typography, 
    Chip, 
    Button,
    CircularProgress,
    Alert,
    Stack 
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; 
import axios from 'axios';

type Conteudo = {
  id: number;
  nome: string;
  progresso?: string;
};

export default function ContentDashboard() {
  const router = useRouter();

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

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
  }

  return (
    <Box>
      
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
        Lista de conteúdos
      </Typography>
      
      <Stack spacing={2} sx={{ mt: 2 }}>
        {conteudos.length > 0 ? (
          conteudos.map((conteudo, index) => (
            <Link key={conteudo.id} href={`/Conteudos/${conteudo.id}`} passHref style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                fullWidth
                sx={{ 
                  p: 2, 
                  justifyContent: 'space-between', 
                  textAlign: 'left',
                  textTransform: 'none' 
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