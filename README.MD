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
- [x] RF06 - Permitir visualizar os detalhes de um pet
- [x] RF07 - Permitir listar os requisitos de um pet
- [x] RF08 - Permitir associar múltiplos requisitos a um pet
- [x] RF09 - Permitir buscar pets por cidade
- [x] RF10 - Exibir informações da ORG responsável pelo pet para contato

---

## ⚙️ Regras de Negócio (RN)

- [x] RN01 - A cidade é obrigatória para listagem de pets
- [x] RN02 - Todos os pets devem estar vinculados a uma ORG
- [x] RN03 - Uma ORG deve possuir:
  - [x] endereço
  - [x] número de WhatsApp
- [ ] RN04 - O contato para adoção deve ser feito diretamente com a ORG via WhatsApp
- [ ] RN05 - Apenas ORGs autenticadas podem cadastrar pets
- [x] RN06 - Os filtros de pets são opcionais, exceto cidade
- [x] RN07 - Um pet pode possuir múltiplos requisitos
- [x] RN08 - Requisitos podem ser reutilizados entre diferentes pets
- [x] RN09 - Uma ORG pode cadastrar múltiplos pets
- [x] RN10 - Um pet deve possuir informações obrigatórias:
  - [x] nome
  - [x] idade
  - [x] porte
  - [x] nível de energia
  - [x] nível de independência
  - [x] ambiente
- [ ] RN11 - O sistema não realiza intermediação da adoção (apenas conecta usuário à ORG)

---

## 🚀 Requisitos Não Funcionais (RNF)

- [x] RNF01 - A API deve ser desenvolvida em Node.js
- [ ] RNF02 - Utilizar PostgreSQL como banco de dados
- [x] RNF03 - Utilizar Prisma como ORM
- [ ] RNF04 - A API deve seguir padrão REST
- [x] RNF05 - Os dados devem ser persistidos de forma relacional
- [x] RNF06 - O sistema deve garantir integridade relacional (FK entre Pet e Org)
- [ ] RNF07 - A autenticação deve ser segura (ex: JWT)
- [x] RNF08 - As senhas devem ser armazenadas com hash (ex: bcrypt)
- [ ] RNF09 - O sistema deve permitir escalabilidade para múltiplas ORGs
- [ ] RNF10 - O tempo de resposta das requisições deve ser rápido (< 500ms ideal)
- [ ] RNF11 - O sistema deve ser preparado para deploy (ex: Docker)
- [ ] RNF12 - O código deve seguir boas práticas de organização e separação de responsabilidades
- [ ] RNF13 - A API deve permitir fácil integração com front-end ou mobile

---

## 📚 Casos de Uso (UC)

- [x] UC01 - Cadastrar ORG
- [x] UC02 - Autenticar ORG
- [x] UC03 - Cadastrar Pet vinculado a uma ORG
- [x] UC04 - Buscar pets por cidade com filtros opcionais
- [x] UC05 - Visualizar detalhes de um pet
- [x] UC06 - Listar requirements de um pet
- [x] UC07 - Associar requirements a um pet
- [ ] UC08 - Exibir informações da ORG responsável pelo pet para contato
