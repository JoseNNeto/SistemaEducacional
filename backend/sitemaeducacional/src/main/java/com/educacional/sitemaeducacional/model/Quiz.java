package com.educacional.sitemaeducacional.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "quiz") // Ou QuestaoMultiplaEscolha
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
    @JsonBackReference
    private Conteudo conteudo;

    @ManyToOne // Um quiz pode ter um recurso opcional
    @JoinColumn(name = "recurso_id", nullable = true) // Recurso(nullable)
    private Recurso recurso;

}
