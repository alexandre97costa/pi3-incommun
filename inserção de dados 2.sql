/************************************ USERS INCOMMUN *******************************************/
INSERT INTO user_incommun_role (id, descricao, obs) VALUES
(1, 'Admin',    'Pode ver e editar pedidos, pode ver e editar preços, pode criar novos formulários.'),
(2, 'Editor',   'Pode ver e editar pedidos.');

-- Os utilizadores têm que ser criados através de sequelize
-- para que seja guardada uma hash no campo password

/********************************** Fim USERS INCOMMUN *****************************************/

/************************************ Cliente *******************************************/
INSERT INTO cliente (id, nome, email, empresa, tlm, created_at, updated_at) VALUES 
(1, 'João Almeida',     'joaoalmeida@email.pt',     'Joao Almeida Lda',     911222333, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Manuel Jorge',     'mjorge@email.pt',          'Manuel&Jorge Lda',     933455455, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Joana Ferreira',   'joanaferreira@email.pt',   'JF Lda',               966965967, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Fernando Sousa',   'fsousa@email.pt',          'F Sousa Lda',          919191919, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Maria Oliveira',   'oliveiram@email.pt',       'Maria Oliveira Lda',   933339912, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Alberto Ramos',    'ramosalberto@email.pt',    'Ramos Lda',            922122333, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Jorge Marques',    'mjorge@email.pt',          'JorgeM Lda',           911999000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Manuel Teixeira',  'teixeira@email.pt',        'ManuelTeixeira Lda',   911222333, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'José Almeida',     'joseal@email.pt',          'José Almeida Lda',     911242567, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10,'Rita Marques',     'rita.marques@email.pt',    'Rita Marques Lda',     922333699, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

/***************************************** Fim clientes *****************************************/

/***************************************** Estado de Pedido + Motivo de Recusa *****************************************/

INSERT INTO estado_pedido (id, descricao, obs) VALUES
(1,     'Pendente',  'O cliente que criou este pedido ainda não obteve uma resposta da nossa parte.'),
(2,     'Enviado',   'Já houve contacto com o cliente que criou este pedido, e aguarda-se uma conclusão (aceite/recusado)'),
(3,     'Aceite',    'O cliente aceitou o orçamento enviado.'),
(4,     'Recusado',  'O cliente recusou o orçamento enviado. ');

INSERT INTO motivo_recusa_pedido (id, descricao, obs) VALUES
(1,     'Preço Elevado',                    ''),
(2,     'Preferiu a concorrência',          ''),
(3,     'Não era o que estava à espera',    ''),
(4,     'Outro',                            '');

/***************************************** Fim Estado de Pedido + Motivo de Recusa *****************************************/

/***************************************** Pedidos *****************************************/

INSERT INTO pedido (id, cliente_id, preco_total, estado_id, motivo_id, created_at, updated_at) VALUES
(1, 1, 234.5, 1, null,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 345.6, 2, null,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 3, 456.7, 3, null,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 4, 567.8, 4, 1,     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

/***************************************** Fim Pedidos *****************************************/

/**************************************** formulario ********************************************************/
INSERT INTO formulario (id, nome, descricao, created_at, updated_at)  VALUES 
(1, 'Criação de Website Institucional', 'Descrição Criação de Website Institucional',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP  ),
(2, 'Criação de Loja Online',           'Descrição Criação de Loja Online',            CURRENT_TIMESTAMP, CURRENT_TIMESTAMP  ),
(3, 'Criação de Website Hibrido',       'Descrição Criação de Website Hibrido',        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP  ),
(4, 'Criação de Identidade Visual',     'Descrição Criação de Identidade Visual',      CURRENT_TIMESTAMP, CURRENT_TIMESTAMP  ),
(5, 'Gestão de Redes Sociais',          'Descrição Gestão de Redes Sociais',           CURRENT_TIMESTAMP, CURRENT_TIMESTAMP  );

/**************************************** fim formulario *****************************************************/



/**************************************** grupo_perguntas ***************************************************/

INSERT INTO grupo (id, formulario_id, titulo, created_at, updated_at) VALUES
(1, 1, 'Perguntas Landing Page',               CURRENT_TIMESTAMP, CURRENT_TIMESTAMP ),
(2, 1, 'Perguntas Site Institucional',         CURRENT_TIMESTAMP, CURRENT_TIMESTAMP ),
(3, 1, 'Extras',                               CURRENT_TIMESTAMP, CURRENT_TIMESTAMP ),
(5, 2, 'Quantas Páginas Pretende',             CURRENT_TIMESTAMP, CURRENT_TIMESTAMP ),
(6, 2, 'Extras',                               CURRENT_TIMESTAMP, CURRENT_TIMESTAMP ),
(8, 3, 'Quantas Páginas Pretende',             CURRENT_TIMESTAMP, CURRENT_TIMESTAMP ),
(9, 3, 'Extras',                               CURRENT_TIMESTAMP, CURRENT_TIMESTAMP ),
(11, 4, 'Que tipo de logo prefere?' ,          CURRENT_TIMESTAMP, CURRENT_TIMESTAMP ),
(12, 4, 'Adora o logo de alguma marca?' ,      CURRENT_TIMESTAMP, CURRENT_TIMESTAMP ),
(13, 4, 'Que cores é que não podem faltar?' ,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP ),
(14, 4, 'Só mais alguns detalhes...' ,         CURRENT_TIMESTAMP, CURRENT_TIMESTAMP ),
(16, 5, 'Escolha a Rede Social',               CURRENT_TIMESTAMP, CURRENT_TIMESTAMP ),
(17, 5, 'Personaliza as tuas preferências',    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP ),
(18, 5, 'Requisitos',                          CURRENT_TIMESTAMP, CURRENT_TIMESTAMP ),
(19, 5, 'Adicionar Rede Social',               CURRENT_TIMESTAMP, CURRENT_TIMESTAMP );


/**************************************** fim grupo_perguntas ***********************************************/


/***************************************** Perguntas Landing Page ***********************************/
/*Extras*/

INSERT INTO pergunta (created_at, updated_at, id, grupo_id, texto, descricao, preco, tipo) VALUES 
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, 'Deseja comprar um dominio?',        'O domínio é a url do seu site. (www.oseusite.pt)', 10.5, 'checkbox'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1, 'Pretende obter hospedagem?',        'A hospedagem é o local onde o seu site é guardado', 10.5, 'checkbox'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 3, 1, 'Deseja a criação dum portfolio?',   'Caso tenha trabalhos anterioes que queira mostrar um portfolio é a melhor opção para tal', 10.5, 'checkbox'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 4, 1, 'Ja possui conteudos textuais?',     'Já possui os textos que iram aparecer no site para falar sobre o seu negocio', 10.5, 'checkbox'),

/****************************************** Perguntas Site Institucional ******************************************/
/*Quantas Paginas pretende*/
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 5, 2, 'Quantas páginas pretende?', 'Pense em páginas como em categorias diferentes. Por exemplo se tiver um restaurante, pode ter páginas diferentes para o takeaway, reserva de lugares, etc.', 10.5, 'text'),
/*Extras*/
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 6, 3, 'Deseja comprar um dominio?',        'O domínio é a url do seu site. (www.oseusite.pt)', 10.5, 'checkbox'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 7, 3, 'Pretende obter alojamento?',        'O alojamento é o local onde o seu site é guardado ', 10.5, 'checkbox'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 8, 3, 'Deseja a criação dum portfolio?',   'Caso tenha trabalhos anterioes que queira mostrar, um portfolio é a melhor opção para tal', 10.5, 'checkbox'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 9, 3, 'Ja possui conteudos textuais?',     'Já possui os textos que iram aparecer no site para falar sobre o seu negocio', 10.5, 'checkbox'),

