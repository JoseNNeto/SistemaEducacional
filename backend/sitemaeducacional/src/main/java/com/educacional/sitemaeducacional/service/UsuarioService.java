package com.educacional.sitemaeducacional.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.educacional.sitemaeducacional.model.Usuario;
import com.educacional.sitemaeducacional.repository.UsuarioRepository;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario findUsuarioById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));
    }

    public List<Usuario> findAllUsuario() {
        return usuarioRepository.findAll();
    }
    
    public Usuario addUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario updateUsuario(Long id, Usuario usuarioDetails) {
        Usuario usuario = findUsuarioById(id);
        usuario.setNome(usuarioDetails.getNome());
        usuario.setEmail(usuarioDetails.getEmail());
        usuario.setSenha(usuarioDetails.getSenha());
        // Atualize outros campos conforme necessário
        return usuarioRepository.save(usuario);
    }

    public void deleteUsuario(Long id) {
        Usuario usuario = findUsuarioById(id);
        usuarioRepository.delete(usuario);
    }
}
