import type { CollectionConfig } from "payload";
import { PROGRAMS } from "./constants";

export const Programs: CollectionConfig = {
	slug: PROGRAMS,
	admin: {
		useAsTitle: "name",
		defaultColumns: ["code", "name", "degree", "url"],
		group: "Content",
	},
	access: { read: () => true },
	fields: [
		{ name: "code", type: "text", required: true },
		{ name: "name", type: "text", required: true },
		{
			name: "degree",
			type: "select",
			label: "Examen",
			options: [
				{ label: "Kandidatexamen", value: "Kandidatexamen" },
				{ label: "Master", value: "Master" },
				{ label: "Högskoleexamen", value: "Högskoleexamen" },
			],
		},
		{ name: "description", type: "textarea" },
		{ name: "url", type: "text", required: true },
		{
			name: "color",
			type: "select",
			label: "Badge color",
			defaultValue: "#FDE300",
			options: [
				{ label: "SPIIK Yellow", value: "#FDE300" },
				{ label: "SPIIK Orange", value: "#FF6A00" },
				{ label: "SPIIK Red", value: "#E43222" },
				{ label: "Light Blue", value: "#e7f0ff" },
				{ label: "Light Red", value: "#ffe8e5" },
				{ label: "Mint", value: "#ecfff3" },
				{ label: "Warm Yellow", value: "#fff6cc" },
				{ label: "White", value: "#ffffff" },
				{ label: "Gray", value: "#f3f4f6" },
			],
		},
		{ name: "order", type: "number" },
	],
};
