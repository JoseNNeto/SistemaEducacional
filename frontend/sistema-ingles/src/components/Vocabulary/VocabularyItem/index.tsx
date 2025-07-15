'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// Dados que cada item recebe
type VocabularyItemProps = {
  palavraEmIngles: string;
  traducaoCorreta: string;
};

export default function VocabularyItem({ palavraEmIngles, traducaoCorreta }: VocabularyItemProps) {
  // Cada item gerencia seu próprio estado!
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'correto' | 'incorreto' | 'pendente'>('pendente');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Compara a resposta do usuário (ignorando maiúsculas/minúsculas e espaços)
    if (userInput.trim().toLowerCase() === traducaoCorreta.toLowerCase()) {
      setFeedback('correto');
    } else {
      setFeedback('incorreto');
    }
  };

  return (
    <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2, 
            mb: 2, 
            p: 2, 
            border: '1px solid', 
            borderColor: 'divider', 
            borderRadius: 2 
        }}
    >
        <Typography variant="h6" sx={{ minWidth: '150px', fontWeight: 500 }}>
            {palavraEmIngles}
        </Typography>

        <TextField
            label="Digite a tradução"
            variant="outlined"
            size="small"
            fullWidth
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={feedback !== 'pendente'} // Desabilita depois de enviar
        />

        <Button
            type="submit"
            variant="contained"
            disabled={!userInput || feedback !== 'pendente'}
        >
            Enviar
        </Button>

        {/* Feedback visual após o envio */}
        <Box sx={{ minWidth: '40px', textAlign: 'center' }}>
            {feedback === 'correto' && <CheckCircleIcon color="success" />}
            {feedback === 'incorreto' && <CancelIcon color="error" />}
        </Box>
    </Box>
  );
}