# finapi

Projeto desenvolvido durante o ignite da @Rocketseat.

## Requisitos

- [X] Deve ser possível criar uma conta
    *A conta deve possuir os seguintes dados*:
    - [X] CPF deverá ser unico
    - [X] Nome do cliente
    - [X] ID que deverá ser um universal unique identifier
    - [X] Statement que deverá receber os dados de debito da conta
- [X] Deve ser possível buscar o extrato bancário do cliente
- [X] Deve ser possível realizar um depósito 
- [ ] Deve ser possível realizar um saque
- [ ] Deve ser possível buscar o extrato bancário do cliente por data
- [ ] Deve ser possível atualizar dados da conta do cliente
- [ ] Deve ser possível deletar uma conta

## Regras de negócio

- [X] Não deve ser possível fazer depósito em uma conta não existente
- [X] Não deve ser possível buscar extrato em uma conta não existente
- [X] Não deve ser possível realizar depósito em conta não existente
- [ ] Não deve ser possível fazer saque em uma conta não existente
- [ ] Não deve ser possível excluir uma conta não existente
- [ ] Não deve ser possível fazer saque quando o saldo for insuficiente