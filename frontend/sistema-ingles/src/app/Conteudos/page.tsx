import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Header from '@/components/Header';
import ContentDashboard from '@/components/ContentDashboard';

// Função de exemplo para buscar dados. No seu projeto, você usaria fetch ou axios.
// Lembre-se de enviar o token JWT no cabeçalho da requisição!

type Conteudo = {
  id: number;
  nome: string;
};

async function getConteudosData() {
  const cookieStore = cookies();
  const token = cookieStore.get('authToken')?.value;

  // Se não houver token, não podemos buscar os dados.
  // No futuro, você pode redirecionar para o login aqui.
  if (!token) {
    console.warn("Token de autenticação não encontrado nos cookies.");
    return { niveis: [], conteudos: [] };
  }

  // Monta o cabeçalho de autorização
  const headers = {
    'Authorization': `Bearer ${token}`,
  };

  try {
    // Busca os dados dos endpoints em paralelo
    const [resConteudos, resNiveis] = await Promise.all([
      fetch('http://localhost:8080/api/conteudos', { headers }),
      fetch('http://localhost:8080/api/niveis', { headers })
    ]);

    // Verifica se as respostas da rede foram bem-sucedidas
    if (!resConteudos.ok) throw new Error(`Falha ao buscar conteúdos: ${resConteudos.statusText}`);
    if (!resNiveis.ok) throw new Error(`Falha ao buscar níveis: ${resNiveis.statusText}`);

    const conteudos: Conteudo[] = await resConteudos.json();
    const niveis: Nivel[] = await resNiveis.json();

    return { niveis, conteudos };

  } catch (error) {
    console.error("Erro na integração com o backend:", error);
    // Retorna dados vazios em caso de erro para a página não quebrar
    return { niveis: [], conteudos: [] };
  }
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
          Conteúdos Disponíveis
        </Typography>
        
        {/* Renderiza o componente de cliente, passando os dados como props */}
        <ContentDashboard niveis={niveis} conteudos={conteudos} />

      </Container>
    </Box>
  );
}