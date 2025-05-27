package com.educacional.sitemaeducacional.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "nivel")
@Data
public class Nivel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigo;
    private String descricao;
}
