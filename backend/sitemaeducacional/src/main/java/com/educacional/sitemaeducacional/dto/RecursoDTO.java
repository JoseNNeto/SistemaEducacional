package com.educacional.sitemaeducacional.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecursoDTO {
    private Long id;
    private String url;
    private boolean isMusica;
    private String letra; // Vai ter valor se isMusica for true
    private String legenda; // O valor que já existia
}

