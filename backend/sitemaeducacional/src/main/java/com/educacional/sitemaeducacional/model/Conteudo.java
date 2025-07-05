package com.educacional.sitemaeducacional.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Table(name = "conteudo")
@Data
public class Conteudo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @ManyToOne
    @JoinColumn(name = "nivel_id", referencedColumnName = "id") // FK Nivel no diagrama
    private Nivel nivel;

    @OneToMany(mappedBy = "conteudo") // Relação com Recurso (precisa ser adicionada em Recurso)
    private Set<Recurso> recursos;

    @OneToMany(mappedBy = "conteudo") // Relação com Quiz (QuestaoMultiplaEscolha)
    private Set<Quiz> quizzes;

    @OneToMany(mappedBy = "conteudo") // Relação com Pergunta (Aberta)
    private Set<Pergunta> perguntas;
    
    @ManyToOne
    @JoinColumn(name = "tema_id", nullable = true) // Sugestão: Conteúdo pode ter um Tema
    private Tema tema;

}
