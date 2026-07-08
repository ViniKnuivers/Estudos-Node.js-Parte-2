# Node2 — API estilo GymPass/Wellhub

API REST para um sistema de check-in em academias, no mesmo espírito do antigo GymPass (hoje **Wellhub**): o usuário se cadastra, procura academias parceiras perto dele (ou pelo nome) e faz "check-in" quando chega lá, precisando confirmar presença em até 20 minutos.

Projeto construído durante a trilha **Node.js da Rocketseat (Ignite)**, seguindo Clean Architecture simplificada, princípios de SOLID e uma suíte de testes automatizados (unitários + end-to-end).

---

## 📖 Sobre o projeto

A ideia central é simples e replica o núcleo de negócio de um Gympass/Wellhub:

1. O usuário cria uma conta e se autentica.
2. Ele busca academias por nome ou pelas mais próximas da sua localização (latitude/longitude).
3. Ao chegar na academia, ele faz **check-in** — mas só é permitido se estiver fisicamente perto (até 100 metros) do endereço cadastrado.
4. Esse check-in precisa ser **validado** em até 20 minutos, senão perde a validade.
5. O usuário só pode fazer 1 check-in por dia.
6. O usuário consegue ver seu histórico de check-ins e métricas (quantos já fez).

Não há interface visual — é uma API pura, pensada para ser consumida por um app mobile/web (o próprio curso da Rocketseat foca só no backend).

---

## 🚀 Tecnologias utilizadas

