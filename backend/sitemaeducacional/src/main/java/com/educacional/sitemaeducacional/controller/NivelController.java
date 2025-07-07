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

import com.educacional.sitemaeducacional.model.Nivel;
import com.educacional.sitemaeducacional.service.NivelService;

@RestController
@RequestMapping("/api/niveis")
public class NivelController {

    private final NivelService nivelService;

    public NivelController(NivelService nivelService) {
        this.nivelService = nivelService;
    }

    @GetMapping
    public ResponseEntity<List<Nivel>> getAllNiveis() {
        return ResponseEntity.ok(nivelService.getAllNiveis());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Nivel> getNivelById(@PathVariable Long id) {
        return ResponseEntity.ok(nivelService.getNivelById(id));
    }

    @PostMapping
    public ResponseEntity<Nivel> createNivel(@RequestBody Nivel nivel) {
        Nivel novoNivel = nivelService.createNivel(nivel);
        return new ResponseEntity<>(novoNivel, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Nivel> updateNivel(@PathVariable Long id, @RequestBody Nivel nivelDetails) {
        return ResponseEntity.ok(nivelService.updateNivel(id, nivelDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNivel(@PathVariable Long id) {
        nivelService.deleteNivel(id);
        return ResponseEntity.noContent().build();
    }
}
