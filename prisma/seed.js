const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const data = require("./mock_data.json");

async function main() {
  const clerkID = "user_2kWcZZMsMe4fppFELUMpgm5m1ZV";
  const jobs = data.map((job) => {
    return {
      ...job,
      clerkID,
    };
  });
  for (const job of jobs) {
    await prisma.job.create({
      data: job,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
