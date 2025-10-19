import Link from "next/link";
import type { Payload } from "payload";
import { getPayload } from "payload";
import { HeroSection } from "@/components/hero-section";
import { MembershipTierCard } from "@/components/membership-tier-card";
import { PageSection } from "@/components/page-section";
import { MEMBERSHIP_PAGE } from "@/globals/constants";
import config from "@/payload.config";
import type { MembershipPage as MembershipPageType } from "@/payload-types";

// Revalidate this page every week (604800 seconds)
export const revalidate = 604800;

const gradientPalette = [
	"from-[#FFF4DE] via-white to-[#FFE6C8]",
	"from-[#EAE9FF] via-white to-[#D9F1FF]",
	"from-[#FFE8F2] via-white to-[#FFF3E0]",
	"from-[#E9FFF6] via-white to-[#E0F3FF]",
];

export default async function MembershipPage() {
	const payload: Payload = await getPayload({ config: await config });
	const membership = (await payload.findGlobal({
		slug: MEMBERSHIP_PAGE,
		depth: 2,
	})) as MembershipPageType;

	const heroTitle = membership.heroTitle?.trim() ?? "Medlemskap";
	const heroSubtitle =
		membership.heroSubtitle?.trim() ??
		"Bli medlem i SPIIK och få tillgång till alla fördelar.";
	const sections = membership.sections ?? [];
	const membershipTiers = membership.membershipTiers ?? [];
	const membershipLink = membership.membershipLink?.trim() ?? "";
	const membershipLinkDescription =
		membership.membershipLinkDescription?.trim() ?? "";

	return (
		<div className="relative overflow-hidden bg-white text-foreground">
			<HeroSection
				title={heroTitle}
				subtitle={heroSubtitle}
				image={membership.heroImage}
				badge={membership.heroBadge ?? "SPIIK"}
			/>

			{sections.map((section, index) => (
				<PageSection
					key={section.id ?? `section-${index}`}
					section={section}
					index={index}
				/>
			))}

			{membershipTiers.length > 0 && (
				<section className="py-20">
					<div className="mx-auto max-w-screen-xl px-5 sm:px-10">
						<div className="mx-auto max-w-3xl text-center">
							<p className="text-xs uppercase tracking-[0.32em] text-[#E43222]/70">
								Medlemskap
							</p>
							<h2 className="mt-3 text-3xl font-bold text-foreground text-balance sm:text-4xl">
								Välj det paket som passar dig
							</h2>
							<p className="mt-4 text-sm text-foreground/70">
								Utforska våra medlemskap och hitta den nivå som ger dig rätt
								stöd under introduktionen.
							</p>
						</div>
						<div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
							{membershipTiers.map((tier, index) => (
								<MembershipTierCard
									key={tier?.id ?? `tier-${index}`}
									label={tier?.label ?? "Medlemskap"}
									title={tier?.title ?? `Paket ${index + 1}`}
									description={
										tier?.description ?? "Mer information kommer snart."
									}
									gradient={
										tier?.gradient ??
										gradientPalette[index % gradientPalette.length]
									}
									prices={tier?.prices ?? []}
								/>
							))}
						</div>
						{membershipLink && (
							<div className="mt-12 flex justify-center">
								<Link
									href={membershipLink}
									className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#c1121f] to-[#a20e1b] px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:from-[#a20e1b] hover:to-[#8a0f16]"
									target="_blank"
								>
									<span>🎓</span>
									<span>Köp medlemskap här</span>
									<span>→</span>
								</Link>
							</div>
						)}
						{membershipLinkDescription && (
							<p className="mt-3 text-xs text-foreground/50 text-center max-w-md mx-auto text-balance">
								{membershipLinkDescription}
							</p>
						)}
					</div>
				</section>
			)}
		</div>
	);
}
