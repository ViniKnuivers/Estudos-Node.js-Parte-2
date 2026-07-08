"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_fastify = __toESM(require("fastify"));

// src/http/controllers/users/authenticate.ts
var import_zod = require("zod");

// src/use-cases/errors/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("invalid crentials");
  }
};

// src/lib/prisma.ts
var import_config = require("dotenv/config");

// src/generated/prisma/internal/class.ts
var runtime = __toESM(require("@prisma/client/runtime/client"));
var config = {
  "previewFeatures": [],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum Role {\n  ADMIN\n  MEMBER\n}\n\nmodel User {\n  id            String   @id @default(uuid())\n  nome          String\n  email         String   @unique\n  password_hash String\n  role          Role     @default(MEMBER)\n  created_at    DateTime @default(now())\n\n  checkIns CheckIn[]\n\n  @@map("users")\n}\n\nmodel CheckIn {\n  id           String    @id @default(uuid())\n  created_at   DateTime  @default(now())\n  validated_at DateTime?\n\n  user    User   @relation(fields: [user_id], references: [id])\n  user_id String\n\n  gym    Gym    @relation(fields: [gym_id], references: [id])\n  gym_id String\n\n  @@map("check_ins")\n}\n\nmodel Gym {\n  id          String  @id @default(uuid())\n  title       String\n  description String?\n  phone       String?\n  latitude    Decimal\n  longitude   Decimal\n\n  checkIns CheckIn[]\n\n  @@map("gyms")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"nome","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password_hash","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"checkIns","kind":"object","type":"CheckIn","relationName":"CheckInToUser"}],"dbName":"users"},"CheckIn":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"validated_at","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"CheckInToUser"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"gym","kind":"object","type":"Gym","relationName":"CheckInToGym"},{"name":"gym_id","kind":"scalar","type":"String"}],"dbName":"check_ins"},"Gym":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"latitude","kind":"scalar","type":"Decimal"},{"name":"longitude","kind":"scalar","type":"Decimal"},{"name":"checkIns","kind":"object","type":"CheckIn","relationName":"CheckInToGym"}],"dbName":"gyms"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","checkIns","_count","gym","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_min","_max","User.groupBy","User.aggregate","CheckIn.findUnique","CheckIn.findUniqueOrThrow","CheckIn.findFirst","CheckIn.findFirstOrThrow","CheckIn.findMany","CheckIn.createOne","CheckIn.createMany","CheckIn.createManyAndReturn","CheckIn.updateOne","CheckIn.updateMany","CheckIn.updateManyAndReturn","CheckIn.upsertOne","CheckIn.deleteOne","CheckIn.deleteMany","CheckIn.groupBy","CheckIn.aggregate","Gym.findUnique","Gym.findUniqueOrThrow","Gym.findFirst","Gym.findFirstOrThrow","Gym.findMany","Gym.createOne","Gym.createMany","Gym.createManyAndReturn","Gym.updateOne","Gym.updateMany","Gym.updateManyAndReturn","Gym.upsertOne","Gym.deleteOne","Gym.deleteMany","_avg","_sum","Gym.groupBy","Gym.aggregate","AND","OR","NOT","id","title","description","phone","latitude","longitude","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","every","some","none","created_at","validated_at","user_id","gym_id","nome","email","password_hash","Role","role","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "sAEdMAoEAABgACA_AABsADBAAAALABBBAABsADBCAQAAAAFWQABuACFaAQBdACFbAQAAAAFcAQBdACFeAABtXiIBAAAAAQAgCgMAAHEAIAYAAHIAID8AAG8AMEAAAAMAEEEAAG8AMEIBAF0AIVZAAG4AIVdAAHAAIVgBAF0AIVkBAF0AIQMDAACjAQAgBgAApAEAIFcAAHMAIAoDAABxACAGAAByACA_AABvADBAAAADABBBAABvADBCAQAAAAFWQABuACFXQABwACFYAQBdACFZAQBdACEDAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAEAAAADACABAAAAAwAgAQAAAAEAIAoEAABgACA_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AAAABEsQAAAAAUwQAAAAAU0QAAAAAU4QAAAAAU8QAFQAIQ0FAABVACAZAABWACAaAABWACA7AABWACA8AABWACBIEAAAAAFJEAAAAARKEAAAAARLEAAAAAFMEAAAAAFNEAAAAAFOEAAAAAFPEABUACEISAIAAAABSQIAAAAESgIAAAAESwIAAAABTAIAAAABTQIAAAABTgIAAAABTwIAVQAhCEgQAAAAAUkQAAAABEoQAAAABEsQAAAAAUwQAAAAAU0QAAAAAU4QAAAAAU8QAFYAIQ4FAABYACAZAABZACAaAABZACBIAQAAAAFJAQAAAAVKAQAAAAVLAQAAAAFMAQAAAAFNAQAAAAFOAQAAAAFPAQBXACFQAQAAAAFRAQAAAAFSAQAAAAEISAIAAAABSQIAAAAFSgIAAAAFSwIAAAABTAIAAAABTQIAAAABTgIAAAABTwIAWAAhC0gBAAAAAUkBAAAABUoBAAAABUsBAAAAAUwBAAAAAU0BAAAAAU4BAAAAAU8BAFkAIVABAAAAAVEBAAAAAVIBAAAAAQ4FAABVACAZAABbACAaAABbACBIAQAAAAFJAQAAAARKAQAAAARLAQAAAAFMAQAAAAFNAQAAAAFOAQAAAAFPAQBaACFQAQAAAAFRAQAAAAFSAQAAAAELSAEAAAABSQEAAAAESgEAAAAESwEAAAABTAEAAAABTQEAAAABTgEAAAABTwEAWwAhUAEAAAABUQEAAAABUgEAAAABCgQAAGAAID8AAFwAMEAAADoAEEEAAFwAMEIBAF0AIUMBAF0AIUQBAF4AIUUBAF4AIUYQAF8AIUcQAF8AIQtIAQAAAAFJAQAAAARKAQAAAARLAQAAAAFMAQAAAAFNAQAAAAFOAQAAAAFPAQBbACFQAQAAAAFRAQAAAAFSAQAAAAELSAEAAAABSQEAAAAFSgEAAAAFSwEAAAABTAEAAAABTQEAAAABTgEAAAABTwEAWQAhUAEAAAABUQEAAAABUgEAAAABCEgQAAAAAUkQAAAABEoQAAAABEsQAAAAAUwQAAAAAU0QAAAAAU4QAAAAAU8QAFYAIQNTAAADACBUAAADACBVAAADACAIPwAAYQAwQAAANAAQQQAAYQAwQgEAUQAhVkAAYgAhV0AAYwAhWAEAUQAhWQEAUQAhCwUAAFUAIBkAAGcAIBoAAGcAIEhAAAAAAUlAAAAABEpAAAAABEtAAAAAAUxAAAAAAU1AAAAAAU5AAAAAAU9AAGYAIQsFAABYACAZAABlACAaAABlACBIQAAAAAFJQAAAAAVKQAAAAAVLQAAAAAFMQAAAAAFNQAAAAAFOQAAAAAFPQABkACELBQAAWAAgGQAAZQAgGgAAZQAgSEAAAAABSUAAAAAFSkAAAAAFS0AAAAABTEAAAAABTUAAAAABTkAAAAABT0AAZAAhCEhAAAAAAUlAAAAABUpAAAAABUtAAAAAAUxAAAAAAU1AAAAAAU5AAAAAAU9AAGUAIQsFAABVACAZAABnACAaAABnACBIQAAAAAFJQAAAAARKQAAAAARLQAAAAAFMQAAAAAFNQAAAAAFOQAAAAAFPQABmACEISEAAAAABSUAAAAAESkAAAAAES0AAAAABTEAAAAABTUAAAAABTkAAAAABT0AAZwAhCT8AAGgAMEAAAB4AEEEAAGgAMEIBAFEAIVZAAGIAIVoBAFEAIVsBAFEAIVwBAFEAIV4AAGleIgcFAABVACAZAABrACAaAABrACBIAAAAXgJJAAAAXghKAAAAXghPAABqXiIHBQAAVQAgGQAAawAgGgAAawAgSAAAAF4CSQAAAF4ISgAAAF4ITwAAal4iBEgAAABeAkkAAABeCEoAAABeCE8AAGteIgoEAABgACA_AABsADBAAAALABBBAABsADBCAQBdACFWQABuACFaAQBdACFbAQBdACFcAQBdACFeAABtXiIESAAAAF4CSQAAAF4ISgAAAF4ITwAAa14iCEhAAAAAAUlAAAAABEpAAAAABEtAAAAAAUxAAAAAAU1AAAAAAU5AAAAAAU9AAGcAIQoDAABxACAGAAByACA_AABvADBAAAADABBBAABvADBCAQBdACFWQABuACFXQABwACFYAQBdACFZAQBdACEISEAAAAABSUAAAAAFSkAAAAAFS0AAAAABTEAAAAABTUAAAAABTkAAAAABT0AAZQAhDAQAAGAAID8AAGwAMEAAAAsAEEEAAGwAMEIBAF0AIVZAAG4AIVoBAF0AIVsBAF0AIVwBAF0AIV4AAG1eIl8AAAsAIGAAAAsAIAwEAABgACA_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"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
