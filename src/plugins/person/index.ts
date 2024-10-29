import bearer from "@elysiajs/bearer";
import { Faker, faker } from "@faker-js/faker";
import Elysia, { error, t } from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { unkey } from "../../lib/unkey";
import { db } from "../../db";
import { person } from "../../db/schema";
import { eq } from "drizzle-orm";
const PersonSchema = t.Object({
    id:t.String(),
    name:t.String(),
    email:t.String(),
    gender:t.String(),
    age:t.Number(),
    phone:t.String(),
    address:t.String(),
})
type Person = typeof PersonSchema.static;
export const personPlugin = new Elysia({ prefix: "/person" })
  .use(authMiddleware)
  .get(
    "/",
    () => {
      return db.select().from(person).limit(50);
    },
    { isProtected:true}
  )
  .get(
    "/:id",
    async ({body,params:{id}}) => {
      return db.select().from(person).where(eq(person.id, id)).limit(1);
    },
    { isProtected: true,
      params: t.Object({ id: t.Number() }),
     }
  )
  .put(
    "/:id",
    async({ body, params:{id},error }) => {
            try {
              await db.insert(person).values({
                id: id,
                ...body,
              });
            } catch (e) {
              console.error(e);
              error(500, {
                code: "INTERNAL_SERVER_ERROR",
                message: "Internal Server Error, Try After Sometime",
              });
            }
            return { message: "Successful Added" };
    },
    {
      params: t.Object({ id: t.Number() }),
            body:t.Object({
        name:t.String({maxLength:20}),
        email:t.String({format:'email'}),
        gender:t.Enum({"male":"male","female":"female"}),
        age:t.Number({minimum:18,maximum:60}),
        phone:t.String({maxLength:15}),
        address:t.String({maxLength:100}),
      }),
      isProtected: true,
      beforeHandle:async({bearer,error})=>{
        const ratelimitResult = await unkey.ratelimits.limit({
            identifier:bearer!,
            limit:10,
            duration:86400,
            async:true,
            cost:1,
        });
         if (ratelimitResult.error || !ratelimitResult.result) {
           return error(500, {
             code: "INTERNAL_SERVER_ERROR",
             message: "Internal Server Error, Try After Sometime",
           });
         }
        if (ratelimitResult.result.remaining <= 0) {
            return error(429, {
              code: "TOO_MANY_REQUESTS",
              message: "Too Many Requests, Try After Sometime",
            });
        }
      }
    }
  );





