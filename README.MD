# 📌 Documentação de Requisitos — Find a Friend API

## ✅ Visão Geral

API REST para adoção de animais. O fluxo principal é:
1. ORGs se cadastram e autenticam.
2. ORGs criam pets para adoção.
3. Usuários consultam pets por cidade e filtros.
4. Usuários acessam detalhes do pet e contato da ORG.

---

## 🧰 Tecnologias Utilizadas

- Node.js + TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- Zod (validação)
- JWT + Cookies (auth e refresh)
- Vitest (unit e e2e)
- Docker Compose (banco local)
- TSUP e TSX (build e dev)

---

## 🧱 Arquitetura

O projeto segue uma separação clara por camadas:

- `HTTP (Controllers)` recebe e valida a requisição, chama serviços e retorna resposta
- `Services (Use Cases)` concentra regras de negócio e orquestra repositorios
- `Repositories` definem contratos e implementações (Prisma e In-Memory)
- `Lib/Infra` concentra integrações com Prisma e utilidades
- `Env` valida variáveis de ambiente com Zod
- `Tests` organizados em unitários e e2e

---

## 🗂️ Estrutura de Pastas

| Caminho | Descrição |
| --- | --- |
| `src/app.ts` | Registro de plugins, rotas e tratamento de erros |
| `src/server.ts` | Bootstrap do servidor |
| `src/env/index.ts` | Validação de variáveis de ambiente |
| `src/http/controllers` | Controllers e rotas HTTP |
| `src/http/middlewares` | Middlewares de autenticação |
| `src/services` | Casos de uso (regras de negócio) |
| `src/services/factories` | Injeção de dependências dos serviços |
| `src/repositories` | Contratos e implementações (Prisma/In-Memory) |
| `src/lib/prisma.ts` | Cliente Prisma |
| `src/utils/get-city-from-cep.ts` | Integração com ViaCEP (CEP -> cidade) |
| `prisma/schema.prisma` | Modelos e enums do banco |
| `prisma/migrations` | Migrações do banco |
| `generated/prisma` | Prisma Client gerado |

---

## 🔐 Variáveis de Ambiente

Crie um `.env` baseado em `.env.example`:

```bash
cp .env.example .env
```

Campos obrigatórios:

```
NODE_ENV=dev
DATABASE_URL=postgresql://docker:docker@localhost:5432/findafriend?schema=public
JWT_SECRET=uma-chave-forte-aqui
```

---

## ▶️ Como Rodar o Projeto (Passo a Passo)

1. Suba o PostgreSQL com Docker:
```bash
docker-compose up -d
```

2. Instale dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Rode as migrações:
```bash
npx prisma migrate dev
```

5. Gere o Prisma Client (caso necessário):
```bash
npx prisma generate
```

6. Inicie o servidor em modo desenvolvimento:
```bash
npm run dev
```

Servidor padrão: `http://localhost:3333`

---

## 🧪 Testes

Unitários:
```bash
npm run test
```

E2E:
```bash
npm run test:e2e
```

Watch:
```bash
npm run test:watch
```

Cobertura:
```bash
npm run test:coverage
```

Observação: os testes e2e usam `DATABASE_URL` e criam um schema isolado via Prisma.

---

## ⚙️ Scripts Disponíveis

- `npm run dev` inicia o servidor com reload
- `npm run build` gera build em `build/`
- `npm run start` executa o build
- `npm run test` executa testes unitários
- `npm run test:e2e` executa testes de integração
- `npm run test:coverage` executa cobertura de testes

---

## 🧩 Modelagem (Prisma)

Entidades principais:

- `Org` possui `pets`
- `Pet` pertence a uma `org` e possui `requirements`
- `Requirement` pode ser reutilizado entre vários pets

Enums usados:

| Enum | Valores |
| --- | --- |
| `PetAge` | `PUPPY`, `ADULT`, `SENIOR` |
| `PetSize` | `SMALL`, `MEDIUM`, `LARGE` |
| `EnergyLevel` | `LOW`, `MEDIUM`, `HIGH` |
| `IndependenceLevel` | `LOW`, `MEDIUM`, `HIGH` |
| `Environment` | `SMALL_SPACE`, `MEDIUM_SPACE`, `LARGE_SPACE` |

---

## 🔗 Rotas da API (Detalhadas)

### `POST /orgs`
Cadastro de ORG.

Body:
```json
{
  "name": "ONG Exemplo",
  "email": "contato@ong.com",
  "cep": "01001000",
  "address": "Rua Exemplo, 123",
  "latitude": -23.5505,
  "longitude": -46.6333,
  "phone": "11999999999",
  "password": "123456"
}
```

