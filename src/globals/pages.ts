import type { GlobalConfig } from "payload";
import { MEDIA } from "../collections/constants";
import { BOARD_PAGE, EDUCATION_PAGE, INTRODUCTION_PAGE } from "./constants";

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
					{ name: "text", type: "textarea" },
					{ name: "image", type: "upload", relationTo: MEDIA },
					{ name: "ctaLabel", type: "text" },
					{ name: "ctaUrl", type: "text" },
				],
			},
		],
	};
}

const BoardPage = pageGlobal(BOARD_PAGE, "Styrelsen");
const IntroductionPage = pageGlobal(INTRODUCTION_PAGE, "Introduktion");
const EducationPage = pageGlobal(EDUCATION_PAGE, "Utbildning");

const pageGlobals = [BoardPage, IntroductionPage, EducationPage];

export { pageGlobals };
