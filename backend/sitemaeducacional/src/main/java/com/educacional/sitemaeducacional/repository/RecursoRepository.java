package com.educacional.sitemaeducacional.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.educacional.sitemaeducacional.model.Recurso;

@Repository
public interface RecursoRepository extends JpaRepository<Recurso, Long> {
    // Aqui você pode adicionar métodos personalizados de consulta, se necessário.
    // Por exemplo, para encontrar um recurso por nome:
    // Optional<Recurso> findByNome(String nome);
    
}
