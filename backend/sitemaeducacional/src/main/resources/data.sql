-- Inserts para a tabela NIVEL
INSERT INTO nivel (id, codigo, descricao) VALUES (1, 'N001', 'Básico');
INSERT INTO nivel (id, codigo, descricao) VALUES (2, 'N002', 'Intermediário');
INSERT INTO nivel (id, codigo, descricao) VALUES (3, 'N003', 'Avançado');

-- Inserts para a tabela TEMA
INSERT INTO tema (id, nome) VALUES (1, 'Viagens e Turismo');
INSERT INTO tema (id, nome) VALUES (2, 'Comida e Culinária');
INSERT INTO tema (id, nome) VALUES (3, 'Trabalho e Carreira');

-- Inserts para a tabela USUARIO
INSERT INTO usuario (id, nome, email, senha) VALUES (1, 'Neto Entusiasta', 'neto@email.com', 'senha123');
INSERT INTO usuario (id, nome, email, senha) VALUES (2, 'Maria Estudiosa', 'maria@email.com', 'senha456');

-- Inserts para a tabela PALAVRA
INSERT INTO palavra (id, termo, traducao, etimologia, significado) VALUES (1, 'Hello', 'Olá', 'Origem: Old English "hālōw"', 'Uma saudação comum.');
INSERT INTO palavra (id, termo, traducao, etimologia, significado) VALUES (2, 'Food', 'Comida', 'Origem: Old English "fōda"', 'Qualquer substância nutritiva.');
INSERT INTO palavra (id, termo, traducao, etimologia, significado) VALUES (3, 'Work', 'Trabalho', 'Origem: Old English "weorc"', 'Atividade envolvendo esforço mental ou físico.');

-- Inserts para a tabela CONTEUDO
-- (nivel_id e tema_id referenciam os IDs inseridos acima)
INSERT INTO conteudo (id, nome, nivel_id, tema_id) VALUES (1, 'Introdução: Saudações Básicas', 1, 1);
INSERT INTO conteudo (id, nome, nivel_id, tema_id) VALUES (2, 'Pedindo Comida em um Restaurante', 1, 2);
INSERT INTO conteudo (id, nome, nivel_id, tema_id) VALUES (3, 'Vocabulário de Viagem Essencial', 2, 1);
INSERT INTO conteudo (id, nome, nivel_id, tema_id) VALUES (4, 'Entrevista de Emprego em Inglês', 3, 3);

-- Inserts para a tabela RECURSO
-- (conteudo_id referencia o ID de CONTEUDO. Pode ser NULL se o recurso não for diretamente de um conteúdo geral)
INSERT INTO recurso (id, tipo, url, legenda, conteudo_id) VALUES (1, 'VIDEO', 'https://example.com/video_saudacoes.mp4', TRUE, 1);
INSERT INTO recurso (id, tipo, url, legenda, conteudo_id) VALUES (2, 'AUDIO', 'https://example.com/audio_restaurante.mp3', TRUE, 2);
INSERT INTO recurso (id, tipo, url, legenda, conteudo_id) VALUES (3, 'TEXTO', 'https://example.com/artigo_viagem.txt', FALSE, 3);
INSERT INTO recurso (id, tipo, url, legenda, conteudo_id) VALUES (4, 'IMAGEM', 'https://example.com/imagem_escritorio.jpg', FALSE, 4);
INSERT INTO recurso (id, tipo, url, legenda, conteudo_id) VALUES (5, 'VIDEO', 'https://example.com/video_vocab_comida.mp4', TRUE, 2); -- Recurso adicional para conteúdo 2

