import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  datasource: {
    url: "file:./dev.db",
  },
});

// import 'dotenv/config';
// import { defineConfig, env } from 'prisma/config';

// export default defineConfig({
//   schema: './prisma/schema.prisma',
//   datasource: {
//     url: env('DATABASE_URL'),
//   },
// });