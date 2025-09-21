import type { CollectionConfig } from "payload";
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
};
