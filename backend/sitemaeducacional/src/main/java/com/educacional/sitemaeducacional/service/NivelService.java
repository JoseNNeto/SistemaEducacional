package com.educacional.sitemaeducacional.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.educacional.sitemaeducacional.model.Nivel;
import com.educacional.sitemaeducacional.repository.NivelRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class NivelService {

    private final NivelRepository nivelRepository;

    public NivelService(NivelRepository nivelRepository) {
        this.nivelRepository = nivelRepository;
    }

    public List<Nivel> getAllNiveis() {
        return nivelRepository.findAll();
    }

    public Nivel getNivelById(Long id) {
        return nivelRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nível não encontrado com o ID: " + id));
    }

    public Nivel createNivel(Nivel nivel) {
        // Poderia ter uma lógica para verificar se o código já existe
        return nivelRepository.save(nivel);
    }

    public Nivel updateNivel(Long id, Nivel nivelDetails) {
        Nivel nivelExistente = getNivelById(id);

        nivelExistente.setCodigo(nivelDetails.getCodigo());
        nivelExistente.setDescricao(nivelDetails.getDescricao());

        return nivelRepository.save(nivelExistente);
    }

    public void deleteNivel(Long id) {
        if (!nivelRepository.existsById(id)) {
            throw new EntityNotFoundException("Nível não encontrado com o ID: " + id);
        }
        nivelRepository.deleteById(id);
    }
}