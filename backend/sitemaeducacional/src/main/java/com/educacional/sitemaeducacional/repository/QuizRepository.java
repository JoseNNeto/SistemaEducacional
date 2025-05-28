package com.educacional.sitemaeducacional.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.educacional.sitemaeducacional.model.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    // Custom query methods can be defined here if needed
    // For example, to find quizzes by a specific field:
    // List<Quiz> findByTema(Tema tema);
    // List<Quiz> findByNivel(Nivel nivel);
    // List<Quiz> findByPalavra(Palavra palavra);
    
}
