# 📌 Documentação de Requisitos — Find a Friend API

## ✅ Requisitos Funcionais (RF)

- [x] RF01 - Permitir o cadastro de uma organização (ORG)
- [x] RF02 - Permitir o login de uma organização
- [x] RF03 - Permitir o cadastro de um pet vinculado a uma ORG
- [x] RF04 - Permitir listar todos os pets disponíveis para adoção em uma cidade
- [x] RF05 - Permitir filtrar pets por características:
  - [x] idade
  - [x] porte
  - [x] nível de energia
  - [x] nível de independência
  - [x] ambiente
- [ ] RF06 - Permitir visualizar os detalhes de um pet
- [ ] RF07 - Permitir listar os requisitos de um pet
- [ ] RF08 - Permitir associar múltiplos requisitos a um pet
- [ ] RF09 - Permitir buscar pets por cidade
- [ ] RF10 - Exibir informações da ORG responsável pelo pet para contato

---

## ⚙️ Regras de Negócio (RN)

- [ ] RN01 - A cidade é obrigatória para listagem de pets
- [ ] RN02 - Todos os pets devem estar vinculados a uma ORG
- [ ] RN03 - Uma ORG deve possuir:
  - [ ] endereço
  - [ ] número de WhatsApp
- [ ] RN04 - O contato para adoção deve ser feito diretamente com a ORG via WhatsApp
- [ ] RN05 - Apenas ORGs autenticadas podem cadastrar pets
- [ ] RN06 - Os filtros de pets são opcionais, exceto cidade
- [ ] RN07 - Um pet pode possuir múltiplos requisitos
- [ ] RN08 - Requisitos podem ser reutilizados entre diferentes pets
- [ ] RN09 - Uma ORG pode cadastrar múltiplos pets
- [ ] RN10 - Um pet deve possuir informações obrigatórias:
  - [ ] nome
  - [ ] idade
  - [ ] porte
  - [ ] nível de energia
  - [ ] nível de independência
  - [ ] ambiente
- [ ] RN11 - O sistema não realiza intermediação da adoção (apenas conecta usuário à ORG)

---

## 🚀 Requisitos Não Funcionais (RNF)

- [ ] RNF01 - A API deve ser desenvolvida em Node.js
- [ ] RNF02 - Utilizar PostgreSQL como banco de dados
- [ ] RNF03 - Utilizar Prisma como ORM
- [ ] RNF04 - A API deve seguir padrão REST
- [ ] RNF05 - Os dados devem ser persistidos de forma relacional
- [ ] RNF06 - O sistema deve garantir integridade relacional (FK entre Pet e Org)
- [ ] RNF07 - A autenticação deve ser segura (ex: JWT)
- [ ] RNF08 - As senhas devem ser armazenadas com hash (ex: bcrypt)
- [ ] RNF09 - O sistema deve permitir escalabilidade para múltiplas ORGs
- [ ] RNF10 - O tempo de resposta das requisições deve ser rápido (< 500ms ideal)
- [ ] RNF11 - O sistema deve ser preparado para deploy (ex: Docker)
- [ ] RNF12 - O código deve seguir boas práticas de organização e separação de responsabilidades
- [ ] RNF13 - A API deve permitir fácil integração com front-end ou mobile