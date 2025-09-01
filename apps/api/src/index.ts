import Fastify from "fastify";

import configEnv from "./config.js";
import { apiLogger, systemLogger } from "./libs/logger.js";

import useRoutes from "./routes/index.js";
import useMiddlewares from "./middlewares/index.js";

const fastify = Fastify();

useRoutes(fastify);
useMiddlewares(fastify);

fastify.setErrorHandler((error, request, reply) => {
	apiLogger.error(error);

	reply.status(500).send("Internal Server Error");
});

try {
	await fastify.listen({
		host: "0.0.0.0",
		port: configEnv.apiPort
	});

	apiLogger.info(`Server is listening at ${configEnv.apiPort}`);
}
catch (err) {
	systemLogger.error(err);
}