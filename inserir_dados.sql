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

INSERT INTO estado_pedido (id, descricao, icon, cor, obs) VALUES
(1,     'Pendente',  'bi-envelope',                 'warning',  'O cliente que criou este pedido ainda não obteve uma resposta da nossa parte.'),
(2,     'Enviado',   'bi-envelope-paper-heart',     'primary',  'Já houve contacto com o cliente que criou este pedido, e aguarda-se uma conclusão (aceite/recusado)'),
(3,     'Aceite',    'bi-arrow-through-heart-fill', 'teal',     'O cliente aceitou o orçamento enviado.'),
(4,     'Recusado',  'bi-heartbreak-fill',          'danger',   'O cliente recusou o orçamento enviado. ');

INSERT INTO motivo_recusa_pedido (id, descricao, obs) VALUES
(1,     'Preço Elevado',                    ''),
(2,     'Preferiu a concorrência',          ''),
(3,     'Não era o que estava à espera',    ''),
(4,     'Outro',                            '');

/***************************************** Fim Estado de Pedido + Motivo de Recusa *****************************************/

/***************************************** Pedidos *****************************************/

INSERT INTO pedido (id, cliente_id, valor_total, estado_id, motivo_id, created_at, updated_at) VALUES
(1, 1, 234.5, 1, null,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 345.6, 2, null,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 3, 456.7, 3, null,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 4, 567.8, 4, 1,     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

/***************************************** Fim Pedidos *****************************************/

/**************************************** formulario ********************************************************/
INSERT INTO formulario (id, titulo, descricao, created_at, updated_at)  VALUES 
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


/**************************************** tipo de pergunta ***********************************************/
INSERT INTO tipo_pergunta (id, titulo, obs) VALUES
(1, 'checkbox',  ''),
(2, 'radio',     ''),
(3, 'card',      ''),
(4, 'text',      ''),
(5, 'array',     ''),
(6, 'slider',    '');
/**************************************** fim tipo de pergunta ***********************************************/

INSERT INTO pergunta (id, grupo_id, valor_unitario, tipo_id, created_at, updated_at, titulo, descricao) VALUES 
/***************************************** Perguntas Landing Page ***********************************/
/*Extras*/
(1, 1,   12.3, 1,    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Deseja comprar um dominio?',        'O domínio é a url do seu site. (www.oseusite.pt)'),
(2, 1,   12.3, 1,    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Pretende obter hospedagem?',        'A hospedagem é o local onde o seu site é guardado'),
(3, 1,   12.3, 1,    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Deseja a criação dum portfolio?',   'Caso tenha trabalhos anterioes que queira mostrar um portfolio é a melhor opção para tal'),
(4, 1,   12.3, 1,    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Ja possui conteudos textuais?',     'Já possui os textos que iram aparecer no site para falar sobre o seu negocio'),

/****************************************** Perguntas Site Institucional ******************************************/
/*Quantas Paginas pretende*/
(5, 2,   12.3, 4,        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Quantas páginas pretende?',          'Pense em páginas como em categorias diferentes. Por exemplo se tiver um restaurante, pode ter páginas diferentes para o takeaway, reserva de lugares, etc.'),
/*Extras*/
(6, 3,   12.3, 1,    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Deseja comprar um dominio?',        'O domínio é a url do seu site. (www.oseusite.pt)'),
(7, 3,   12.3, 1,    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Pretende obter alojamento?',        'O alojamento é o local onde o seu site é guardado '),
(8, 3,   12.3, 1,    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Deseja a criação dum portfolio?',   'Caso tenha trabalhos anterioes que queira mostrar, um portfolio é a melhor opção para tal'),
(9, 3,   12.3, 1,    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Ja possui conteudos textuais?',     'Já possui os textos que iram aparecer no site para falar sobre o seu negocio'),

/****************************************** Loja Online ******************************************/
/*Quantas Paginas pretende*/
(13, 5,  12.3, 4,       CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Quantas páginas pretende?', 'Pense em páginas como em categorias diferentes. Por exemplo se tiver um restaurante, pode ter páginas diferentes para o takeaway, reserva de lugares, etc.'),
/*Extras*/
(14, 6,  12.3, 1,   CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Deseja comprar um dominio?', 'O domínio é a url do seu site. (www.oseusite.pt)'),
(15, 6,  12.3, 1,   CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Pretende obter alojamento?', 'O alojamento é o local onde o seu site é guardado '),
(16, 6,  12.3, 1,   CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Deseja a criação dum portfolio?', 'Caso tenha trabalhos anterioes que queira mostrar, um portfolio é a melhor opção para tal'),
(17, 6,  12.3, 1,   CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Ja possui conteudos textuais?', 'Já possui os textos que iram aparecer no site para falar sobre o seu negocio'),

/****************************************** Hibrido ******************************************/
/*Quantas Paginas pretende*/
(18, 8,  12.3, 4,       CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Quantas páginas pretende?', 'Pense em páginas como em categorias diferentes. Por exemplo se tiver um restaurante, pode ter páginas diferentes para o takeaway, reserva de lugares, etc.'),
/*Extras*/
(19, 9,  12.3, 1,   CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Deseja comprar um dominio?', 'O domínio é a url do seu site. (www.oseusite.pt)'),
(20, 9,  12.3, 1,   CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Pretende obter alojamento?', 'O alojamento é o local onde o seu site é guardado '),
(21, 9,  12.3, 1,   CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Deseja a criação dum portfolio?', 'Caso tenha trabalhos anterioes que queira mostrar, um portfolio é a melhor opção para tal'),
(22, 9,  12.3, 1,   CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Ja possui conteudos textuais?', 'Já possui os textos que iram aparecer no site para falar sobre o seu negocio'),

/*************************************** Criação Identidade Visual **********************************/
/*Que tipo de logo prefere*/
(23, 11, 12.3, 3,       CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Logótipo', 'Constituído apenas por texto, ótimo para quem quer ser conhecido pelo nome do seu negócio.'),
(24, 11, 12.3, 3,       CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Isótipo', 'Apenas um ícone, recomendado a empresas com um forte reconhecimento de marca.'),
(25, 11, 12.3, 3,       CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Isólogo', 'O texto e o ícone são agrupados num só e funcionam melhor juntos.'),
(26, 11, 12.3, 3,       CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Imagotipo', 'O texto e o ícone estão juntos mas podem ser usados em separado. A opção mais versátil!'),
/*Adora o logo de alguma marca*/
(27, 12, 12.3, 4,       CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Adora o logo de alguma marca?', 'Existe alguma marca que adora simplesmente pelo seu design? Algum logo que acha genial? Diga-nos qual! Os nossos designers vão usar as suas referências como inspiração para a criação da sua identidade visual. Pode adicionar quantas referências quiser!'),
/*Que cores não podem faltar no seu logo?*/
(28, 13, 12.3, 1,   CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Cores quentes', 'Vermelho, laranja, amarelo'),
(29, 13, 12.3, 1,   CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Cores frias', 'Azul, roxo, verde'),
(30, 13, 12.3, 1,   CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Escala de cinza', 'Preto, branco, e todas as variações de cinzento'),
/*alguns detalhes...*/
(31, 14, 12.3, 1,   CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Análise da Concorrência', 'Um estudo das empresas do mesmo ramo.'),
(32, 14, 12.3, 1,   CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Manual de Normas Gráficas', 'Um documento onde estão um conjunto de regras de aplicação do logótipo.'),
(33, 14, 12.3, 1,   CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Estacionário', 'Cartas, cartões e envelopes timbrados com a sua marca.'),

/*************************************** Gestão Redes Sociais *******************************************/
/*Escolha a Sua Rede Social*/
/*Facebook*/
(34, 16, 12.3, 1,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Rede Social', 'Escolha a Sua Rede Social'),
(35, 17, 12.3, 6,    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Personaliza as tuas preferências', 'Número de publicações semanais'),
(36, 17, 12.3, 6,    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Personaliza as tuas preferências', 'Stories Diários'),
/*Instagram*/
(37, 17, 12.3, 6,    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Personaliza as tuas preferências', 'Número de publicações semanais'),
(38, 17, 12.3, 6,    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Personaliza as tuas preferências', 'Stories Diários'),
(39, 17, 12.3, 6,    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Personaliza as tuas preferências', 'Reals'),
/*Twitter*/
(40, 17, 12.3, 6,    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Personaliza as tuas preferências', 'Tweets'),
(41, 17, 12.3, 6,    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Personaliza as tuas preferências', 'Stories Diários'),
/*Youtube*/
(42, 17, 12.3, 6,    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Personaliza as tuas preferências', 'Videos por semana'),
/*Requisitos*/
(43, 18, 12.3, 1,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Requisitos', 'Pretende que as publicações tenham horários específicos?'),
(44, 18, 12.3, 1,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Requisitos', 'Pretende publicitar as suas outras redes numa das acima?'),
(45, 18, 12.3, 1,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Requisitos', 'Quer ter apoio profissional para rever as suas escolhas?'),
(46, 18, 12.3, 1,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Requisitos', 'Pretende ter Copywriting?'),
(47, 18, 12.3, 1,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Requisitos', 'Pretende ter planificação editorial?'),
(48, 18, 12.3, 1,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Requisitos', 'Pretende receber um relatório mensal?'),
(49, 18, 12.3, 1,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Requisitos', 'Está interessado em ter gestão de campanhas?'),
/*Adicionar rede social?*/ 
(50, 19, 12.3, 1,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Rede Social', 'Deseja adicionar outra Rede Social?');



-- UPDATE SEQUENCIAS
ALTER SEQUENCE user_incommun_role_id_seq RESTART WITH 6;
ALTER SEQUENCE cliente_id_seq RESTART WITH 11;
ALTER SEQUENCE estado_pedido_id_seq RESTART WITH 5;
ALTER SEQUENCE motivo_recusa_pedido_id_seq RESTART WITH 5;
ALTER SEQUENCE pedido_id_seq RESTART WITH 5;
ALTER SEQUENCE formulario_id_seq RESTART WITH 6;
ALTER SEQUENCE grupo_id_seq RESTART WITH 20;
ALTER SEQUENCE tipo_pergunta_id_seq RESTART WITH 7;
ALTER SEQUENCE pergunta_id_seq RESTART WITH 51;