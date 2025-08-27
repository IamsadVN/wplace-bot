import { drizzle } from "drizzle-orm/mysql2";
import configEnv from "../config.js";
import mysql from "mysql2/promise.js";

const pool = mysql.createPool(configEnv.dbURL!);

const database = drizzle({ client: pool });

export default database;