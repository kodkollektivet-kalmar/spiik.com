import type { CollectionConfig } from "payload";
import { STATUTES } from "./constants";

export const Statutes: CollectionConfig = {
	slug: STATUTES,
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "updatedAt"],
		group: "Content",
	},
	access: {
		read: () => true,
	},
	fields: [
		{ name: "title", type: "text", required: true },
		{ name: "content", type: "richText", label: "Innehåll" },
	],
	versions: { drafts: true },
};
