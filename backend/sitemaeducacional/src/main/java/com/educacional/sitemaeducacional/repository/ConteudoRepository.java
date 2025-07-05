package com.educacional.sitemaeducacional.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.educacional.sitemaeducacional.model.Conteudo;

@Repository
public interface ConteudoRepository extends JpaRepository<Conteudo, Long> {
    // Aqui você pode adicionar métodos personalizados de consulta, se necessário.
    // Por exemplo, para encontrar um conteúdo por título:
    // Optional<Conteudo> findByTitulo(String titulo);
    
}
