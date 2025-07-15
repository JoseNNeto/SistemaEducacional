package com.educacional.sitemaeducacional.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.educacional.sitemaeducacional.dto.ConteudoCompletoDTO;
import com.educacional.sitemaeducacional.dto.NivelDTO;
import com.educacional.sitemaeducacional.dto.QuizDTO;
import com.educacional.sitemaeducacional.dto.RecursoDTO;
import com.educacional.sitemaeducacional.dto.TemaDTO;
import com.educacional.sitemaeducacional.dto.VocabularioDTO;
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

    @Transactional(readOnly = true) // Essencial para evitar erros de Lazy Loading
    public ConteudoCompletoDTO getConteudoCompletoById(Long id) {
        Conteudo conteudo = conteudoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Conteúdo não encontrado com o ID: " + id));

        return convertToCompletoDto(conteudo);
    }

    private ConteudoCompletoDTO convertToCompletoDto(Conteudo conteudo) {
        ConteudoCompletoDTO dto = new ConteudoCompletoDTO();
        dto.setId(conteudo.getId());
        dto.setNome(conteudo.getNome());

        // Mapeando Nivel (que será ignorado pelo front)
        if (conteudo.getNivel() != null) {
            NivelDTO nivelDto = new NivelDTO();
            nivelDto.setId(conteudo.getNivel().getId());
            nivelDto.setDescricao(conteudo.getNivel().getDescricao());
            dto.setNivel(nivelDto);
        }
        
        // Mapeando Tema
        if (conteudo.getTema() != null) {
            TemaDTO temaDto = new TemaDTO();
            temaDto.setId(conteudo.getTema().getId());
            temaDto.setNome(conteudo.getTema().getNome());
            dto.setTema(temaDto);
        }

        // Mapeando Recursos (Vídeo/Música)
        dto.setRecursos(conteudo.getRecursos().stream().map(recurso -> {
            RecursoDTO recursoDto = new RecursoDTO();
            recursoDto.setId(recurso.getId());
            recursoDto.setUrl(recurso.getUrl());
            recursoDto.setLegenda(recurso.getLegenda());
            
            // A lógica da "gambiarra"
            boolean isMusica = "musica".equalsIgnoreCase(recurso.getTipo());
            recursoDto.setMusica(isMusica);
            if (isMusica) {
                recursoDto.setLetra(recurso.getLetra());
            }
            
            return recursoDto;
        }).collect(Collectors.toSet()));

        // Mapeando Quizzes para a tela de Exercício
        dto.setQuizzes(conteudo.getQuizzes().stream().map(quiz -> {
            QuizDTO quizDto = new QuizDTO();
            quizDto.setId(quiz.getId());
            quizDto.setTitulo(quiz.getTitulo());
            quizDto.setRespostaCorreta(quiz.getCerta());

            List<String> todasOpcoes = new ArrayList<>(quiz.getErradas());
            todasOpcoes.add(quiz.getCerta());
            Collections.shuffle(todasOpcoes);
            quizDto.setOpcoes(todasOpcoes);
            
            return quizDto;
        }).collect(Collectors.toSet()));

        // Mapeando Perguntas para a tela de Vocabulário
        dto.setVocabularios(conteudo.getPerguntas().stream().map(pergunta -> {
            VocabularioDTO vocabularioDto = new VocabularioDTO();
            vocabularioDto.setId(pergunta.getId());

            // A lógica da "gambiarra": assume que o texto da pergunta é "palavra=tradução"
            String[] partes = pergunta.getTexto().split("=", 2);
            if (partes.length == 2) {
                vocabularioDto.setPalavra(partes[0].trim());
                vocabularioDto.setTraducao(partes[1].trim());
            } else {
                vocabularioDto.setPalavra(pergunta.getTexto());
                vocabularioDto.setTraducao(""); // Deixa a tradução em branco se o formato for inesperado
            }
            
            return vocabularioDto;
        }).collect(Collectors.toSet()));

        return dto;
    }
}