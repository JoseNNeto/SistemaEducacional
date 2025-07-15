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
INSERT INTO tema (id, nome) VALUES (2, 'Present Simple');

-- INSERINDO O CONTEÚDO PRINCIPAL PARA ESTE TEMA
-- Conteúdo ID 1, ligado ao Tema ID 1 e Nível ID 1
INSERT INTO conteudo (id, nome, nivel_id, tema_id) VALUES (1, 'Introduction to Pronouns', 1, 1);
INSERT INTO conteudo (id, nome, nivel_id, tema_id) VALUES (2, 'Present Simple (‘to have’ & other verbs) ', 1, 2);

-- ADICIONANDO OS RECURSOS (VÍDEO E MÚSICA) LIGADOS AO CONTEÚDO 1

--- Recurso de Vídeo (ID 1) com legenda como STRING
INSERT INTO recurso (id, tipo, url, legenda, conteudo_id) VALUES (1, 'video', 'https://www.youtube.com/watch?v=DE8qVfNW5B0', 'Os pronomes (pronouns) são ferramentas essenciais no inglês, funcionando como "atalhos" ou substitutos para os substantivos (nomes de pessoas, coisas e lugares). O principal objetivo deles é evitar a repetição, tornando a comunicação mais fluida e natural. Por exemplo, em vez de dizer "Neto ama o projeto do Neto", usamos "Ele ama o seu projeto". Existem diferentes tipos, como os pronomes de sujeito, que praticam a ação (I, you, he, she, it, we, they), e os de objeto, que a recebem (me, you, him, her, it, us, them). O vídeo em nosso conteúdo explora isso de uma forma muito divertida, através de uma piada clássica onde a confusão se instala porque os nomes dos personagens são, na verdade, pronomes como "Who" (Quem), mostrando na prática como eles são centrais e, às vezes, traiçoeiros na linguagem.', 1);

INSERT INTO recurso (id, tipo, url, legenda, conteudo_id) VALUES (4, 'video', 'https://www.youtube.com/watch?v=nvVdIJ0las0', 'O Present Simple é um dos tempos verbais mais fundamentais do inglês, usado para expressar fatos, verdades universais, hábitos e rotinas do dia a dia. Sua conjugação é bem direta para a maioria dos pronomes, como I, you, we e they, que simplesmente utilizam o verbo em sua forma base, como em "I work here". A principal regra a se atentar é na terceira pessoa do singular (he, she, it), onde geralmente se adiciona um -s ao final do verbo, por exemplo: "She works here". Uma exceção importante a esta regra é o verbo to have (ter), que possui uma forma irregular e se torna has para he, she ou it, como na frase "He has a car". Dominar essa simples regra do "-s" e o uso de "has" é o passo crucial para utilizar o Present Simple com naturalidade e correção.', 2);

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

INSERT INTO recurso (id, tipo, url, legenda, conteudo_id) VALUES (3, 'musica', 'https://www.youtube.com/watch?v=ELlLIwhvknk', 'Your day breaks, your mind aches
You find that all her words of kindness linger on
When she no longer needs you

She wakes up, she makes up
She takes her time and doesn''t feel she has to hurry
She no longer needs you

And in her eyes, you see nothing
No sign of love behind the tears
Cried for no one
A love that should have lasted years

You want her, you need her
And yet you don''t believe her when she says her love is dead
You think she needs you

And in her eyes, you see nothing
No sign of love behind the tears
Cried for no one
A love that should have lasted years

You stay home, she goes out
She says that long ago she knew someone but now he''s gone
She doesn''t need him

Your day breaks, your mind aches
There will be times when all the things she said will fill your head
You won''t forget her', 2);


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

INSERT INTO quiz (id, titulo, certa, conteudo_id) VALUES (3, 'Qual a forma correta do verbo "to have" na terceira pessoa do singular (he/she/it)?', 'has', 2);
INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (3, 'have');
INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (3, 'hav');
INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (3, 'having');

INSERT INTO quiz (id, titulo, certa, conteudo_id) VALUES (4, 'Na frase "They ____ (play) soccer every Saturday", qual a forma correta do verbo?', 'play', 2);
INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (4, 'plays');
INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (4, 'playing');
INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (4, 'played');