/****************************************** Loja Online ******************************************/
/*Quantas Paginas pretende*/
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 13, 5, 'Quantas páginas pretende?', 'Pense em páginas como em categorias diferentes. Por exemplo se tiver um restaurante, pode ter páginas diferentes para o takeaway, reserva de lugares, etc.', 10.5, 'text'),
/*Extras*/
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 14, 6, 'Deseja comprar um dominio?', 'O domínio é a url do seu site. (www.oseusite.pt)', 10.5, 'checkbox'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 15, 6, 'Pretende obter alojamento?', 'O alojamento é o local onde o seu site é guardado ', 10.5, 'checkbox'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 16, 6, 'Deseja a criação dum portfolio?', 'Caso tenha trabalhos anterioes que queira mostrar, um portfolio é a melhor opção para tal', 10.5, 'checkbox'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 17, 6, 'Ja possui conteudos textuais?', 'Já possui os textos que iram aparecer no site para falar sobre o seu negocio', 10.5, 'checkbox'),

/****************************************** Hibrido ******************************************/
/*Quantas Paginas pretende*/
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 18, 8, 'Quantas páginas pretende?', 'Pense em páginas como em categorias diferentes. Por exemplo se tiver um restaurante, pode ter páginas diferentes para o takeaway, reserva de lugares, etc.', 10.5, 'text'),
/*Extras*/
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 19, 9, 'Deseja comprar um dominio?', 'O domínio é a url do seu site. (www.oseusite.pt)', 10.5, 'checkbox'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 20, 9, 'Pretende obter alojamento?', 'O alojamento é o local onde o seu site é guardado ', 10.5, 'checkbox'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 21, 9, 'Deseja a criação dum portfolio?', 'Caso tenha trabalhos anterioes que queira mostrar, um portfolio é a melhor opção para tal', 10.5, 'checkbox'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 22, 9, 'Ja possui conteudos textuais?', 'Já possui os textos que iram aparecer no site para falar sobre o seu negocio', 10.5, 'checkbox'),

