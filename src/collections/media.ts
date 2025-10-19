import type { CollectionConfig } from "payload";
import { revalidatePages } from "@/lib/revalidate-pages";
import { MEDIA } from "./constants";

export const Media: CollectionConfig = {
	slug: MEDIA,
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "alt",
			type: "text",
			required: true,
		},
	],
	upload: true,
	hooks: {
		afterChange: [
			async ({ doc, operation }) => {
				console.log(`Media ${operation}:`, doc.filename);
				await revalidatePages({ collection: MEDIA });
			},
		],
		afterDelete: [
			async ({ doc }) => {
				console.log(`Media deleted:`, doc.filename);
				await revalidatePages({ collection: MEDIA });
			},
		],
	},
};
