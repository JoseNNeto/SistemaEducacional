package com.educacional.sitemaeducacional.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.educacional.sitemaeducacional.model.Palavra;

@Repository
public interface PalavraRepository extends JpaRepository<Palavra, Long> {
    // Aqui você pode adicionar métodos personalizados de consulta, se necessário.
    // Por exemplo, para encontrar uma palavra por nome:
    // Optional<Palavra> findByNome(String nome);
    
}
