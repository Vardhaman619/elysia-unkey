import { drizzle } from "drizzle-orm/bun-sqlite";
import { env } from "../env";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

export const db = drizzle(env.DB_FILE_NAME!);
migrate(db, { migrationsFolder: "./src/db/migration" });
