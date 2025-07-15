'use client';

import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Typography,
    CircularProgress,
    Alert
} from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Tipos de Dados
type RecursoDTO = { id: number; url: string; legenda: string; letra:string; isMusica: boolean; };
type ConteudoCompletoDTO = { recursos: RecursoDTO[]; };

// O componente recebe os IDs como props
interface VideoClientProps {
  videoId: number;
  conteudoId: number;
}

export default function VideoClient({ videoId, conteudoId }: VideoClientProps) {
  const router = useRouter();

  const [videoData, setVideoData] = useState<RecursoDTO | null>(null);
  const [lyricsResource, setLyricsResource] = useState<RecursoDTO | null>(null);
  const [descriptionResource, setDescriptionResource] = useState<RecursoDTO | null>(null);
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
        // 1. Chama o endpoint que já temos, usando o ID do conteúdo
        const response = await axios.get(`http://localhost:8080/api/conteudos/${conteudoId}/completo`, { headers });
        const conteudoCompleto: ConteudoCompletoDTO = response.data;

        // 2. "Pesca" o vídeo certo dentro da resposta
        const videoEncontrado = conteudoCompleto.recursos.find(
          recurso => recurso.id === videoId && !recurso.isMusica
        );

        // 2. Pesca o primeiro recurso do tipo 'letra' que encontrar
        const letra = conteudoCompleto.recursos.find(r => r.letra !== null && r.letra !== undefined);
        if (letra) setLyricsResource(letra);

        // 3. Pesca o primeiro recurso do tipo 'legenda' que encontrar
        const legenda = conteudoCompleto.recursos.find(r => r.legenda !== null && r.legenda !== undefined);
        if (legenda) setDescriptionResource(legenda);


        if (videoEncontrado) {
          setVideoData(videoEncontrado);
        } else {
          throw new Error(`Vídeo com ID ${videoId} não encontrado.`);
        }

      } catch (err) {
        console.error("Erro ao buscar dados do vídeo:", err);
        setError("Não foi possível carregar o vídeo.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [videoId, conteudoId, router]);

  // Se estiver carregando, mostra o spinner
  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  // Se der erro, mostra um alerta
  if (error) {
    return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
  }
  
  // Extrai o ID do YouTube da URL
  const youtubeVideoId = videoData?.url.split('=').pop() || videoData?.url.split('/').pop();

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Vídeo Aula
      </Typography>
      
      <Box 
        sx={{
          position: 'relative',
          paddingTop: '56.25%',
          height: 0,
          overflow: 'hidden',
          borderRadius: 2,
          boxShadow: 3,
          mt: 3
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${youtubeVideoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Sobre
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, whiteSpace: 'pre-wrap'  }}>
          {videoData?.legenda}
        </Typography>
      </Box>
    </>
  );
}