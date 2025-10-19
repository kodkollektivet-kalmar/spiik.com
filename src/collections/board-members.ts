import type { CollectionConfig } from "payload";
import { revalidatePages } from "@/lib/revalidate-pages";
import { BOARD_MEMBERS, MEDIA } from "./constants";

const positions = [
	"Ordförande",
	"Vice ordförande",
	"Kassör",
	"Sekreterare",
	"Eventansvarig",
	"PR-ansvarig",
	"Näringslivsansvarig",
	"Studierådsansvarig",
	"Webbansvarig",
	"Ledamot",
] as const;

export const BoardMembers: CollectionConfig = {
	slug: BOARD_MEMBERS,
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "position", "email"],
		listSearchableFields: ["name", "email", "position"],
		group: "Content",
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "email",
			type: "email",
		},
		{
			name: "position",
			type: "select",
			options: positions.map((label) => ({ label, value: label })),
			required: true,
		},
		{
			name: "studies",
			type: "text",
			label: "Studerar",
		},
		{
			name: "message",
			type: "textarea",
			label: "Meddelande",
		},
		{
			name: "quote",
			type: "textarea",
			label: "Citat",
		},
		{
			name: "merit",
			type: "text",
			label: "Merit",
		},
		{
			name: "favoriteGame",
			type: "text",
			label: "Favoritspel",
		},
		{
			name: "image",
			type: "upload",
			relationTo: MEDIA,
			required: true,
		},
		{
			name: "order",
			type: "number",
			admin: {
				position: "sidebar",
				description: "Used for manual ordering on the website",
			},
		},
	],
	versions: {
		drafts: true,
	},
	hooks: {
		afterChange: [
			async ({ doc, operation }) => {
				console.log(`Board member ${operation}:`, doc.name);
				await revalidatePages({ collection: BOARD_MEMBERS });
			},
		],
		afterDelete: [
			async ({ doc }) => {
				console.log(`Board member deleted:`, doc.name);
				await revalidatePages({ collection: BOARD_MEMBERS });
			},
		],
	},
};