var runtime2 = __toESM(require("@prisma/client/runtime/client"));
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/client.ts
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var import_adapter_pg = require("@prisma/adapter-pg");
var connectionString = process.env.DATABASE_URL;
var schema = connectionString ? new URL(connectionString).searchParams.get("schema") : null;
var adapter = new import_adapter_pg.PrismaPg(
  schema ? { connectionString, options: `-c search_path="${schema}"` } : { connectionString },
  schema ? { schema } : {}
);
var prisma = new PrismaClient({ adapter });

// src/repositories/prisma-users-repository.ts
var PrismaUsersRepository = class {
  async findById(id) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });
    return user;
  }
  async findByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    return user;
  }
  async create(data) {
    const user = await prisma.user.create({
      data
    });
    return user;
  }
};

// src/use-cases/authenticate.ts
var import_bcryptjs = require("bcryptjs");
var AuthenticateUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  usersRepository;
  async execute({ email, password }) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }
    const doesPasswordMatches = await (0, import_bcryptjs.compare)(password, user.password_hash);
    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }
    return {
      user
    };
  }
};

// src/use-cases/factories/make-authenticate-use-case.ts
function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);
  return authenticateUseCase;
}

// src/http/controllers/users/authenticate.ts
async function authenticate(request, reply) {
  const authenticateBodySchema = import_zod.z.object({
    email: import_zod.z.string().email(),
    password: import_zod.z.string().min(6)
  });
  const { email, password } = authenticateBodySchema.parse(request.body);
  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    const { user } = await authenticateUseCase.execute({
      email,
      password
    });
    const token = await reply.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id
        }
      }
    );
    const refreshToken = await reply.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id,
          expiresIn: "7d"
        }
      }
    );
    return reply.setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true
    }).status(200).send({
      token
    });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }
    throw err;
  }
}

