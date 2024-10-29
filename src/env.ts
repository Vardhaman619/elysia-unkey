import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    SERVER_PORT: z.coerce.number(),
    UNKEY_ROOT_KEY: z.string(),
    DB_FILE_NAME: z.string(),
    UNKEY_API_ID: z.string(),
  },
  runtimeEnv: {
    SERVER_PORT: process.env.SERVER_PORT,
    UNKEY_ROOT_KEY: process.env.UNKEY_ROOT_KEY,
    DB_FILE_NAME: process.env.DB_FILE_NAME,
    UNKEY_API_ID: process.env.UNKEY_API_ID,
  },
});
