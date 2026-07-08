import 'dotenv/config'
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL
const schema = connectionString ? new URL(connectionString).searchParams.get('schema') : null

// PrismaPgOptions.schema only affects query-builder generated SQL; it does not
// set the Postgres session search_path, so $queryRaw calls would otherwise
// silently hit the "public" schema. Setting it via pool `options` fixes raw queries too.
const adapter = new PrismaPg(
    schema ? { connectionString, options: `-c search_path="${schema}"` } : { connectionString },
    schema ? { schema } : {},
);

export const prisma = new PrismaClient({ adapter });