Responses:
- `201 Created`
- `409 Conflict` ORG já existe

---

### `POST /authenticate`
Login de ORG.

Body:
```json
{
  "email": "contato@ong.com",
  "password": "123456"
}
```

Response:
- `200 OK` retorna `token` e define `refreshToken` em cookie
- `400 Bad Request` credenciais inválidas

---

### `GET /profile`
Perfil da ORG autenticada.

Requer:
`Authorization: Bearer <token>`

Response:
- `200 OK` retorna dados da ORG (senha omitida)

---

### `POST /pet`
Cadastro de pet (requer auth).

Requer:
`Authorization: Bearer <token>`

Body:
```json
{
  "name": "Nina",
  "about": "Carinhosa e ativa",
  "age": "PUPPY",
  "size": "SMALL",
  "energyLevel": "HIGH",
  "independenceLevel": "LOW",
  "environment": "SMALL_SPACE",
  "orgId": "uuid-da-org",
  "requirements": ["Casa telada", "Passeios diários"]
}
```

Responses:
- `201 Created`
- `400 Bad Request` ORG inexistente

Observação: a cidade do pet é derivada automaticamente pelo CEP da ORG usando ViaCEP.

---

### `GET /pets`
Lista pets por cidade com filtros opcionais.

Query obrigatória:
`city`

Filtros opcionais:
`age`, `size`, `energyLevel`, `independenceLevel`, `environment`

Exemplo:
`/pets?city=São%20Paulo&age=ADULT&size=MEDIUM`

Response:
- `200 OK` com `{ "pets": [] }`
- `400 Bad Request` se `city` estiver vazia

---

### `GET /pet/:petId`
Detalhes do pet com ORG e requisitos.

Response:
- `200 OK` com `{ "pet": {}, "org": {}, "requeriments": [] }`
- `400 Bad Request` se pet/ORG não existir

---

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
- [x] RN04 - O contato para adoção deve ser feito diretamente com a ORG via WhatsApp
- [x] RN05 - Apenas ORGs autenticadas podem cadastrar pets
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
- [x] RN11 - O sistema não realiza intermediação da adoção (apenas conecta usuário à ORG)

---

## 🚀 Requisitos Não Funcionais (RNF)

- [x] RNF01 - A API deve ser desenvolvida em Node.js
- [x] RNF02 - Utilizar PostgreSQL como banco de dados
- [x] RNF03 - Utilizar Prisma como ORM
- [x] RNF04 - A API deve seguir padrão REST
- [x] RNF05 - Os dados devem ser persistidos de forma relacional
- [x] RNF06 - O sistema deve garantir integridade relacional (FK entre Pet e Org)
- [x] RNF07 - A autenticação deve ser segura (ex: JWT)
- [x] RNF08 - As senhas devem ser armazenadas com hash (ex: bcrypt)
- [x] RNF09 - O sistema deve permitir escalabilidade para múltiplas ORGs
- [x] RNF10 - O tempo de resposta das requisições deve ser rápido (< 500ms ideal)
- [x] RNF11 - O sistema deve ser preparado para deploy (ex: Docker)
- [x] RNF12 - O código deve seguir boas práticas de organização e separação de responsabilidades
- [x] RNF13 - A API deve permitir fácil integração com front-end ou mobile

---

## 📚 Casos de Uso (UC)

- [x] UC01 - Cadastrar ORG
- [x] UC02 - Autenticar ORG
- [x] UC03 - Cadastrar Pet vinculado a uma ORG
- [x] UC04 - Buscar pets por cidade com filtros opcionais
- [x] UC05 - Visualizar detalhes de um pet
- [x] UC06 - Listar requirements de um pet
- [x] UC07 - Associar requirements a um pet
- [x] UC08 - Exibir informações da ORG responsável pelo pet para contato

---

## 🔗 Rotas da API (para cumprir os requisitos)

- [x] `POST /orgs`  
  Criação de ORG (RF01, UC01)

- [x] `POST /authenticate`  
  Autenticação da ORG e emissão de token (RF02, UC02)

- [x] `GET /profile` (JWT obrigatório)  
  Perfil da ORG autenticada (apoio para gestão)

- [x] `POST /pet` (JWT obrigatório)  
  Criação de pet vinculado à ORG (RF03, RN02, RN05, UC03)

- [x] `GET /pets`  
  Lista pets por cidade com filtros opcionais (RF04, RF05, RF09, RN01, RN06, UC04)  
  Query esperada: `city` (obrigatório), `age`, `size`, `energyLevel`, `independenceLevel`, `environment`

- [x] `GET /pet/:petId`  
  Detalhes do pet (RF06, UC05)
