'use client';

import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Typography, 
    Breadcrumbs, 
    Link as MuiLink,
    Grid,
    Paper,
    CircularProgress,
    Alert
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Ícones
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

// Tipos que esperamos do backend
type RecursoDTO = { id: number; url: string; isMusica: boolean; letra: string; legenda: string; };
type QuizDTO = { id: number; titulo: string; };
type VocabularioDTO = { id: number; palavra: string; };
type ConteudoCompletoDTO = {
  id: number;
  nome: string;
  recursos: RecursoDTO[];
  quizzes: QuizDTO[];
  vocabularios: VocabularioDTO[];
};

const iconMap: { [key: string]: React.ElementType } = {
  video: VideocamOutlinedIcon,
  musica: MusicNoteOutlinedIcon,
  quiz: QuizOutlinedIcon,
  vocabulario: HelpOutlineOutlinedIcon,
  default: ArticleOutlinedIcon,
};

// O componente recebe o ID do conteúdo como prop
export default function ConteudoDetail({ conteudoId }: { conteudoId: string }) {
  const router = useRouter();

  // Estados para os dados, carregamento e erros
  const [conteudo, setConteudo] = useState<ConteudoCompletoDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/');
        return;
      }

      const headers = { 'Authorization': `Bearer ${token}` };

      try {
        const response = await axios.get(`http://localhost:8080/api/conteudos/${conteudoId}/completo`, { headers });
        setConteudo(response.data);
      } catch (err) {
        console.error("Erro ao buscar detalhes do conteúdo:", err);
        setError("Não foi possível carregar o conteúdo.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [conteudoId, router]); // Roda o efeito se o ID ou o router mudarem

  // Unifica as listas só depois que os dados chegarem
  const atividades = conteudo ? [
    ...conteudo.recursos.map(r => ({
      id: r.id,
      tipo: r.isMusica ? 'musica' : 'video',
      label: r.isMusica ? 'Música' : 'Vídeo',
      href: r.isMusica ? `/Musica/${r.id}` : `/Videos/${r.id}`
    })),
    ...conteudo.quizzes.map(q => ({
      id: q.id,
      tipo: 'quiz',
      label: `Exercício: ${q.titulo}`,
      href: `/Exercicios/${q.id}`
    })),
    ...conteudo.vocabularios.map(v => ({
      id: v.id,
      tipo: 'vocabulario',
      label: `Vocabulário: ${v.palavra}`,
      href: `/Vocabulario/${v.id}`
    }))
  ] : [];

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
  if (!conteudo) return <Alert severity="warning" sx={{ mt: 2 }}>Nenhum dado de conteúdo para exibir.</Alert>;

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <MuiLink component={Link} underline="hover" color="inherit" href="/conteudos">
          Conteúdos
        </MuiLink>
        <Typography color="text.primary">{conteudo.nome}</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        {conteudo.nome}
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {conteudo.recursos.map(recurso => {
            const isMusica = recurso.isMusica;
            const Icon = isMusica ? iconMap.musica : iconMap.video;
            const label = isMusica ? 'Música' : 'Vídeo';
            const href = isMusica ? `/Musica/${recurso.id}` : `/Video/${recurso.id}`;
            
            return (
              <Grid size={{xs:12, sm:6, md:4}} key={`recurso-${recurso.id}`}>
                <Link href={href} passHref style={{ textDecoration: 'none' }}>
                  <Paper elevation={2} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5, backgroundColor: '#001f3f', color: 'white', cursor: 'pointer', '&:hover': { opacity: 0.9 } }}>
                    <Icon />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{label}</Typography>
                  </Paper>
                </Link>
              </Grid>
            );
          })}

          {/* ==================================================================== */}
          {/* BLOCO 2: Renderiza um ÚNICO card para Exercícios, se existir algum */}
          {/* ==================================================================== */}
          {conteudo.quizzes && conteudo.quizzes.length > 0 && (
            <Grid size={{xs:12, sm:6, md:4}} key="portal-exercicios">
              {/* Por enquanto, o link leva para o primeiro exercício da lista */}
              <Link href={`/Exercicios/${conteudo.quizzes[0].id}`} passHref style={{ textDecoration: 'none' }}>
                <Paper elevation={2} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5, backgroundColor: '#001f3f', color: 'white', cursor: 'pointer', '&:hover': { opacity: 0.9 } }}>
                  <QuizOutlinedIcon />
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Exercícios</Typography>
                </Paper>
              </Link>
            </Grid>
          )}

          {/* ==================================================================== */}
          {/* BLOCO 3: Renderiza um ÚNICO card para Vocabulário, se existir algum */}
          {/* ==================================================================== */}
          {conteudo.vocabularios && conteudo.vocabularios.length > 0 && (
            <Grid size={{xs:12, sm:6, md:4}} key="portal-vocabulario">
              {/* Por enquanto, o link leva para o primeiro vocabulário da lista */}
              <Link href={`/Vocabulario/${conteudo.vocabularios[0].id}`} passHref style={{ textDecoration: 'none' }}>
                <Paper elevation={2} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5, backgroundColor: '#001f3f', color: 'white', cursor: 'pointer', '&:hover': { opacity: 0.9 } }}>
                  <HelpOutlineOutlinedIcon />
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Vocabulário</Typography>
                </Paper>
              </Link>
            </Grid>
          )}
      </Grid>
    </>
  );
}