// src/http/controllers/users/register.ts
var import_zod2 = require("zod");

// src/use-cases/errors/user-already-exist-error.ts
var UserAlreadyExistError = class extends Error {
  constructor() {
    super("E-mail already exist");
  }
};

// src/use-cases/register.ts
var import_bcryptjs2 = require("bcryptjs");
var RegisterUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  usersRepository;
  async execute({ name, email, password }) {
    const password_hash = await (0, import_bcryptjs2.hash)(password, 6);
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExistError();
    }
    const user = await this.usersRepository.create({
      nome: name,
      email,
      password_hash
    });
    return {
      user
    };
  }
};

// src/use-cases/factories/make-register-use-case.ts
function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);
  return registerUseCase;
}

// src/http/controllers/users/register.ts
async function register(request, reply) {
  const registerBodySchema = import_zod2.z.object({
    name: import_zod2.z.string(),
    email: import_zod2.z.string().email(),
    password: import_zod2.z.string().min(6)
  });
  const { name, email, password } = registerBodySchema.parse(request.body);
  try {
    const registerUseCase = makeRegisterUseCase();
    await registerUseCase.execute({
      name,
      email,
      password
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }
  return reply.status(201).send();
}

// src/use-cases/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource not found.");
  }
};

// src/use-cases/get-user-profile.ts
var GetUserProfileUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  usersRepository;
  async execute({
    userId
  }) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    return {
      user
    };
  }
};

// src/use-cases/factories/make-get-user-profile-use-case.ts
function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfileUseCase(usersRepository);
  return useCase;
}

// src/http/controllers/users/profile.ts
async function profile(request, reply) {
  const getUserProfile = makeGetUserProfileUseCase();
  const { user } = await getUserProfile.execute({
    userId: request.user.sub
  });
  return reply.status(200).send({
    user: {
      ...user,
      password_hash: void 0
    }
  });
}

// src/http/controllers/users/refresh.ts
async function refresh(request, reply) {
  await request.jwtVerify({ onlyCookie: true });
  const { role } = request.user;
  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub
      }
    }
  );
  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d"
      }
    }
  );
  return reply.setCookie("refreshToken", refreshToken, {
    path: "/",
    secure: true,
    sameSite: true,
    httpOnly: true
  }).status(200).send({
    token
  });
}

