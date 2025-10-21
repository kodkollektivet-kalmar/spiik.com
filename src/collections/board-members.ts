import type { CollectionConfig } from "payload";
import { revalidatePages } from "@/lib/revalidate-pages";
import { BOARD_MEMBERS, MEDIA, PROGRAMS } from "./constants";

const positions = [
	"Ordförande",
	"Vice ordförande",
	"Sexmästare",
	"SSUA",
	"Kassör",
	"Vice kassör",
	"Sekreterare",
	"Informationsansvarig",
	"Kårhusansvarig",
	"The Big Boss",
] as const;

const emails = [
	"ordf@spiik.com",
	"viceordf@spiik.com",
	"sexmaster@spiik.com",
	"vordfuu@spiik.com",
	"kassor@spiik.com",
	"vkassor@spiik.com",
	"sekreterare@spiik.com",
	"socialamedier@spiik.com",
	"karhus@spiik.com",
	"styrelsen@spiik.com",
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
			type: "select",
			options: emails.map((email) => ({ label: email, value: email })),
		},
		{
			name: "position",
			type: "select",
			options: positions.map((label) => ({ label, value: label })),
			required: true,
		},
		{
			name: "studies",
			type: "relationship",
			relationTo: PROGRAMS,
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
