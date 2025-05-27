package com.educacional.sitemaeducacional.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "usuario")
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    private String senha;

    @ManyToMany
    @JoinTable(
        name = "usuario_conteudos_aprendidos",
        joinColumns = @JoinColumn(name = "usuario_id"),
        inverseJoinColumns = @JoinColumn(name = "conteudo_id")
    )
    private Set<Conteudo> conteudosAprendidos;

    @ManyToMany
    @JoinTable(
        name = "usuario_niveis_completos",
        joinColumns = @JoinColumn(name = "usuario_id"),
        inverseJoinColumns = @JoinColumn(name = "nivel_id")
    )
    private Set<Nivel> niveisCompletos;

    @ManyToMany
    @JoinTable(
        name = "usuario_quiz_feito",
        joinColumns = @JoinColumn(name = "usuario_id"),
        inverseJoinColumns = @JoinColumn(name = "quiz_id")
    )
    private Set<Quiz> quizFeito; // Assumindo Quiz é uma Questão de Múltipla Escolha

    @ManyToMany
    @JoinTable(
        name = "usuario_pergunta_feita",
        joinColumns = @JoinColumn(name = "usuario_id"),
        inverseJoinColumns = @JoinColumn(name = "pergunta_id")
    )
    private Set<Pergunta> perguntaFeita;

    @ManyToMany
    @JoinTable(
        name = "usuario_recurso_feito",
        joinColumns = @JoinColumn(name = "usuario_id"),
        inverseJoinColumns = @JoinColumn(name = "recurso_id")
    )
    private Set<Recurso> recursoFeito;

    @ManyToMany
    @JoinTable(
        name = "usuario_palavras_aprendidas",
        joinColumns = @JoinColumn(name = "usuario_id"),
        inverseJoinColumns = @JoinColumn(name = "palavra_id")
    )
    private Set<Palavra> palavrasAprendidas;
}
