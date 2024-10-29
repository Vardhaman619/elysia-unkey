import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, int } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  name: text("name"),
  email: text("email").unique(),
  apiId: text("apiId").notNull().unique(),
  apiKey: text("apiKey").primaryKey(),
});
export const person = sqliteTable("person", {
  id: integer("id").primaryKey({autoIncrement:true}),
  name: text("name"),
  email: text("email"),
  gender: text("gender"),
  age: integer("age"),
  phone: text("phone"),
  address: text("address"),
});
