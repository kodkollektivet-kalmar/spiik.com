import type { GlobalConfig } from "payload";
import { MEDIA } from "../collections/constants";
import { SITE_SETTINGS } from "./constants";

export const SiteSettings: GlobalConfig = {
	slug: SITE_SETTINGS,
	admin: { group: "Settings" },
	fields: [
		{ name: "siteName", type: "text", required: true },
		{ name: "logo", type: "upload", relationTo: MEDIA },
		{ name: "contactEmail", type: "email" },
		{
			name: "socialLinks",
			type: "array",
			labels: {
				singular: "Social länk",
				plural: "Sociala länkar",
			},
			fields: [
				{
					name: "platform",
					type: "select",
					options: [
						{ label: "Instagram", value: "instagram" },
						{ label: "Facebook", value: "facebook" },
						{ label: "TikTok", value: "tiktok" },
						{ label: "LinkedIn", value: "linkedin" },
						{ label: "YouTube", value: "youtube" },
						{ label: "Spotify", value: "spotify" },
						{ label: "Discord", value: "discord" },
						{ label: "Webb", value: "web" },
					],
					required: true,
				},
				{ name: "label", type: "text", label: "Visningsnamn" },
				{ name: "url", type: "text", required: true },
				{
					name: "username",
					type: "text",
					label: "Användarnamn/handle",
				},
			],
		},
	],
};
