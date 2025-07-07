package com.educacional.sitemaeducacional.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.educacional.sitemaeducacional.model.Nivel;

@Repository
public interface NivelRepository extends JpaRepository<Nivel, Long> {
    // Aqui você pode adicionar métodos personalizados de consulta, se necessário.
    // Por exemplo, para encontrar um nível por nome:
    // Optional<Nivel> findByNome(String nome);
    Optional<Nivel> findByCodigo(String codigo);
}