// src/http/middlewares/verify-jwt.ts
async function verifyJWT(request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized." });
  }
}

// src/http/controllers/users/routes.ts
async function usersRoutes(app2) {
  app2.post("/users", register);
  app2.post("/sessions", authenticate);
  app2.patch("/token/refresh", refresh);
  app2.get("/me", { onRequest: [verifyJWT] }, profile);
}

// src/app.ts
var import_zod10 = require("zod");

// src/env/index.ts
var import_config2 = require("dotenv/config");
var import_zod3 = require("zod");
var envSchema = import_zod3.z.object({
  NODE_ENV: import_zod3.z.enum(["dev", "test", "production"]).default("dev"),
  JWT_SECRET: import_zod3.z.string(),
  PORT: import_zod3.z.coerce.number().default(3333)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables.");
}
var env = _env.data;

// src/app.ts
var import_jwt = __toESM(require("@fastify/jwt"));
var import_cookie = __toESM(require("@fastify/cookie"));

// src/repositories/prisma-gyms-repository.ts
var PrismaGymsRepository = class {
  async findById(id) {
    const gym = await prisma.gym.findUnique({
      where: {
        id
      }
    });
    return gym;
  }
  async searchMany(query, page) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query
        }
      },
      take: 20,
      skip: (page - 1) * 20
    });
    return gyms;
  }
  async create(data) {
    const gym = await prisma.gym.create({
      data
    });
    return gym;
  }
  async findManyNearby({ latitude, longitude }) {
    const gyms = await prisma.$queryRaw`
            SELECT * FROM gyms
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
            `;
    return gyms;
  }
};

// src/use-cases/search-gyms.ts
var SearchGymsUseCase = class {
  constructor(gymsRepository) {
    this.gymsRepository = gymsRepository;
  }
  gymsRepository;
  async execute({
    query,
    page
  }) {
    const gyms = await this.gymsRepository.searchMany(query, page);
    return {
      gyms
    };
  }
};

// src/use-cases/factories/make-search-gyms-use-case.ts
function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymsUseCase(gymsRepository);
  return useCase;
}

// src/http/controllers/gyms/search.ts
var import_zod4 = require("zod");
async function search(request, reply) {
  const searchGymsQuerySchema = import_zod4.z.object({
    query: import_zod4.z.string(),
    page: import_zod4.z.coerce.number().min(1).default(1)
  });
  const { query, page } = searchGymsQuerySchema.parse(request.query);
  const seachGymsUseCase = makeSearchGymsUseCase();
  const { gyms } = await seachGymsUseCase.execute({
    query,
    page
  });
  return reply.status(200).send({
    gyms
  });
}

// src/http/controllers/gyms/create.ts
var import_zod5 = require("zod");

// src/use-cases/create-gym.ts
var CreateGymUseCase = class {
  constructor(gymsRepository) {
    this.gymsRepository = gymsRepository;
  }
  gymsRepository;
  async execute({
    title,
    description,
    phone,
    latitude,
    longitude
  }) {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude
    });
    return {
      gym
    };
  }
};

// src/use-cases/factories/make-create-gym-use-case.ts
function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CreateGymUseCase(gymsRepository);
  return useCase;
}

// src/http/controllers/gyms/create.ts
async function create(request, reply) {
  const createGymBodySchema = import_zod5.z.object({
    title: import_zod5.z.string(),
    description: import_zod5.z.string().nullable(),
    phone: import_zod5.z.string().nullable(),
    latitude: import_zod5.z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: import_zod5.z.number().refine((value) => {
      return Math.abs(value) <= 180;
    })
  });
  const { title, description, phone, latitude, longitude } = createGymBodySchema.parse(request.body);
  const createGymUseCase = makeCreateGymUseCase();
  await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude
  });
  return reply.status(201).send();
}

// src/use-cases/fetch-nearby-gyms.ts
var FetchNearbyGymsUseCase = class {
  constructor(gymsRepository) {
    this.gymsRepository = gymsRepository;
  }
  gymsRepository;
  async execute({
    userLatitude,
    userLongitude
  }) {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude
    });
    return {
      gyms
    };
  }
};

// src/use-cases/factories/make-fetch-nearby-gyms-use-case.ts
function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(gymsRepository);
  return useCase;
}

