package com.educacional.sitemaeducacional.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.educacional.sitemaeducacional.model.Conteudo;

@Repository
public interface ConteudoRepository extends JpaRepository<Conteudo, Long> {
    List<Conteudo> findByNivelId(Long nivelId);

    List<Conteudo> findByTemaNome(String nomeTema);
    
    Optional<Conteudo> findByNomeIgnoreCase(String nome);

    Optional<Conteudo> findById(Long id);
}
