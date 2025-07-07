package com.educacional.sitemaeducacional.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.educacional.sitemaeducacional.model.Conteudo;
import com.educacional.sitemaeducacional.repository.ConteudoRepository;

import jakarta.persistence.EntityNotFoundException;;

@Service
public class ConteudoService {

    private final ConteudoRepository conteudoRepository;

    public ConteudoService(ConteudoRepository conteudoRepository) {
        // Injeção de dependência via construtor é uma boa prática!
        this.conteudoRepository = conteudoRepository;
    }

    public List<Conteudo> getAllConteudos() {
        return conteudoRepository.findAll();
    }

    public Conteudo getConteudoById(Long id) {
        return conteudoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Conteúdo não encontrado com o ID: " + id));
    }

    public Conteudo createConteudo(Conteudo conteudo) {
        // Aqui tu poderias adicionar lógicas de validação antes de salvar
        return conteudoRepository.save(conteudo);
    }

    public Conteudo updateConteudo(Long id, Conteudo conteudoDetails) {
        // Primeiro, busca o conteúdo existente no banco
        Conteudo conteudoExistente = getConteudoById(id);

        // Atualiza os campos do conteúdo existente com os detalhes recebidos
        conteudoExistente.setNome(conteudoDetails.getNome());
        conteudoExistente.setNivel(conteudoDetails.getNivel());
        conteudoExistente.setTema(conteudoDetails.getTema());
        // Atenção: As listas (recursos, quizzes, etc.) geralmente são gerenciadas
        // de forma mais complexa, adicionando ou removendo itens individualmente.
        // Uma simples atribuição pode não ser o ideal dependendo do caso de uso.

        return conteudoRepository.save(conteudoExistente);
    }

    public void deleteConteudo(Long id) {
        // Verifica se o conteúdo existe antes de deletar
        if (!conteudoRepository.existsById(id)) {
            throw new EntityNotFoundException("Conteúdo não encontrado com o ID: " + id);
        }
        conteudoRepository.deleteById(id);
    }
}