// src/http/controllers/gyms/nearby.ts
var import_zod6 = require("zod");
async function nearby(request, reply) {
  const nearbyGymsQuerySchema = import_zod6.z.object({
    latitude: import_zod6.z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: import_zod6.z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    })
  });
  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query);
  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase();
  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude
  });
  return reply.status(200).send({
    gyms
  });
}

// src/http/middlewares/verify-user-role.ts
function verifyUserRole(roleToVerify) {
  return async (request, reply) => {
    const { role } = request.user;
    if (role != roleToVerify) {
      return reply.status(401).send({ message: "Unauthorized." });
    }
  };
}

// src/http/controllers/gyms/routes.ts
async function gymsRoutes(app2) {
  app2.addHook("onRequest", verifyJWT);
  app2.get("/gyms/search", search);
  app2.get("/gyms/nearby", nearby);
  app2.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] }, create);
}

// src/http/controllers/check-ins/create.ts
var import_zod7 = require("zod");

// src/use-cases/errors/max-number-of-check-ins-error.ts
var MaxNumberOfCheckInsError = class extends Error {
  constructor() {
    super("Max number of check-ins reached.");
  }
};

// src/use-cases/errors/max-distance-error.ts
var MaxDistanceError = class extends Error {
  constructor() {
    super("Max distance reached.");
  }
};

// src/utils/get-distance-between-coordinates.ts
function getDistanceBetweenCoordinates(from, to) {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0;
  }
  const fromRadian = Math.PI * from.latitude / 180;
  const toRadian = Math.PI * to.latitude / 180;
  const theta = from.longitude - to.longitude;
  const radTheta = Math.PI * theta / 180;
  let dist = Math.sin(fromRadian) * Math.sin(toRadian) + Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;
  return dist;
}

// src/use-cases/check-in.ts
var CheckInUseCase = class {
  constructor(checkInsRepository, gymRepository) {
    this.checkInsRepository = checkInsRepository;
    this.gymRepository = gymRepository;
  }
  checkInsRepository;
  gymRepository;
  async execute({
    UserId,
    gymId,
    userLatitude,
    userLongitude
  }) {
    const gym = await this.gymRepository.findById(gymId);
    if (!gym) {
      throw new ResourceNotFoundError();
    }
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber()
      }
    );
    const MAX_DISTANCE_IN_KILOMETERS = 0.1;
    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      UserId,
      /* @__PURE__ */ new Date()
    );
    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError();
    }
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: UserId
    });
    return {
      checkIn
    };
  }
};

// src/repositories/prisma-check-ins-repository.ts
var import_dayjs = __toESM(require("dayjs"));
var PrismaCheckInsRepository = class {
  async findById(id) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id
      }
    });
    return checkIn;
  }
  async findByUserIdOnDate(userId, date) {
    const startOfTheDay = (0, import_dayjs.default)(date).startOf("day");
    const endOfTheDay = (0, import_dayjs.default)(date).endOf("day");
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      }
    });
    return checkIn;
  }
  async countByUserId(userId) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    });
    return count;
  }
  async findManyByUserId(userId, page) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId
      },
      take: 20,
      skip: (page - 1) * 20
    });
    return checkIns;
  }
  async create(data) {
    const checkIn = await prisma.checkIn.create({
      data
    });
    return checkIn;
  }
  async save(data) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id
      },
      data
    });
    return checkIn;
  }
};

// src/use-cases/factories/make-check-in-use-case.ts
function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository);
  return useCase;
}

// src/http/controllers/check-ins/create.ts
async function create2(request, reply) {
  const createCheckInParamsSchema = import_zod7.z.object({
    gymId: import_zod7.z.string().uuid()
  });
  const createCheckInBodySchema = import_zod7.z.object({
    latitude: import_zod7.z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: import_zod7.z.number().refine((value) => {
      return Math.abs(value) <= 180;
    })
  });
  const { gymId } = createCheckInParamsSchema.parse(request.params);
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);
  const checkInUseCase = makeCheckInUseCase();
  await checkInUseCase.execute({
    gymId,
    UserId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude
  });
  return reply.status(201).send();
}

// src/use-cases/fetch-member-check-ins-history.ts
var FetchUserCheckInHistoryUseCase = class {
  constructor(checkInsRepository) {
    this.checkInsRepository = checkInsRepository;
  }
  checkInsRepository;
  async execute({
    UserId,
    page
  }) {
    const checkIns = await this.checkInsRepository.findManyByUserId(UserId, page);
    return {
      checkIns
    };
  }
};

