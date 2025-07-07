package com.educacional.sitemaeducacional.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.educacional.sitemaeducacional.model.Conteudo;
import com.educacional.sitemaeducacional.service.ConteudoService;

@RestController
@RequestMapping("/api/conteudos") // Define o caminho base para todos os endpoints deste controller
public class ConteudoController {

    private final ConteudoService conteudoService;

    public ConteudoController(ConteudoService conteudoService) {
        this.conteudoService = conteudoService;
    }

    // Endpoint para LISTAR TODOS os conteúdos (GET /api/conteudos)
    @GetMapping
    public ResponseEntity<List<Conteudo>> getAllConteudos() {
        List<Conteudo> conteudos = conteudoService.getAllConteudos();
        return ResponseEntity.ok(conteudos);
    }

    // Endpoint para BUSCAR UM conteúdo pelo ID (GET /api/conteudos/1)
    @GetMapping("/{id}")
    public ResponseEntity<Conteudo> getConteudoById(@PathVariable Long id) {
        Conteudo conteudo = conteudoService.getConteudoById(id);
        return ResponseEntity.ok(conteudo);
    }

    // Endpoint para CRIAR um novo conteúdo (POST /api/conteudos)
    @PostMapping
    public ResponseEntity<Conteudo> createConteudo(@RequestBody Conteudo conteudo) {
        Conteudo novoConteudo = conteudoService.createConteudo(conteudo);
        return new ResponseEntity<>(novoConteudo, HttpStatus.CREATED);
    }

    // Endpoint para ATUALIZAR um conteúdo existente (PUT /api/conteudos/1)
    @PutMapping("/{id}")
    public ResponseEntity<Conteudo> updateConteudo(@PathVariable Long id, @RequestBody Conteudo conteudoDetails) {
        Conteudo conteudoAtualizado = conteudoService.updateConteudo(id, conteudoDetails);
        return ResponseEntity.ok(conteudoAtualizado);
    }

    // Endpoint para DELETAR um conteúdo (DELETE /api/conteudos/1)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConteudo(@PathVariable Long id) {
        conteudoService.deleteConteudo(id);
        return ResponseEntity.noContent().build(); // Retorna 204 No Content, indicando sucesso na exclusão
    }
}