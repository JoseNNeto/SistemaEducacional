package com.educacional.sitemaeducacional.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.educacional.sitemaeducacional.model.Pergunta;

@Repository
public interface PerguntaRepository extends JpaRepository<Pergunta, Long> {
    // Aqui você pode adicionar métodos personalizados de consulta, se necessário.
    // Por exemplo, para encontrar uma pergunta por texto:
    // Optional<Pergunta> findByTexto(String texto);
    
}
