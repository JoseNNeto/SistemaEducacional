'use client';

import React, { useState } from 'react';
import { Box, Typography, Chip, List, ListItem, ListItemText, Button, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';

// Tipos para os dados que virão do backend
type Nivel = {
  id: number;
  descricao: string;
};

type Conteudo = {
  id: number;
  nome: string;
  nivel: Nivel;
  progresso?: string; // Ex: "0/10"
};

// Props que o componente vai receber da página (Server Component)
interface ContentDashboardProps {
  niveis: Nivel[];
  conteudos: Conteudo[];
}

export default function ContentDashboard({ niveis, conteudos }: ContentDashboardProps) {
  const [selectedNivelId, setSelectedNivelId] = useState<number | null>(null);
  const router = useRouter();

  const handleNivelClick = (nivelId: number) => {
    // Se o nível clicado já estiver selecionado, deseleciona (mostra todos)
    setSelectedNivelId(prevId => (prevId === nivelId ? null : nivelId));
  };

  const handleAcessarClick = (conteudoId: number) => {
    router.push(`/conteudos/${conteudoId}`);
  };

  // Filtra os conteúdos com base no nível selecionado
  const conteudosFiltrados = selectedNivelId
    ? conteudos.filter(c => c.nivel.id === selectedNivelId)
    : conteudos;

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
        Níveis de conhecimento
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
        {niveis.map((nivel) => (
          <Chip
            key={nivel.id}
            label={nivel.descricao}
            onClick={() => handleNivelClick(nivel.id)}
            variant={selectedNivelId === nivel.id ? 'filled' : 'outlined'}
            color={selectedNivelId === nivel.id ? 'primary' : 'default'}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Box>

      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
        Lista de conteúdos
      </Typography>
      <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
        {conteudosFiltrados.map((conteudo, index) => (
          <React.Fragment key={conteudo.id}>
            <ListItem
              secondaryAction={
                <Button variant="outlined" onClick={() => handleAcessarClick(conteudo.id)}>
                  Acessar
                </Button>
              }
            >
              <ListItemText
                primary={`${index + 1}. ${conteudo.nome}`}
                primaryTypographyProps={{ fontWeight: 'medium' }}
                secondary={
                  <Chip 
                    label={conteudo.progresso || '0/0'} 
                    size="small" 
                    sx={{ mt: 1 }} 
                    variant="outlined" 
                  />
                }
                secondaryTypographyProps={{ component: 'div' }}
              />
            </ListItem>
            {index < conteudosFiltrados.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}