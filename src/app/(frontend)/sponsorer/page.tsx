import type { Payload } from "payload";
import { getPayload } from "payload";
import { SponsorCard } from "@/components/sponsor-card";
import { SPONSORS_PAGE } from "@/globals/constants";
import config from "@/payload.config";
import type { SponsorsPage as SponsorsPageType } from "@/payload-types";

// Revalidate this page every week (604800 seconds)
export const revalidate = 604800;

export { metadata } from "./metadata";

export default async function SponsorsPage() {
	const payload: Payload = await getPayload({ config: await config });
	const sponsors = (await payload.findGlobal({
		slug: SPONSORS_PAGE,
		depth: 2,
	})) as SponsorsPageType;

	const sponsorsList = sponsors.sponsors ?? [];

	return (
		<div className="relative overflow-hidden bg-white text-foreground">
			{/* Hero Section */}
			<section className="py-20">
				<div className="mx-auto max-w-screen-xl px-5 sm:px-10">
					<div className="mx-auto max-w-3xl text-center">
						<p className="text-xs uppercase tracking-[0.32em] text-[#E43222]/70">
							Sponsorer
						</p>
						<h1 className="mt-3 text-3xl font-bold text-foreground text-balance sm:text-4xl">
							Våra generösa sponsorer
						</h1>
						<p className="mt-4 text-sm text-foreground/70">
							Tack till alla som stödjer SPIIK och våra studenter.
						</p>
					</div>
				</div>
			</section>

			{/* Sponsors List */}
			{sponsorsList.length > 0 && (
				<section className="pb-20">
					<div className="mx-auto max-w-screen-xl px-5 sm:px-10">
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{sponsorsList.map((sponsor, index) => (
								<SponsorCard
									key={sponsor?.id ?? `sponsor-${index}`}
									sponsor={sponsor}
								/>
							))}
						</div>
					</div>
				</section>
			)}
		</div>
	);
}
