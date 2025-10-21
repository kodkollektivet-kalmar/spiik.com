import type { Payload } from "payload";
import { getPayload } from "payload";
import { HeroSection } from "@/components/hero-section";
import { PageSection } from "@/components/page-section";
import { HOUSING_PAGE } from "@/globals/constants";
import config from "@/payload.config";
import type { HousingPage as HousingPageType } from "@/payload-types";

// Revalidate this page every week (604800 seconds)
export const revalidate = 604800;

export { metadata } from "./metadata";

export default async function HousingPage() {
	const payload: Payload = await getPayload({ config: await config });
	const housing = (await payload.findGlobal({
		slug: HOUSING_PAGE,
		depth: 2,
	})) as HousingPageType;

	const heroTitle = housing.heroTitle?.trim() ?? "Boende";
	const heroSubtitle =
		housing.heroSubtitle?.trim() ??
		"Information om boende för SPIIK-medlemmar.";
	const sections = housing.sections ?? [];

	return (
		<div className="relative overflow-hidden bg-white text-foreground">
			<HeroSection
				title={heroTitle}
				subtitle={heroSubtitle}
				image={housing.heroImage}
				badge={housing.heroBadge}
			/>

			{sections.map((section, index) => (
				<PageSection
					key={section.id ?? `section-${index}`}
					section={section}
					index={index}
				/>
			))}
		</div>
	);
}
