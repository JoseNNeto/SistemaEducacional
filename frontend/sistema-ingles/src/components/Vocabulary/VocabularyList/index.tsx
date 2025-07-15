'use client';

import React from 'react';
import { Box } from '@mui/material';
import VocabularyItem from '../VocabularyItem';
// Importa o item que acabamos de criar

type Palavra = {
  id: number;
  palavra: string;
  traducao: string;
};

interface VocabularyListProps {
  palavras: Palavra[];
}

export default function VocabularyList({ palavras }: VocabularyListProps) {
  return (
    <Box>
      {palavras.map((item) => (
        <VocabularyItem
          key={item.id}
          palavraEmIngles={item.palavra}
          traducaoCorreta={item.traducao}
        />
      ))}
    </Box>
  );
}