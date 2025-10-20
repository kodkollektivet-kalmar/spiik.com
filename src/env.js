import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
	server: {
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
		PAYLOAD_SECRET: z.string(),
		DATABASE_URL: z.string(),
		UPLOADTHING_TOKEN: z.string(),
	},
	client: {
		// Public environment variables here...
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
		DATABASE_URL: process.env.DATABASE_URL,
		UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
	},
});

export { env };