| Categoria | Tecnologia |
|---|---|
| Runtime | Node.js (TypeScript) |
| Framework HTTP | [Fastify](https://fastify.dev/) 5 |
| ORM | [Prisma](https://www.prisma.io/) 7 (com `@prisma/adapter-pg`, o novo padrão de driver adapters) |
| Banco de dados | PostgreSQL (via Docker) |
| Validação | [Zod](https://zod.dev/) |
| Autenticação | JWT (`@fastify/jwt`) |
| Hash de senha | `bcryptjs` |
| Datas | `dayjs` |
| Testes | [Vitest](https://vitest.dev/) (unitário + e2e) + `@vitest/coverage-v8` |
| Testes HTTP | `supertest` |
| Build | `tsup` (build de produção) e `tsx` (dev com watch) |

---

## 🏗️ Arquitetura e padrões de projeto

O projeto segue o padrão ensinado na trilha "Ignite Node.js" da Rocketseat, muito próximo de **Clean Architecture** com **SOLID**:

```
Requisição HTTP
      │
      ▼
┌─────────────┐      ┌───────────┐      ┌────────────────┐      ┌──────────┐
│ Controller  │ ───▶ │ Use Case  │ ───▶ │  Repository     │ ───▶ │ Prisma / │
│ (Fastify)   │      │ (regra de │      │  (interface)    │      │ Postgres │
│             │      │ negócio)  │      │                 │      │          │
└─────────────┘      └───────────┘      └────────────────┘      └──────────┘
```

- **Controllers** (`src/http/controllers`): recebem a requisição, validam o formato dos dados com Zod, chamam o use case certo e devolvem a resposta HTTP. Não têm regra de negócio.
- **Use Cases** (`src/use-cases`): concentram toda a regra de negócio (ex: "não pode fazer 2 check-ins no mesmo dia"). Não sabem nada sobre HTTP nem sobre Prisma — recebem um **repositório** por injeção de dependência via construtor.
- **Repositories** (`src/repositories`): são **interfaces** (contratos) que descrevem o que pode ser feito com cada entidade (ex: `findByEmail`, `create`). Isso permite trocar a implementação sem alterar a regra de negócio.
  - `Prisma*Repository`: implementação real, que conversa com o PostgreSQL.
  - `InMemory*Repository`: implementação falsa (in-memory), usada só nos testes unitários — muito mais rápida que subir um banco de verdade.
- **Factories** (`src/use-cases/factories`): funções `make*UseCase()` que fazem a "montagem" — instanciam o repositório concreto (Prisma) e injetam no use case. É aqui que a inversão de dependência acontece na prática.

Essa separação é o que permite testar as regras de negócio (use cases) sem precisar de um banco de dados rodando, usando os repositórios in-memory como *test doubles*.

---

## 📁 Estrutura de pastas

```
Node2/
├── prisma/
│   ├── schema.prisma              # Modelagem das tabelas (User, Gym, CheckIn)
│   ├── migrations/                # Histórico de migrações do banco
│   └── vitest-environment-prisma/ # Ambiente customizado do Vitest p/ testes e2e
├── src/
│   ├── app.ts                     # Instância do Fastify, plugins e error handler global
│   ├── server.ts                  # Ponto de entrada — sobe o servidor HTTP
│   ├── env/                       # Validação das variáveis de ambiente (Zod)
│   ├── lib/prisma.ts              # Instância única (singleton) do Prisma Client
│   ├── generated/prisma/          # Client do Prisma gerado automaticamente (não editar)
│   ├── http/
│   │   ├── controllers/
│   │   │   ├── users/             # register, authenticate, profile
│   │   │   ├── gyms/               # create, search, nearby
│   │   │   └── check-ins/          # create, validate, history, metrics
│   │   └── middlewares/verify-jwt.ts
│   ├── repositories/              # Interfaces + implementações Prisma e In-Memory
│   ├── use-cases/                 # Regras de negócio + testes unitários (.spec.ts)
│   │   ├── errors/                # Erros de domínio customizados
│   │   └── factories/             # Montagem (injeção de dependência) dos use cases
│   └── utils/
│       ├── get-distance-between-coordinates.ts  # Fórmula de Haversine
│       └── test/create-and-authenticate-user.ts # Helper para os testes e2e
├── docker-compose.yml              # Sobe o PostgreSQL local
├── .env.example                    # Modelo das variáveis de ambiente
└── package.json
```

---

## 🗃️ Modelagem de dados

Três tabelas, definidas em `prisma/schema.prisma`:

**`User`** (`users`)
| Campo | Tipo | Observação |
|---|---|---|
| id | String (uuid) | Chave primária |
| nome | String | |
| email | String | Único |
| password_hash | String | Senha já criptografada (bcrypt) |
| created_at | DateTime | |

**`Gym`** (`gyms`) — as academias parceiras
| Campo | Tipo | Observação |
|---|---|---|
| id | String (uuid) | Chave primária |
| title | String | Nome da academia |
| description | String? | Opcional |
| phone | String? | Opcional |
| latitude / longitude | Decimal | Usadas no cálculo de proximidade |

**`CheckIn`** (`check_ins`) — a "prova" de que o usuário foi à academia
| Campo | Tipo | Observação |
|---|---|---|
| id | String (uuid) | Chave primária |
| user_id / gym_id | String | Chaves estrangeiras |
| created_at | DateTime | Momento do check-in |
| validated_at | DateTime? | Preenchido quando o check-in é confirmado |

`User` 1—N `CheckIn` N—1 `Gym`.

---

## ✅ Requisitos e regras de negócio

Este é o checklist de escopo do projeto (padrão usado nos projetos da Rocketseat), refletindo o que está implementado hoje:

**Requisitos funcionais**
- [x] Cadastro de usuário
- [x] Autenticação
- [x] Obter perfil do usuário logado
- [x] Obter número de check-ins do usuário logado
- [x] Obter histórico de check-ins do usuário logado
- [x] Buscar academias próximas (por coordenadas)
- [x] Buscar academias pelo nome
- [x] Realizar check-in em uma academia
- [x] Validar o check-in de um usuário
- [x] Cadastrar uma academia

**Regras de negócio**
- [x] Não pode haver dois cadastros com o mesmo e-mail
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [x] O check-in só é permitido a até 100m de distância da academia
- [x] O check-in só pode ser validado em até 20 minutos após criado
- [x] O check-in só pode ser validado por administradores *(ainda não implementado — não existe campo de "role" no modelo `User`)*
- [x] A academia só pode ser cadastrada por administradores *(mesmo motivo acima)*

**Requisitos não funcionais**
- [x] Senha do usuário criptografada (bcrypt)
- [x] Persistência em PostgreSQL
- [x] Listagens paginadas, 20 itens por página
- [x] Usuário identificado via JWT

---

## 🔐 Autenticação

O fluxo é o clássico JWT stateless:

1. `POST /sessions` valida e-mail/senha e devolve um `token` assinado, contendo o `id` do usuário no campo `sub` (subject).
2. Esse token deve ser enviado no header `Authorization: Bearer <token>` em toda rota protegida.
3. O middleware `verifyJWT` (`src/http/middlewares/verify-jwt.ts`) roda antes das rotas de academias e check-ins (registrado com `app.addHook('onRequest', verifyJWT)`) e da rota `/me`, chamando `request.jwtVerify()`. Se o token for inválido ou ausente, responde `401 Unauthorized`.
4. Dentro dos controllers autenticados, o id do usuário logado é acessado via `request.user.sub`.

---

## 📡 Rotas da API

### Usuários

| Método | Rota | Auth | Body | Descrição |
|---|---|---|---|---|
| `POST` | `/users` | Não | `{ name, email, password }` | Cria um novo usuário. `409` se o e-mail já existir. |
| `POST` | `/sessions` | Não | `{ email, password }` | Autentica e retorna `{ token }`. `400` se credenciais inválidas. |
| `GET` | `/me` | Sim | — | Retorna os dados do usuário logado (sem o hash da senha). |

### Academias

| Método | Rota | Auth | Body/Query | Descrição |
|---|---|---|---|---|
| `POST` | `/gyms` | Sim | `{ title, description, phone, latitude, longitude }` | Cadastra uma academia. |
| `GET` | `/gyms/search` | Sim | `?query=&page=` | Busca academias pelo nome (contains), paginado. |
| `GET` | `/gyms/nearby` | Sim | `?latitude=&longitude=` | Lista academias num raio de 10km da coordenada informada. |

### Check-ins

| Método | Rota | Auth | Body/Params | Descrição |
|---|---|---|---|---|
| `POST` | `/gyms/:gymId/check-ins` | Sim | `{ latitude, longitude }` | Registra o check-in do usuário logado naquela academia. |
| `PATCH` | `/check-ins/:checkInId/validate` | Sim | — | Confirma/valida um check-in existente. |
| `GET` | `/check-ins/history` | Sim | `?page=` | Histórico de check-ins do usuário logado. |
| `GET` | `/check-ins/metrics` | Sim | — | Retorna `{ checkInsCount }` do usuário logado. |

---

## 🧠 Regras de negócio, use case por use case

- **`RegisterUseCase`** — verifica se já existe usuário com o mesmo e-mail (`UserAlreadyExistError`), faz o hash da senha com `bcrypt` (6 salt rounds) e cria o usuário.
- **`AuthenticateUseCase`** — busca o usuário pelo e-mail e compara a senha com `compare()` do bcrypt. Qualquer falha (usuário não existe ou senha errada) gera o mesmo erro genérico (`InvalidCredentialsError`), por segurança.
- **`GetUserProfileUseCase`** — busca por id; `ResourceNotFoundError` se não existir.
- **`CreateGymUseCase`** — apenas repassa os dados ao repositório (sem validação de negócio adicional além da já feita pelo Zod no controller).
- **`SearchGymsUseCase`** — busca por título (`contains`), paginado (20 por página).
- **`FetchNearbyGymsUseCase`** — usa uma **query SQL raw** com a fórmula de **Haversine** (distância entre dois pontos numa esfera) diretamente no Postgres, retornando academias num raio de 10km.
- **`CheckInUseCase`** — o mais rico em regras:
  1. Confirma que a academia existe (`ResourceNotFoundError`).
  2. Calcula a distância entre o usuário e a academia com `getDistanceBetweenCoordinates` (mesma fórmula de Haversine, em JS). Se for maior que **0.1 km (100m)**, lança `MaxDistanceError`.
  3. Verifica se já existe check-in do usuário no mesmo dia. Se sim, `MaxNumberOfCheckInsError`.
  4. Cria o check-in.
- **`ValidateCheckInUseCase`** — busca o check-in (`ResourceNotFoundError` se não existir), calcula a diferença em minutos entre agora e a criação do check-in com `dayjs`. Se passou de **20 minutos**, lança `LateCheckInValidationError`. Caso contrário, preenche `validated_at`.
- **`FetchUserCheckInHistoryUseCase`** / **`GetUserMetricsUseCase`** — leitura simples, paginada ou contagem, por usuário.

Todos os erros de domínio (`src/use-cases/errors`) estendem `Error` e são tratados nos controllers, convertendo para o status HTTP adequado (ex: `409` para e-mail duplicado, `400` para credenciais inválidas). Erros não tratados caem no `setErrorHandler` global do Fastify (`src/app.ts`), que também trata `ZodError` (`400`) e retorna `500` para o resto.

---

## 🧪 Testes

O projeto usa **Vitest com dois "projetos" separados** (configurado em `vite.config.mjs`):

- **`unit`** (`npm run test`) — roda os arquivos `*.spec.ts` dentro de `src/use-cases`. Usam os repositórios **in-memory**, então são rápidos e não tocam o banco de dados real.
- **`e2e`** (`npm run test:e2e`) — roda os arquivos `*.spec.ts` dentro de `src/http/controllers`, subindo a aplicação Fastify de verdade (via `supertest`) e usando o Postgres real. Cada arquivo de teste ganha um **schema isolado** no Postgres (gerado com `randomUUID()`), criado pelo ambiente customizado `prisma/vitest-environment-prisma/prisma-test-environment.ts`, que roda `prisma migrate deploy` antes de cada suíte e apaga o schema (`DROP SCHEMA ... CASCADE`) ao final.

Também existe o helper `createAndAuthenticateUser` (`src/utils/test/create-and-authenticate-user.ts`), que registra um usuário fake e devolve um token JWT válido, evitando repetir esse setup em cada teste e2e.

Para ver a cobertura: `npm run test:coverage`. Para abrir a interface visual do Vitest: `npm run test:ui`.

---

## ⚙️ Como rodar o projeto localmente

**Pré-requisitos:** Node.js, Docker (para o Postgres) e um gerenciador de pacotes (`npm`).

```bash
# 1. Instale as dependências
npm install

# 2. Suba o banco PostgreSQL via Docker
docker compose up -d

# 3. Copie o arquivo de variáveis de ambiente
cp .env.example .env
# Edite o .env se necessário (DATABASE_URL, JWT_SECRET, PORT)

# 4. Rode as migrações do Prisma
npx prisma migrate deploy

# 5. Suba a API em modo desenvolvimento (hot reload)
npm run start:dev
```

A API sobe por padrão em `http://localhost:3333`.

Para build de produção:

```bash
npm run build     # gera a pasta build/ com o esbuild (tsup)
npm run start     # roda build/server.js
```

---

## 📜 Scripts disponíveis (`package.json`)

| Script | O que faz |
|---|---|
| `npm run start:dev` | Sobe a API em modo dev, com watch (`tsx`) |
| `npm run build` | Compila o TypeScript para `build/` (`tsup`) |
| `npm run start` | Roda a versão compilada |
| `npm run test` | Testes unitários |
| `npm run test:watch` | Testes unitários em modo watch |
| `npm run test:e2e` | Testes end-to-end (precisa do Postgres rodando) |
| `npm run test:e2e:watch` | Testes e2e em modo watch |
| `npm run test:coverage` | Roda todos os testes com relatório de cobertura |
| `npm run test:ui` | Interface visual do Vitest |

---

## ⚠️ Pontos de atenção e possíveis melhorias

Alguns detalhes que valem revisão, provavelmente porque o projeto ainda está em construção junto ao curso:

- **`PrismaCheckInsRepository.findById`** está com `throw new Error("Method not implemented.")` — ou seja, em produção (fora dos testes, que usam a versão in-memory), a validação de check-in (`PATCH /check-ins/:checkInId/validate`) vai quebrar. É só implementar o `findUnique` do Prisma, seguindo o mesmo padrão dos outros métodos do repositório.
- **Roles de administrador não existem** no modelo `User`. As regras "check-in só validado por admin" e "academia só cadastrada por admin" estão no checklist mas não implementadas — hoje qualquer usuário autenticado pode criar academias e validar check-ins de qualquer um.
- **`.env` está versionado** dentro da pasta do projeto — o ideal é manter só o `.env.example` no controle de versão e colocar `.env` no `.gitignore`, mesmo sendo credenciais de desenvolvimento local.
- Pequenos detalhes de nomenclatura que não afetam o funcionamento, mas podem ser padronizados: mistura de português/inglês nos campos (`nome` vs. `name`), inconsistência de capitalização (`UserId` em vez de `userId` em alguns use cases), e nomes de migrations com typos (`chek_ins`, `relantionships`).

---

## 🔭 Compare com o Wellhub/Gympass real

Esse projeto implementa o núcleo do modelo de negócio (busca de academias + check-in por proximidade + validação por tempo), mas um produto real como o Wellhub tem camadas extras que dariam para evoluir aqui, por exemplo:

- Planos de assinatura e cobrança recorrente;
- Diferentes categorias de parceiros (academias, estúdios, terapia, etc.), não só academias;
- Painel para os administradores das academias (confirmar check-ins, ver relatórios);
- Notificações (push/e-mail) quando o check-in está perto de expirar;
- Avaliações e fotos das academias.
