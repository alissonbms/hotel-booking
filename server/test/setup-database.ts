import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";

const prisma = new PrismaClient();
const schemaUUID = randomUUID();

beforeAll(async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("env DATABASE_URL not found");
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schemaUUID);

  process.env.DATABASE_URL = url.toString();

  execSync("prisma migrate deploy", {
    env: {
      ...process.env,
      DATABASE_URL: url.toString(),
    },
  });
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(
    `drop schema if exists "${schemaUUID}" cascade`,
  );
  await prisma.$disconnect();
});
