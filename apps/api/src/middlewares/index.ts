import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { apiLogger } from "../libs/logger.js";

export default async function useMiddlewares(app: FastifyInstance) {
	app.addHook("onRequest", (request, reply, done) => {
		apiLogger.info(`Client: ${request.ip}, ${request.method} ${request.routeOptions.url}`);

		done();
	})
}