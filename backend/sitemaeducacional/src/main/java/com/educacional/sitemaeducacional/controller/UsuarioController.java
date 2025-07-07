package com.educacional.sitemaeducacional.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.educacional.sitemaeducacional.model.Usuario;
import com.educacional.sitemaeducacional.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(Long id) {
        Usuario usuario = usuarioService.findUsuarioById(id);
        return ResponseEntity.ok(usuario);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        List<Usuario> usuarios = usuarioService.findAllUsuario();
        return ResponseEntity.ok(usuarios);
    }

    // @PostMapping
    // public ResponseEntity<Usuario> createUsuario(@RequestBody Usuario usuario) {
    //     Usuario createdUsuario = usuarioService.addUsuario(usuario);
    //     return ResponseEntity.status(HttpStatus.CREATED).body(createdUsuario);
    // }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUsuario(@RequestBody Usuario usuarioDetails, Long id) {
        Usuario updatedUsuario = usuarioService.updateUsuario(id, usuarioDetails);
        return ResponseEntity.ok(updatedUsuario);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(Long id) {
        usuarioService.deleteUsuario(id);
        return ResponseEntity.noContent().build();
    }
}
