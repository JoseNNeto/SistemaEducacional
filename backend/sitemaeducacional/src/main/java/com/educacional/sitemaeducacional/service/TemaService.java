package com.educacional.sitemaeducacional.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.educacional.sitemaeducacional.model.Tema;
import com.educacional.sitemaeducacional.repository.TemaRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TemaService {
    private final TemaRepository temaRepository;
    
    public TemaService(TemaRepository temaRepository) {
        this.temaRepository = temaRepository;
    }

    public List<Tema> getAllTemas() {
        return temaRepository.findAll();
    }

    public Tema getTemaById(Long id) {
        return temaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tema não encontrado com o ID: " + id));
    }

    public Tema createTema(Tema tema) {
        // Validação para evitar temas com nomes duplicados, por exemplo.
        if (temaRepository.findByNomeIgnoreCase(tema.getNome()).isPresent()) {
            throw new IllegalStateException("Um tema com o nome '" + tema.getNome() + "' já existe.");
        }
        return temaRepository.save(tema);
    }

    public Tema updateTema(Long id, Tema temaDetails) {
        Tema temaExistente = getTemaById(id);
        temaExistente.setNome(temaDetails.getNome());
        return temaRepository.save(temaExistente);
    }

    public void deleteTema(Long id) {
        if (!temaRepository.existsById(id)) {
            throw new EntityNotFoundException("Tema não encontrado com o ID: " + id);
        }
        temaRepository.deleteById(id);
    }
}
