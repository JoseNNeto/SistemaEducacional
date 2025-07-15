package com.educacional.sitemaeducacional.dto;

import java.util.Set;

import lombok.Data;

@Data
public class ConteudoCompletoDTO {
    private Long id;
    private String nome;
    private NivelDTO nivel; // Será ignorado pelo front, mas está aqui
    private Set<RecursoDTO> recursos;
    private Set<QuizDTO> quizzes;
    private Set<VocabularioDTO> vocabularios; // Adaptado de 'perguntas'
    private TemaDTO tema; // Vamos criar um TemaDTO também
}