import Elysia, { error, t } from "elysia";
import { unkey } from "../lib/unkey";
import bearer from "@elysiajs/bearer";

export const authMiddleware = new Elysia({
  name: "auth",
})
  .use(bearer())
  .macro(({ onBeforeHandle }) => ({
    isProtected(enabled: boolean) {
      if (!enabled) return;
      onBeforeHandle(async ({ error, bearer,request }) => {
      if (!bearer || bearer.length==0) {
      return error(401, {
        code: "Unauthorized",
        message: "No bearer token provided",
      });
    }
    const keyVerficationResult = await unkey.keys.verify({ key: bearer });
     if (keyVerficationResult.error || keyVerficationResult.result.code != "VALID") {
      return error(401, {
        code: "Unauthorized",
        message: "Invalid bearer token",
      });
    }
    });
    },
  }));
