package com.educacional.sitemaeducacional.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.educacional.sitemaeducacional.model.Tema;

@Repository
public interface TemaRepository extends JpaRepository<Tema, Long> {
    // Aqui você pode adicionar métodos personalizados de consulta, se necessário.
    // Por exemplo, para encontrar um tema por nome:
    // Optional<Tema> findByNome(String nome);
    
}