/*************************************** Criação Identidade Visual **********************************/
/*Que tipo de logo prefere*/
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 23, 11, 'Logótipo', 'Constituído apenas por texto, ótimo para quem quer ser conhecido pelo nome do seu negócio.', 1.0, 'card'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 24, 11, 'Isótipo', 'Apenas um ícone, recomendado a empresas com um forte reconhecimento de marca.', 1.0, 'card'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 25, 11, 'Isólogo', 'O texto e o ícone são agrupados num só e funcionam melhor juntos.', 1.0, 'card'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 26, 11, 'Imagotipo', 'O texto e o ícone estão juntos mas podem ser usados em separado. A opção mais versátil!', 1.0, 'card'),
/*Adora o logo de alguma marca*/
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 27, 12, 'Adora o logo de alguma marca?', 'Existe alguma marca que adora simplesmente pelo seu design? Algum logo que acha genial? Diga-nos qual! Os nossos designers vão usar as suas referências como inspiração para a criação da sua identidade visual. Pode adicionar quantas referências quiser!', 1.0, 'text'),
/*Que cores não podem faltar no seu logo?*/
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 28, 13, 'Cores quentes', 'Vermelho, laranja, amarelo', 1.0, 'checkbox'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 29, 13, 'Cores frias', 'Azul, roxo, verde', 1.0, 'checkbox'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 30, 13, 'Escala de cinza', 'Preto, branco, e todas as variações de cinzento', 1.0, 'checkbox'),
/*alguns detalhes...*/
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 31, 14, 'Análise da Concorrência', 'Um estudo das empresas do mesmo ramo.', 1.0, 'checkbox'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 32, 14, 'Manual de Normas Gráficas', 'Um documento onde estão um conjunto de regras de aplicação do logótipo.', 1.0, 'checkbox'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 33, 14, 'Estacionário', 'Cartas, cartões e envelopes timbrados com a sua marca.', 1.0, 'checkbox'),

/*************************************** Gestão Redes Sociais *******************************************/
/*Escolha a Sua Rede Social*/
/*Facebook*/
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 34, 16, 'Rede Social', 'Escolha a Sua Rede Social', 1.0, 'checkbox'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 35, 17, 'Personaliza as tuas preferências', 'Número de publicações semanais', 1.0, 'text'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 36, 17, 'Personaliza as tuas preferências', 'Stories Diários', 1.0, 'text'),
/*Instagram*/
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 37, 17, 'Personaliza as tuas preferências', 'Número de publicações semanais', 1.0, 'text'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 38, 17, 'Personaliza as tuas preferências', 'Stories Diários', 1.0, 'text'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 39, 17, 'Personaliza as tuas preferências', 'Reals', 1.0, 'text'),
/*Twitter*/
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 40, 17, 'Personaliza as tuas preferências', 'Tweets', 1.0, 'text'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 41, 17, 'Personaliza as tuas preferências', 'Stories Diários', 1.0, 'text'),
/*Youtube*/
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 42, 17, 'Personaliza as tuas preferências', 'Videos por semana', 1.0, 'text'),
/*Requisitos*/
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 43, 18, 'Requisitos', 'Pretende que as publicações tenham horários específicos?', 1.0, 'text'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 44, 18, 'Requisitos', 'Pretende publicitar as suas outras redes numa das acima?', 1.0, 'text'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 45, 18, 'Requisitos', 'Quer ter apoio profissional para rever as suas escolhas?', 1.0, 'text'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 46, 18, 'Requisitos', 'Pretende ter Copywriting?', 1.0, 'text'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 47, 18, 'Requisitos', 'Pretende ter planificação editorial?', 1.0, 'text'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 48, 18, 'Requisitos', 'Pretende receber um relatório mensal?', 1.0, 'text'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 49, 18, 'Requisitos', 'Está interessado em ter gestão de campanhas?', 1.0, 'text'),
/*Adicionar rede social?*/ 
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 50, 19, 'Rede Social', 'Deseja adicionar outra Rede Social?', 1.0, 'checkbox');