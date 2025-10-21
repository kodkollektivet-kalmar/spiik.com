import type { GlobalConfig } from "payload";
import { revalidatePages } from "@/lib/revalidate-pages";
import { NAVIGATION } from "./constants";

export const Navigation: GlobalConfig = {
	slug: NAVIGATION,
	admin: { group: "Settings" },
	fields: [
		{
			name: "main",
			type: "array",
			label: "Main navigation",
			fields: [
				{ name: "label", type: "text", required: true },
				{ name: "href", type: "text", required: true },
				{ name: "external", type: "checkbox", defaultValue: false },
			],
		},
		{
			name: "footer",
			type: "array",
			label: "Footer navigation",
			fields: [
				{ name: "label", type: "text", required: true },
				{ name: "href", type: "text", required: true },
				{ name: "external", type: "checkbox", defaultValue: false },
			],
		},
	],
	hooks: {
		afterChange: [
			async () => {
				console.log("Navigation updated");
				await revalidatePages({ global: NAVIGATION });
			},
		],
	},
};