-- Inserts para a tabela QUIZ (Questão de Múltipla Escolha)
-- (conteudo_id referencia CONTEUDO, recurso_id pode referenciar RECURSO ou ser NULL)
INSERT INTO quiz (id, titulo, descricao, certa, conteudo_id, recurso_id) VALUES (1, 'Qual a tradução de "Hello"?', 'Escolha a alternativa correta.', 'Olá', 1, 1);
INSERT INTO quiz (id, titulo, descricao, certa, conteudo_id, recurso_id) VALUES (2, 'Como se diz "Please" em português?', 'Tradução de cortesia.', 'Por favor', 1, NULL);
INSERT INTO quiz (id, titulo, descricao, certa, conteudo_id, recurso_id) VALUES (3, 'O que significa "Menu"?', 'Item comum em restaurantes.', 'Cardápio', 2, 5);

-- Inserts para a tabela quiz_alternativas_erradas (ElementCollection de Quiz)
-- (quiz_id referencia o ID de QUIZ)
INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (1, 'Adeus');
INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (1, 'Bom dia');
INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (1, 'Obrigado');

INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (2, 'Com licença');
INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (2, 'Desculpe');
INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (2, 'Sim');

INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (3, 'Conta');
INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (3, 'Garçom');
INSERT INTO quiz_alternativas_erradas (quiz_id, alternativa_errada) VALUES (3, 'Sobremesa');


-- Inserts para a tabela PERGUNTA (Questão Aberta)
-- (key_field1 é o "Key Field" do teu diagrama)
INSERT INTO pergunta (id, texto, key_field1, conteudo_id, recurso_id) VALUES (1, 'Escreva uma frase em inglês para se apresentar.', 'frase_apresentacao', 1, NULL);
INSERT INTO pergunta (id, texto, key_field1, conteudo_id, recurso_id) VALUES (2, 'Como você pediria um copo d''água em um restaurante em inglês?', 'pedido_agua', 2, 2);
INSERT INTO pergunta (id, texto, key_field1, conteudo_id, recurso_id) VALUES (3, 'Liste 3 itens que você levaria em uma viagem internacional.', 'itens_viagem', 3, 3);

-- Inserts para as tabelas de junção (ManyToMany de Usuario)
-- USUARIO_CONTEUDOS_APRENDIDOS
INSERT INTO usuario_conteudos_aprendidos (usuario_id, conteudo_id) VALUES (1, 1); -- Neto aprendeu Conteudo 1
INSERT INTO usuario_conteudos_aprendidos (usuario_id, conteudo_id) VALUES (2, 1); -- Maria aprendeu Conteudo 1
INSERT INTO usuario_conteudos_aprendidos (usuario_id, conteudo_id) VALUES (2, 2); -- Maria aprendeu Conteudo 2

-- USUARIO_NIVEIS_COMPLETOS
INSERT INTO usuario_niveis_completos (usuario_id, nivel_id) VALUES (1, 1); -- Neto completou Nivel Básico

-- USUARIO_QUIZ_FEITO
INSERT INTO usuario_quiz_feito (usuario_id, quiz_id) VALUES (1, 1); -- Neto fez o Quiz 1
INSERT INTO usuario_quiz_feito (usuario_id, quiz_id) VALUES (1, 2); -- Neto fez o Quiz 2

-- USUARIO_PERGUNTA_FEITA
INSERT INTO usuario_pergunta_feita (usuario_id, pergunta_id) VALUES (1, 1); -- Neto respondeu a Pergunta 1

-- USUARIO_RECURSO_FEITO (Supondo que "feito" significa que o usuário interagiu/visualizou)
INSERT INTO usuario_recurso_feito (usuario_id, recurso_id) VALUES (1, 1); -- Neto viu o Recurso 1

-- USUARIO_PALAVRAS_APRENDIDAS
INSERT INTO usuario_palavras_aprendidas (usuario_id, palavra_id) VALUES (1, 1); -- Neto aprendeu "Hello"
INSERT INTO usuario_palavras_aprendidas (usuario_id, palavra_id) VALUES (1, 2); -- Neto aprendeu "Food"
INSERT INTO usuario_palavras_aprendidas (usuario_id, palavra_id) VALUES (2, 1); -- Maria aprendeu "Hello"