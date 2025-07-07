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

import com.educacional.sitemaeducacional.model.Tema;
import com.educacional.sitemaeducacional.service.TemaService;

@RestController
@RequestMapping("/api/temas")
public class TemaController {
    private final TemaService temaService;

    public TemaController(TemaService temaService) {
        this.temaService = temaService;
    }

    @GetMapping
    public ResponseEntity<List<Tema>> getAllTemas() {
        return ResponseEntity.ok(temaService.getAllTemas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tema> getTemaById(@PathVariable Long id) {
        return ResponseEntity.ok(temaService.getTemaById(id));
    }

    @PostMapping
    public ResponseEntity<Tema> createTema(@RequestBody Tema tema) {
        Tema novoTema = temaService.createTema(tema);
        return new ResponseEntity<>(novoTema, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tema> updateTema(@PathVariable Long id, @RequestBody Tema temaDetails) {
        return ResponseEntity.ok(temaService.updateTema(id, temaDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTema(@PathVariable Long id) {
        temaService.deleteTema(id);
        return ResponseEntity.noContent().build();
    }
}
