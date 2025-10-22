import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
	server: {
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
		PAYLOAD_SECRET: z.string(),
		DATABASE_URL: z.string(),
		BLOB_READ_WRITE_TOKEN: z.string(),
	},
	client: {
		// Public environment variables here...
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
		DATABASE_URL: process.env.DATABASE_URL,
		BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
	},
});

export { env };
