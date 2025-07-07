import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Header from '@/components/Header';
import ContentDashboard from '@/components/ContentDashboard';

// Função de exemplo para buscar dados. No seu projeto, você usaria fetch ou axios.
// Lembre-se de enviar o token JWT no cabeçalho da requisição!
async function getConteudosData() {
  // const responseConteudos = await fetch('http://localhost:8080/api/conteudos', { headers: { 'Authorization': `Bearer ${token}` } });
  // const conteudos = await responseConteudos.json();
  
  // const responseNiveis = await fetch('http://localhost:8080/api/niveis', { headers: { 'Authorization': `Bearer ${token}` } });
  // const niveis = await responseNiveis.json();
  
  // Por enquanto, vamos usar dados de exemplo (mock)
  const niveis = [
    { id: 1, descricao: 'Iniciante' },
    { id: 2, descricao: 'Intermediário' },
    { id: 3, descricao: 'Avançado' },
  ];

  const conteudos = [
    { id: 1, nome: 'Adjetivos comuns e demonstrativos', nivel: niveis[0], progresso: '0/10' },
    { id: 2, nome: 'Preposições de tempo e lugar', nivel: niveis[0], progresso: '0/8' },
    { id: 3, nome: 'Passado contínuo e perfeito', nivel: niveis[1], progresso: '0/10' },
    { id: 4, nome: 'Presente perfeito contínuo', nivel: niveis[1], progresso: '0/10' },
    { id: 5, nome: 'Tempos verbais de narrativa', nivel: niveis[2], progresso: '0/10' },
    { id: 6, nome: 'Todas as formas de voz passiva', nivel: niveis[2], progresso: '0/10' },
  ];

  return { niveis, conteudos };
}

// Esta é uma página assíncrona (Server Component)
export default async function ConteudosPage() {
  
  // Busca os dados no servidor antes da página ser renderizada
  const { niveis, conteudos } = await getConteudosData();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Ferramenta Educacional
        </Typography>
        
        {/* Renderiza o componente de cliente, passando os dados como props */}
        <ContentDashboard niveis={niveis} conteudos={conteudos} />

      </Container>
    </Box>
  );
}