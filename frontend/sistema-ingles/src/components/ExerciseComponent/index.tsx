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
    Alert
} from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  const router = useRouter();
  
  // Estados para gerenciar a interatividade
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
      console.log("Resposta Correta!");
    } else {
      setIsCorrect(false);
      console.log("Resposta Errada!");
    }
  };

  return (
    <Box>
        <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => router.back()} // Função para voltar para a página anterior
            sx={{ mb: 2 }}
        >
            Voltar
        </Button>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            {data.pergunta}
        </Typography>

        {/* 1. Damos um 'id' para o nosso formulário */}
        <Box component="form" id="exercise-form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl component="fieldset" disabled={isSubmitted}>
                <FormLabel component="legend">Selecione uma alternativa:</FormLabel>
                <RadioGroup
                    aria-label="opcoes-exercicio"
                    name="opcoes"
                    value={selectedValue}
                    onChange={handleRadioChange}
                >
                    {data.opcoes.map((opcao, index) => (
                        <FormControlLabel key={index} value={opcao} control={<Radio />} label={opcao} />
                    ))}
                </RadioGroup>
            </FormControl>
            {/* O botão de enviar não está mais aqui dentro */}
        </Box>

        {/* 2. O botão agora está aqui fora, abaixo do form */}
        <Button
            type="submit"
            form="exercise-form" // <-- E a gente diz a qual formulário ele pertence
            variant="contained"
            sx={{ mt: 2 }}
            disabled={!selectedValue || isSubmitted}
        >
            Enviar
        </Button>
        {/* Mostra o feedback para o usuário depois que ele envia a resposta */}
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