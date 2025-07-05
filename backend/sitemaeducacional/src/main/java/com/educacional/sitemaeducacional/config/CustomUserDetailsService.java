package com.educacional.sitemaeducacional.config;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.educacional.sitemaeducacional.model.Usuario;
import com.educacional.sitemaeducacional.repository.UsuarioRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // No nosso sistema, o "username" é o email
        Usuario usuario = usuarioRepository.findByEmail(email) // Assume que tu tens esse método no UsuarioRepository
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com o email: " + email));

        // Aqui a gente cria um UserDetails do Spring Security.
        // Por enquanto, vamos usar uma lista vazia de autoridades (roles).
        // Se tu tiveres roles (ADMIN, USER, etc.), precisa carregar elas aqui.
        return new User(usuario.getEmail(), usuario.getSenha(), new ArrayList<>());
    }
}