// src/use-cases/factories/make-fetch-user-check-ins-history-use-case.ts
function makeFetchUserCheckInHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUserCheckInHistoryUseCase(checkInsRepository);
  return useCase;
}

// src/http/controllers/check-ins/history.ts
var import_zod8 = require("zod");
async function history(request, reply) {
  const checkInHistoryQuerySchema = import_zod8.z.object({
    page: import_zod8.z.coerce.number().min(1).default(1)
  });
  const { page } = checkInHistoryQuerySchema.parse(request.query);
  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInHistoryUseCase();
  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    UserId: request.user.sub,
    page
  });
  return reply.status(200).send({
    checkIns
  });
}

// src/use-cases/get-user-metrics.ts
var GetUserMetricsUseCase = class {
  constructor(checkInsRepository) {
    this.checkInsRepository = checkInsRepository;
  }
  checkInsRepository;
  async execute({
    UserId
  }) {
    const checkInsCount = await this.checkInsRepository.countByUserId(UserId);
    return {
      checkInsCount
    };
  }
};

// src/use-cases/factories/make-get-user-metrics-use-case.ts
function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsUseCase(checkInsRepository);
  return useCase;
}

// src/http/controllers/check-ins/metrics.ts
async function metrics(request, reply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase();
  const { checkInsCount } = await getUserMetricsUseCase.execute({
    UserId: request.user.sub
  });
  return reply.status(200).send({
    checkInsCount
  });
}

// src/http/controllers/check-ins/validate.ts
var import_zod9 = require("zod");

// src/use-cases/validate-check-in.ts
var import_dayjs2 = __toESM(require("dayjs"));

// src/use-cases/errors/late-check-in-validation-error.ts
var LateCheckInValidationError = class extends Error {
  constructor() {
    super("The check-in can only be validated until 20 minutes of its creation");
  }
};

// src/use-cases/validate-check-in.ts
var ValidateCheckInUseCase = class {
  constructor(checkInsRepository) {
    this.checkInsRepository = checkInsRepository;
  }
  checkInsRepository;
  async execute({
    checkInId
  }) {
    const checkIn = await this.checkInsRepository.findById(checkInId);
    if (!checkIn) {
      throw new ResourceNotFoundError();
    }
    const distanceIMinutesFromCheckInCreation = (0, import_dayjs2.default)(/* @__PURE__ */ new Date()).diff(
      checkIn.created_at,
      "minutes"
    );
    if (distanceIMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }
    checkIn.validated_at = /* @__PURE__ */ new Date();
    await this.checkInsRepository.save(checkIn);
    return {
      checkIn
    };
  }
};

// src/use-cases/factories/make-validate-check-in-use-case.ts
function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInUseCase(checkInsRepository);
  return useCase;
}

// src/http/controllers/check-ins/validate.ts
async function validate(request, reply) {
  const validadeCheckInParamsSchema = import_zod9.z.object({
    checkInId: import_zod9.z.string().uuid()
  });
  const { checkInId } = validadeCheckInParamsSchema.parse(request.params);
  const validateCheckInUseCase = makeValidateCheckInUseCase();
  await validateCheckInUseCase.execute({
    checkInId
  });
  return reply.status(204).send();
}

// src/http/controllers/check-ins/routes.ts
async function checkInsRoutes(app2) {
  app2.addHook("onRequest", verifyJWT);
  app2.get("/check-ins/history", history);
  app2.get("/check-ins/metrics", metrics);
  app2.post("/gyms/:gymId/check-ins", create2);
  app2.patch("/check-ins/:checkInId/validate", { onRequest: [verifyUserRole("ADMIN")] }, validate);
}

// src/app.ts
var app = (0, import_fastify.default)();
app.register(import_jwt.default, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false
  },
  sign: {
    expiresIn: "10m"
  }
});
app.register(import_cookie.default);
app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);
app.setErrorHandler((error, _, reply) => {
  if (error instanceof import_zod10.ZodError) {
    return reply.status(400).send({ message: "Validation error.", issues: error.format() });
  }
  if (env.NODE_ENV != "production") {
    console.error(error);
  } else {
  }
  return reply.status(500).send({ message: "Internal Server Error!." });
});

// src/server.ts
app.listen({
  host: "0.0.0.0",
  port: env.PORT
}).then(() => {
  console.log("HTTP Server Running");
});
