import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.employee.upsert({
    where: {
      id: process.env.ADMIN_UUID,
    },
    update: {},
    create: {
      id: process.env.ADMIN_UUID,
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: await hash(process.env.ADMIN_PASSWORD, 10),
    },
  });
}

main()
  .catch(async (error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
