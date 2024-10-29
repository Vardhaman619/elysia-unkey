import Elysia, { t } from "elysia";
import { db } from "../../db";
import { unkey } from "../../lib/unkey";
import { env } from "../../env";
import { authMiddleware } from "../../middleware/auth";
import { eq } from "drizzle-orm";
import { users } from "../../db/schema";

const UserCreationSchema = t.Object({name:t.String(),email:t.String()})
export const authPlugin = new Elysia({ prefix: "/auth" })
  .post(
    "/signin",
    async ({ body,error }) => {
      const keyResult = await unkey.keys.create({
        apiId: env.UNKEY_API_ID,
      });
      if (keyResult.error || !keyResult.result) {
        return error(500, {
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal Server Error, Try After Sometime",
        });
      }
      try {
        const user = await db.insert(users).values({
          name: body.name,
          email: body.email,
          apiId: keyResult.result.keyId,
          apiKey: keyResult.result.key,
        });
      } catch (e) {
        console.error(e)
        error(500, {
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal Server Error, Try After Sometime",
        });
      }
        return { message: "Signup Successful", apiKey: keyResult.result.key };
    },
    { body: UserCreationSchema }
  )
  .get("/signout", async ({request}) => {
    const apiKey = request.headers.get("Authorization")?.split(" ")[1]!;
    const usersRecord = await db.select().from(users);
    const deletedUser = await db
      .delete(users)
      .where(eq(users.apiKey, apiKey))
      .returning({ apiId: users.apiId });
    await unkey.apis.delete({ apiId: deletedUser[0].apiId });
    return { message: "Signout Successful" };
  }).use(authMiddleware);