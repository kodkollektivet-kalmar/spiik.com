import type { GlobalConfig } from "payload";
import { MEDIA } from "../collections/constants";
import { BOARD_PAGE, INTRODUCTION_PAGE } from "./constants";

function pageGlobal(slug: string, label: string): GlobalConfig {
	return {
		slug,
		admin: { group: "Content", description: `${label} page content` },
		fields: [
			{ name: "heroTitle", type: "text" },
			{ name: "heroSubtitle", type: "text" },
			{ name: "heroImage", type: "upload", relationTo: MEDIA },
			{
				name: "sections",
				type: "array",
				labels: { singular: "Section", plural: "Sections" },
				fields: [
					{ name: "title", type: "text" },
					{ name: "text", type: "richText" },
					{ name: "image", type: "upload", relationTo: MEDIA },
					{ name: "ctaLabel", type: "text" },
					{ name: "ctaUrl", type: "text" },
				],
			},
		],
	};
}

function introductionPage(slug: string, label: string): GlobalConfig {
	const baseConfig = pageGlobal(slug, label);

	return {
		...baseConfig,
		fields: [
			...baseConfig.fields,
			{
				name: "membershipTiers",
				type: "array",
				labels: { singular: "Membership Tier", plural: "Membership Tiers" },
				fields: [
					{ name: "label", type: "text", required: true },
					{ name: "title", type: "text", required: true },
					{ name: "description", type: "textarea", required: true },
					{
						name: "prices",
						type: "array",
						labels: { singular: "Price", plural: "Prices" },
						fields: [
							{
								name: "years",
								type: "select",
								options: [
									{ label: "1 år", value: "1" },
									{ label: "2 år", value: "2" },
									{ label: "3 år", value: "3" },
								],
								required: true,
							},
							{ name: "amount", type: "text", required: true },
						],
						minRows: 1,
						maxRows: 3,
					},
					{
						name: "gradient",
						type: "select",
						options: [
							{
								label: "Default (Warm Orange)",
								value: "from-[#FFF4DE] via-white to-[#FFE6C8]",
							},
							{
								label: "Cool Blue",
								value: "from-[#EAE9FF] via-white to-[#D9F1FF]",
							},
							{
								label: "Soft Red",
								value: "from-[#FFE8E8] via-white to-[#FFE0E0]",
							},
							{
								label: "Fresh Green",
								value: "from-[#E8F5E8] via-white to-[#E0F0E0]",
							},
						],
						defaultValue: "from-[#FFF4DE] via-white to-[#FFE6C8]",
					},
				],
			},
		],
	};
}

const BoardPage = pageGlobal(BOARD_PAGE, "Styrelsen");
const IntroductionPage = introductionPage(INTRODUCTION_PAGE, "Introduktion");

const pageGlobals = [BoardPage, IntroductionPage];

export { pageGlobals };
