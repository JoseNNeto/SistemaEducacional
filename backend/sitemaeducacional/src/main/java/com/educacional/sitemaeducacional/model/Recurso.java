package com.educacional.sitemaeducacional.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "recurso")
@Data
public class Recurso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // O campo 'fk tipo' no diagrama. Se for uma string simples:
    private String tipo; 
    // Se 'tipo' fosse uma entidade separada TipoRecurso:
    // @ManyToOne
    // @JoinColumn(name = "tipo_recurso_id")
    // private TipoRecurso tipo;

    private String url;
    private boolean legenda; // bool legenda

    @ManyToOne
    @JoinColumn(name = "conteudo_id", nullable = true) // Adicionando a FK para Conteudo
    private Conteudo conteudo;

}
