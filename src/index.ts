import { Elysia } from "elysia";
import { authPlugin } from "./plugins/auth";
import { personPlugin } from "./plugins/person";
import bearer from "@elysiajs/bearer";
import { env } from "./env";

const app = new Elysia().get("/", () => "Hello Elysia").use(bearer()).use(authPlugin).use(personPlugin).listen(env.SERVER_PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
