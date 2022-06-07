/***************************************************************OPERAÇÔES SQL***************************************************************/
/*
20 operações
delete - 
insert - 3
update - 
select - 5
*/

/**************************LISTA DE OPERAÇÕES**************************/

/*****INSERT*****/
/*1.1 Inserir um Cliente*/
INSERT INTO cliente (id, nome, email, empresa, tlm, created_at, updated_at) VALUES

/*1.2 Inserir um utilizador da incommun*/
INSERT INTO user_incommun_role (id, descricao, obs) VALUES

/*1.3 Inserir novo pedido*/
INSERT INTO pedido (id, cliente_id, valor_total, estado_id, motivo_id, created_at, updated_at) VALUES

/*****SELECT*****/
/*2.1 Consulta que devolve o numero total de pedidos (orçamentos) */
select SUM (id) as "Total de Orçamentos" from pedido

/*2.2 Consulta que devolve o numero total de pedidos (orçamentos) pendentes */
select SUM (id) as "Orçamentos Pendentes" from pedido
where estado_id = 1

/*2.3 Consulta que devolve o numero total de pedidos (orçamentos) aceites */
select SUM (id) as "Orçamentos Aceites" from pedido
where estado_id = 3

/*2.4 Consulta que devolve o numero total de pedidos (orçamentos) recusados */
select SUM (id) as "Orçamentos Recusados" from pedido
where estado_id = 4

/*2.5 Consulta que devolve o numero total de pedidos (orçamentos) enviados */
select SUM (id) as "Orçamentos Enviados" from pedido
where estado_id = 2

/*****UPDATE*****/
/*3.1 Atualizar valor unitário de pergunta*/
SELECT * FROM pergunta 

UPDATE pergunta
SET valor_unitario;

/*3.2 */


/*****DELETE*****/
/*4.1 */

/************************************************************* FIM OPERAÇÔES SQL *************************************************************/