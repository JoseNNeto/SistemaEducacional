package com.educacional.sitemaeducacional.dto;

import lombok.Data;

@Data
public class CadastroRequest {
    private String nome;
    private String email;
    private String senha;
}

