import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { collections } from "./collections/";
import { USERS } from "./collections/constants";
import { env } from "./env";
import { globals } from "./globals";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: collections.find((collection) => collection.slug === USERS)?.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
		components: {
			graphics: {
				Logo: "/components/logos/spiik-logo",
			},
		},
	},
	collections: collections,
	globals: globals,
	editor: lexicalEditor(),
	secret: env.PAYLOAD_SECRET,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: postgresAdapter({
		pool: {
			connectionString: env.DATABASE_URL,
		},
	}),
	sharp,
	plugins: [
		payloadCloudPlugin(),
		// storage-adapter-placeholder
	],
});
