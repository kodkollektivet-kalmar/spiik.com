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
			fields: [
				{ name: "platform", type: "text", required: true },
				{ name: "url", type: "text", required: true },
			],
		},
	],
};
