import type { Payload } from "payload";
import { getPayload } from "payload";
import { HeroSection } from "@/components/hero-section";
import { PageSection, type Section } from "@/components/page-section";
import { KODKOLLEKTIVET_PAGE } from "@/globals/constants";
import config from "@/payload.config";
import type { KodkollektivetPage as KodkollektivetPageType } from "@/payload-types";

// Revalidate this page every week (604800 seconds)
export const revalidate = 604800;

export { metadata } from "./metadata";

export default async function KodkollektivetPage() {
	const payload: Payload = await getPayload({ config: await config });
	const kodkollektivet = (await payload.findGlobal({
		slug: KODKOLLEKTIVET_PAGE,
		depth: 2,
	})) as KodkollektivetPageType;

	const heroTitle = kodkollektivet.heroTitle?.trim() ?? "Kodkollektivet";
	const heroSubtitle =
		kodkollektivet.heroSubtitle?.trim() ??
		"Vår utvecklargrupp dedikerad till innovation och kodkvalitet.";
	const sections = kodkollektivet.sections ?? [];

	return (
		<div className="relative overflow-hidden bg-white text-foreground">
			<HeroSection
				title={heroTitle}
				subtitle={heroSubtitle}
				image={kodkollektivet.heroImage}
				badge={kodkollektivet.heroBadge}
			/>

			{sections.map((section: Section, index: number) => (
				<PageSection
					key={section.id ?? `section-${index}`}
					section={section}
					index={index}
				/>
			))}
		</div>
	);
}
