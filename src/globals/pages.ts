import type { GlobalConfig } from "payload";
import { revalidatePages } from "@/lib/revalidate-pages";
import {
	BOARD_PAGE,
	HOUSING_PAGE,
	INTRODUCTION_PAGE,
	MEMBERSHIP_PAGE,
	SPONSORS_PAGE,
	STATUTES_PAGE,
} from "./constants";
import {
	carouselImagesField,
	heroFields,
	membershipLinkFields,
	membershipTiersField,
	sectionsField,
} from "./fields";

function pageGlobal(slug: string, label: string): GlobalConfig {
	return {
		slug,
		admin: { group: "Content", description: `${label} page content` },
		fields: [...heroFields, sectionsField],
		hooks: {
			afterChange: [
				async () => {
					console.log(`Global ${slug} updated`);
					await revalidatePages({ global: slug });
				},
			],
		},
	};
}

function introductionPage(slug: string, label: string): GlobalConfig {
	const baseConfig = pageGlobal(slug, label);

	return {
		...baseConfig,
		fields: [
			...baseConfig.fields,
			...membershipLinkFields,
			membershipTiersField,
			carouselImagesField,
		],
		hooks: {
			afterChange: [
				async () => {
					console.log(`Global ${slug} updated`);
					await revalidatePages({ global: slug });
				},
			],
		},
	};
}

function membershipPage(slug: string, label: string): GlobalConfig {
	const baseConfig = pageGlobal(slug, label);

	return {
		...baseConfig,
		fields: [
			...baseConfig.fields,
			...membershipLinkFields,
			membershipTiersField,
		],
		hooks: {
			afterChange: [
				async () => {
					console.log(`Global ${slug} updated`);
					await revalidatePages({ global: slug });
				},
			],
		},
	};
}

function richTextPage(slug: string, label: string): GlobalConfig {
	return {
		slug,
		admin: { group: "Content", description: `${label} page content` },
		fields: [
			...heroFields,
			{
				name: "content",
				type: "richText",
				label: "Content",
				admin: {
					description: "Main content for this page",
				},
			},
		],
		hooks: {
			afterChange: [
				async () => {
					console.log(`Global ${slug} updated`);
					await revalidatePages({ global: slug });
				},
			],
		},
	};
}

const BoardPage = pageGlobal(BOARD_PAGE, "Styrelsen");
const IntroductionPage = introductionPage(INTRODUCTION_PAGE, "Introduktion");
const HousingPage = pageGlobal(HOUSING_PAGE, "Boende");
const MembershipPage = membershipPage(MEMBERSHIP_PAGE, "Medlemskap");
const SponsorsPage = richTextPage(SPONSORS_PAGE, "Sponsorer");
const StatutesPage = richTextPage(STATUTES_PAGE, "Stadgar");

const pageGlobals = [
	BoardPage,
	IntroductionPage,
	HousingPage,
	MembershipPage,
	SponsorsPage,
	StatutesPage,
];

export { pageGlobals };
