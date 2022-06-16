import { Database, PostgresConnector } from "../deps.ts";
const { env } = Deno;

const connector = new PostgresConnector({
  database: env.get("DATABASE_TEST") || "db-test",
  host: env.get("HOST") || "127.0.0.1",
  username: env.get("POSTGRES_USERNAME") || "postgres",
  password: env.get("POSTGRES_PASSWORD") || "postgres",
  port: Number(env.get("DB_PORT")) || 5432,
});

const dbTest = new Database({ connector });
export default dbTest;
