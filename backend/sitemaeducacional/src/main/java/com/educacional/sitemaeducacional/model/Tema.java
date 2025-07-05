package com.educacional.sitemaeducacional.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tema")
@Data
public class Tema {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
}
