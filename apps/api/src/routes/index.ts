import { FastifyInstance } from "fastify";
import { userRoute } from "./user/index.js";

export default function useRoutes(app: FastifyInstance) {
	app.register(userRoute, { prefix: "/user" });
}