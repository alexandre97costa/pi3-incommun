/***************************************************************OPERAÇÔES SQL***************************************************************/
/*
20 operações
delete - 
insert - 3
update - 
select - 5
*/

/**************************LISTA DE OPERAÇÕES**************************/

/*1 Inserir um Cliente*/
INSERT INTO cliente (id, nome, email, empresa, tlm, created_at, updated_at) VALUES

/*2 Inserir um utilizador da incommun*/
INSERT INTO user_incommun_role (id, descricao, obs) VALUES

/*3 Inserir novo pedido*/
INSERT INTO pedido (id, cliente_id, valor_total, estado_id, motivo_id, created_at, updated_at) VALUES

/*4 Consulta que devolve o numero total de pedidos (orçamentos) */
select SUM (id) as "Total de Orçamentos" from pedido

/*5 Consulta que devolve o numero total de pedidos (orçamentos) pendentes */
select SUM (id) as "Orçamentos Pendentes" from pedido
where estado_id = 1

/*6 Consulta que devolve o numero total de pedidos (orçamentos) aceites */
select SUM (id) as "Orçamentos Aceites" from pedido
where estado_id = 3

/*7 Consulta que devolve o numero total de pedidos (orçamentos) recusados */
select SUM (id) as "Orçamentos Recusados" from pedido
where estado_id = 4

/*8 Consulta que devolve o numero total de pedidos (orçamentos) enviados */
select SUM (id) as "Orçamentos Enviados" from pedido
where estado_id = 2

/*9 Atualizar o valor unitario para todas as perguntas do grupo 5 em 20% */
SELECT * FROM pergunta 
UPDATE valor_unitario
SET valor_unitario * 1,20 where grupo_id = 5;

/*10 Eliminar pedidos que o estado seja "Recusado" */
SELECT * FROM pedido;
DELETE FROM pedido where estado_id = 4;

/*11 Consulta que devolve o estado do pedido e o valor tutal do cliente que começa o nome pela letra J*/
SELECT estado_id, valor_total FROM pedido
WHERE cliente_id IN 
(SELECT (id) FROM cliente 
WHERE nome LIKE 'a%');

/*12 Consulta que devolve o pedido associado ao cliente com ID 10 com estado Aceite*/
select * from pedido
where cliente_id = 10 and estado_id = 3;

/*13 Consulta que devolve os pedidos com valor ente 500 a 1000€ e foram recusados*/
select * from pedido
where valor_total between '500' and '1000' and estado_id = 4;

/*14 Consulta que devolva o numero total de pedidos recusados com o seu motivo e valor total*/
select SUM id as "Numero Pedidos", motivo_id as "Motivo", valor_total as "Valor Total", estado_id 
from pedido
where estado_id = 4;

/*15 Consulta que devolve o estado do pedido e o valor total do cliente com id 5*/
SELECT estado_id as "Estado", valor_total as "Total" 
FROM pedido
WHERE cliente_id IN 
(SELECT (id) FROM cliente 
WHERE id = 5);

/**/


/************************************************************* FIM OPERAÇÔES SQL *************************************************************/