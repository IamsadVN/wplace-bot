import { int, varchar } from "drizzle-orm/mysql-core/index.js";
import { mysqlTable } from "drizzle-orm/mysql-core/table.js";

export const usersTable = mysqlTable("users", {
	userID: varchar({ length: 10}).notNull().primaryKey(),
	expireDate: int().notNull(),
	jwtToken: varchar({ length: 300 }).notNull(),
	sessionToken: varchar({ length: 300 })
});