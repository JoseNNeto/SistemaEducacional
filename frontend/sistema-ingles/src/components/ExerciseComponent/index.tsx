'use client';

import React, { useState } from 'react';
import { 
    Box, 
    Typography,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Alert,
    Stack
} from '@mui/material';

// Tipo para os dados do exercício que ele recebe como props
type ExerciseData = {
  id: number;
  pergunta: string;
  opcoes: string[];
  respostaCorreta: string;
};

interface ExerciseComponentProps {
  data: ExerciseData;
}

export default function ExerciseComponent({ data }: ExerciseComponentProps) {
  
  // Estados para gerenciar a interatividade de cada exercício individualmente
  const [selectedValue, setSelectedValue] = useState(''); // Guarda a opção que o usuário selecionou
  const [isSubmitted, setIsSubmitted] = useState(false); // Controla se o usuário já enviou a resposta
  const [isCorrect, setIsCorrect] = useState(false); // Controla se a resposta está correta

  // Atualiza o estado quando o usuário clica em uma opção
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  // Lógica para quando o usuário clica em "Enviar"
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita que a página recarregue
    setIsSubmitted(true); // Marca que a resposta foi enviada
    
    if (selectedValue === data.respostaCorreta) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <Box>
        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            {data.pergunta}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Stack spacing={2} alignItems="flex-start">
            <FormControl component="fieldset" disabled={isSubmitted}>
                <FormLabel component="legend">Selecione uma alternativa:</FormLabel>
                <RadioGroup
                    aria-label={`opcoes-exercicio-${data.id}`}
                    name={`opcoes-${data.id}`}
                    value={selectedValue}
                    onChange={handleRadioChange}
                >
                    {data.opcoes.map((opcao, index) => (
                        <FormControlLabel key={index} value={opcao} control={<Radio />} label={opcao} />
                    ))}
                </RadioGroup>
            </FormControl>
            
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
                disabled={!selectedValue || isSubmitted} // Desabilita se nada foi selecionado ou se já foi enviado
            >
                Verificar
            </Button>
          </Stack>
        </Box>

        {/* Feedback para o usuário após o envio */}
        {isSubmitted && (
            <Alert 
                severity={isCorrect ? "success" : "error"} 
                sx={{ mt: 3 }}
            >
                {isCorrect ? "Parabéns, você acertou!" : `Resposta errada. A resposta correta era: "${data.respostaCorreta}"`}
            </Alert>
        )}
    </Box>
  );
}