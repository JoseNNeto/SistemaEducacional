package com.educacional.sitemaeducacional.dto;

import java.util.List;

import lombok.Data;

@Data
public class QuizDTO {
    private Long id;
    private String titulo; // A pergunta do exercício
    private List<String> opcoes; // Lista única com a resposta certa e as erradas, já embaralhadas
    private String respostaCorreta; // ATENÇÃO: Lembre-se do aviso de segurança sobre isso!
}
