package com.educacional.sitemaeducacional.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "palavra")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Palavra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String termo;
    private String traducao;
}
