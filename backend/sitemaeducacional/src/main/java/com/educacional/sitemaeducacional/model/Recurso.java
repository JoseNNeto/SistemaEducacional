package com.educacional.sitemaeducacional.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "recurso")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Recurso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo; // Ex: "video", "exercicio", "musica", "vocabulario"
    private String url;  // Pode ser o link do vídeo ou outro recurso

    @Column(columnDefinition = "TEXT")
    private String legenda; 

    @Column(columnDefinition = "TEXT") // Bom para textos longos
    private String letra; // NOVO CAMPO PARA A LETRA DA MÚSICA

    @ManyToOne
    @JoinColumn(name = "conteudo_id")
    @JsonBackReference
    private Conteudo conteudo;

}
