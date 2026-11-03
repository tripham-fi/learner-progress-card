const { PrismaClient } = require("../../generated/prisma/client")
const { PrismaPg } = require("@prisma/adapter-pg");
const env = require("./env");

const connectionString = `${env.DATABASE_URL}`;


const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
