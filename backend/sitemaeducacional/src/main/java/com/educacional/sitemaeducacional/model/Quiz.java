package com.educacional.sitemaeducacional.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "quiz") // Ou QuestaoMultiplaEscolha
@Data
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descricao;

    @ElementCollection // Para listas de Strings simples
    @CollectionTable(name = "quiz_alternativas_erradas", joinColumns = @JoinColumn(name = "quiz_id"))
    @Column(name = "alternativa_errada")
    private List<String> erradas; // list erradas

    private String certa; // alternativa certa

    @ManyToOne
    @JoinColumn(name = "conteudo_id") // FK Conteudo
    private Conteudo conteudo;

    @ManyToOne // Um quiz pode ter um recurso opcional
    @JoinColumn(name = "recurso_id", nullable = true) // Recurso(nullable)
    private Recurso recurso;

}
