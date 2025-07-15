-- =======================================================================
--  BASE DE DADOS INICIAL - TUDO COMEÇANDO DO ID 1
-- =======================================================================

-- ADICIONANDO USUÁRIOS DE TESTE
INSERT INTO usuario (id, nome, email, senha) VALUES (9, 'Neto Testador', 'neto@email.com', '$2a$10$GmZpeKWzTBWSa/ME7bbmN.F3lmMUc5xqn4mlZJxbhqAual0zZ1wt2');
INSERT INTO usuario (id, nome, email, senha) VALUES (10, 'Usuário Padrão', 'user@user.com', '$2a$10$GmZpeKWzTBWSa/ME7bbmN.F3lmMUc5xqn4mlZJxbhqAual0zZ1wt2');
INSERT INTO usuario (id, nome, email, senha) VALUES (11, 'Maria Estudiosa', 'maria@email.com', '$2a$10$GmZpeKWzTBWSa/ME7bbmN.F3lmMUc5xqn4mlZJxbhqAual0zZ1wt2');

-- INSERINDO DADOS BASE (Níveis, etc.)
INSERT INTO nivel (id, codigo, descricao) VALUES (1, 'N001', 'Iniciante');
INSERT INTO nivel (id, codigo, descricao) VALUES (2, 'N002', 'Intermediário');
INSERT INTO nivel (id, codigo, descricao) VALUES (3, 'N003', 'Avançado');

-- INSERINDO O TEMA "PRONOUNS"
INSERT INTO tema (id, nome) VALUES (1, 'Pronouns');

-- INSERINDO O CONTEÚDO PRINCIPAL PARA ESTE TEMA
-- Conteúdo ID 1, ligado ao Tema ID 1 e Nível ID 1
INSERT INTO conteudo (id, nome, nivel_id, tema_id) VALUES (1, 'Introduction to Pronouns', 1, 1);

-- ADICIONANDO OS RECURSOS (VÍDEO E MÚSICA) LIGADOS AO CONTEÚDO 1

--- Recurso de Vídeo (ID 1) com legenda como STRING
INSERT INTO recurso (id, tipo, url, legenda, conteudo_id) VALUES (1, 'video', 'https://www.youtube.com/watch?v=DE8qVfNW5B0', 'Pensa nos pronomes como "apelidos" ou "atalhos" para os nomes das coisas, pessoas ou lugares (os substantivos). Em vez de ficar repetindo o mesmo nome toda hora, a gente usa um pronome para deixar a conversa mais fluida e menos repetitiva. A graça do vídeo é que os nomes dos personagens são pronomes, o que causa uma grande confusão.', 1);

-- Recurso de Música (ID 2)
INSERT INTO recurso (id, tipo, url, legenda, conteudo_id) VALUES (2, 'musica', 'https://www.youtube.com/watch?v=pSw8an1u3rc', 'Imagine me and you, I do
I think about you day and night, it''s only right
To think about the girl you love and hold her tight
So happy together

If I should call you up, invest a dime
And you say you belong to me and ease my mind
Imagine how the world could be, so very fine
So happy together

I can''t see me lovin'' nobody but you
For all my life
When you''re with me, baby, the skies''ll be blue
For all my life

Me and you, and you and me
No matter how they toss the dice, it had to be
The only one for me is you, and you for me
So happy together

I can''t see me lovin'' nobody but you
For all my life
When you''re with me, baby, the skies''ll be blue
For all my life

Me and you, and you and me
No matter how they toss the dice, it had to be
The only one for me is you, and you for me
So happy together

Ba-ba-ba-ba ba-ba-ba-ba ba-ba-ba ba-ba-ba-ba
Ba-ba-ba-ba ba-ba-ba-ba ba-ba-ba ba-ba-ba-ba

Me and you, and you and me
No matter how they toss the dice, it had to be
The only one for me is you, and you for me
So happy together', 1);


-- ADICIONANDO AS DESCRIÇÕES (USANDO A TABELA 'PERGUNTA')

-- Descrição para o Vídeo (ID 1, ligado ao recurso 1)
INSERT INTO pergunta (id, texto, conteudo_id, recurso_id) VALUES (1, 'Pronomes são palavras que substituem ou se referem a substantivos (nomes de pessoas, lugares ou coisas). Eles evitam a repetição e deixam as frases mais fluidas. O vídeo faz uma piada clássica do humorista Abbott Costello, onde a confusão acontece porque os nomes dos jogadores de beisebol são pronomes, como "Who" (Quem), "What" (O quê) e "I don''t know" (Eu não sei).', 1, 1);

-- Descrição para a Música (ID 2, ligado ao recurso 2)
INSERT INTO pergunta (id, texto, conteudo_id, recurso_id) VALUES (2, 'Nesta letra, podemos encontrar vários pronomes pessoais e possessivos que são fundamentais no inglês. Preste atenção em como eles são usados: I (eu), me (mim), you (você), my (meu).', 1, 2);


-- ADICIONANDO OS QUIZZES (EXERCÍCIOS) SOBRE O TEMA

-- Quiz 1 (ID 1, ligado ao conteúdo 1)
INSERT INTO quiz (id, titulo, certa, conteudo_id) VALUES (1, 'Na frase "She loves her dog", qual palavra é um pronome possessivo?', 'her', 1);
INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (1, 'She');
INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (1, 'loves');
INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (1, 'dog');

-- Quiz 2 (ID 2, ligado ao conteúdo 1)
INSERT INTO quiz (id, titulo, certa, conteudo_id) VALUES (2, 'Qual pronome substitui "the students" na frase "The students are smart"?', 'They', 1);
INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (2, 'He');
INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (2, 'We');
INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (2, 'It');

