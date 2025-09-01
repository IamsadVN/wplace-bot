import { FastifyInstance } from "fastify";
import { createNewUser, deleteUserByID, getAllUsers, getUserByID } from "./controller.js";

export function userRoute(app: FastifyInstance) {
	app.get("/list", getAllUsers);
	app.get("/:userID", getUserByID);
	app.delete("/:userID", deleteUserByID);
	app.post("/new", createNewUser);
	
}