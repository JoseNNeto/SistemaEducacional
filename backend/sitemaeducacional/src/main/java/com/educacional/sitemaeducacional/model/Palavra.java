package com.educacional.sitemaeducacional.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "palavra")
@Data
public class Palavra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String termo;
    private String traducao;
    private String etimologia;
    private String significado;
}
