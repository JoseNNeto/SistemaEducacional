package com.educacional.sitemaeducacional.service;

import java.util.List;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.educacional.sitemaeducacional.dto.CadastroRequest;
import com.educacional.sitemaeducacional.model.Usuario;
import com.educacional.sitemaeducacional.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final PasswordEncoder passwordEncoder;
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario findUsuarioById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));
    }

    public List<Usuario> findAllUsuario() {
        return usuarioRepository.findAll();
    }
    
    public Usuario cadastrarNovoUsuario(CadastroRequest cadastroRequest) {
        // 1. Verifica se o e-mail já está em uso
        if (usuarioRepository.findByEmail(cadastroRequest.getEmail()).isPresent()) {
            throw new IllegalStateException("E-mail já cadastrado!");
        }

        // 2. Cria uma nova entidade Usuario
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(cadastroRequest.getNome());
        novoUsuario.setEmail(cadastroRequest.getEmail());

        // 3. A MÁGICA ACONTECE AQUI: Codifica a senha antes de salvar!
        novoUsuario.setSenha(passwordEncoder.encode(cadastroRequest.getSenha()));

        // 4. Salva o novo usuário no banco de dados
        return usuarioRepository.save(novoUsuario);
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
