package com.educacional.sitemaeducacional.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.educacional.sitemaeducacional.dto.CadastroRequest;
import com.educacional.sitemaeducacional.dto.LoginRequest;
import com.educacional.sitemaeducacional.dto.LoginResponse;
import com.educacional.sitemaeducacional.model.Usuario;
import com.educacional.sitemaeducacional.service.JwtService;
import com.educacional.sitemaeducacional.service.UsuarioService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Libera o acesso para o teu frontend Next.js
public class AuthController {
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        // Autentica o usuário usando o mecanismo do Spring Security
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        // Se a autenticação deu certo, o usuário está no `authentication.getPrincipal()`
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // Gera o token JWT
        String token = jwtService.generateToken(userDetails);

        // Retorna o token na resposta
        return ResponseEntity.ok(new LoginResponse(token));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<Usuario> cadastrar(@RequestBody CadastroRequest cadastroRequest) {
        Usuario usuarioCadastrado = usuarioService.cadastrarNovoUsuario(cadastroRequest);
        // Retorna 201 Created com os dados do usuário criado (sem a senha, idealmente, mas vamos simplificar por agora)
        return new ResponseEntity<>(usuarioCadastrado, HttpStatus.CREATED);
    }
}
