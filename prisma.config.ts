import "dotenv/config"; // Make sure to load environment variables
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  // Remove the 'engine' property entirely
  datasource: {
    url: env("file:./dev.db"), // Define your datasource URL here
  },
});
