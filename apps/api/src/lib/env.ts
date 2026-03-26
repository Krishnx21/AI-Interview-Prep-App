import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.API_PORT ?? 4000),
  DATABASE_URL: required("DATABASE_URL"),
  REDIS_URL: required("REDIS_URL"),
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
  WEB_ORIGIN: process.env.WEB_ORIGIN ?? "http://localhost:3000"
};

