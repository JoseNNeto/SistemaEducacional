package com.educacional.sitemaeducacional.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.educacional.sitemaeducacional.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Aqui você pode adicionar métodos personalizados de consulta, se necessário.
    // Por exemplo, para encontrar um usuário por email:
    // Optional<Usuario> findByEmail(String email);
    
}
