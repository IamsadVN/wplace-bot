import { config as LoadEnv } from "dotenv";

LoadEnv({
	quiet: true
});

const configEnv = {
	apiPort: Number(process.env.API_PORT),
	dbURL: process.env.DATABASE_URL
}

export default configEnv;