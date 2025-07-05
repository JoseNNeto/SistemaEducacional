package com.educacional.sitemaeducacional.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "pergunta")
@Data
public class Pergunta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String texto;

    @Column(name = "key_field1") // "Key Field"
    private String keyField1;

    // @Column(name = "key_field2") // Se houver outro "Key Field"
    // private String keyField2;

    @ManyToOne
    @JoinColumn(name = "conteudo_id") // FK Conteudo
    private Conteudo conteudo;

    @ManyToOne // Uma pergunta pode ter um recurso opcional
    @JoinColumn(name = "recurso_id", nullable = true) // FK Recurso(nullable)
    private Recurso recurso;

}
