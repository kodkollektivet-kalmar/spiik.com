import type { GlobalConfig } from "payload";
import { revalidatePages } from "@/lib/revalidate-pages";
import { MEDIA } from "../collections/constants";
import { SITE_SETTINGS } from "./constants";

export const SiteSettings: GlobalConfig = {
	slug: SITE_SETTINGS,
	admin: { group: "Settings" },
	fields: [
		{
			name: "siteName",
			type: "text",
			required: true,
			admin: {
				description:
					"Organization name used in footer copyright notice. Example: © 2024 SPIIK. Alla rättigheter förbehållna.",
			},
		},
		{
			name: "logo",
			type: "upload",
			relationTo: MEDIA,
			admin: {
				description:
					"Logo displayed in the footer (top left). Falls back to default SPIIK logo if not set.",
			},
		},
		{
			name: "contactEmail",
			type: "email",
			admin: {
				description:
					"Email address displayed as a clickable link in the footer. Users can click to send an email.",
			},
		},
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
			admin: {
				description:
					"Social media links displayed in the footer. These links are used to direct users to your social media profiles.",
			},
		},
	],
	hooks: {
		afterChange: [
			async () => {
				console.log("Site settings updated");
				await revalidatePages({ global: SITE_SETTINGS });
			},
		],
	},
};
