import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string(),
  DIRECT_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string(),
  APP_SECRET_KEY: z.string(),
});

type EnvSchemaType = z.infer<typeof envSchema>;

const env = (name: keyof EnvSchemaType) => {
  const envData = envSchema.parse(process.env);
  return envData[name];
};

export { env };
