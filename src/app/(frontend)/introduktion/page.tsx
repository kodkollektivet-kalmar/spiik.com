import Image from "next/image";
import type { Payload } from "payload";
import { getPayload } from "payload";
import { MembershipTierCard } from "@/components/membership-tier-card";
import { PageSection } from "@/components/page-section";
import { INTRODUCTION_PAGE } from "@/globals/constants";
import config from "@/payload.config";
import type { IntroductionPage as IntroductionPageType } from "@/payload-types";

const gradientPalette = [
	"from-[#FFF4DE] via-white to-[#FFE6C8]",
	"from-[#EAE9FF] via-white to-[#D9F1FF]",
	"from-[#FFE8F2] via-white to-[#FFF3E0]",
	"from-[#E9FFF6] via-white to-[#E0F3FF]",
];

export default async function IntroduktionPage() {
	const payload: Payload = await getPayload({ config: await config });
	const intro = (await payload.findGlobal({
		slug: INTRODUCTION_PAGE,
		depth: 2,
	})) as IntroductionPageType;

	const heroTitle = intro.heroTitle?.trim() ?? "Introduktionen";
	const heroSubtitle =
		intro.heroSubtitle?.trim() ?? "Välkommen till SPIIKs introduktionsperiod.";
	const heroImage =
		typeof intro.heroImage === "object" && intro.heroImage !== null
			? intro.heroImage
			: null;
	const sections = intro.sections ?? [];
	const membershipTiers = intro.membershipTiers ?? [];

	return (
		<div className="relative overflow-hidden bg-white text-foreground">
			<section className="relative mx-auto flex min-h-[65vh] w-full flex-col items-center justify-center overflow-hidden rounded-b-2xl px-6 py-32 text-center sm:px-10">
				<div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,#FDE300_0%,#FF6A00_45%,#E43222_90%,white_120%)]" />
				{heroImage?.url && (
					<div className="pointer-events-none absolute inset-0 z-10 rounded-b-2xl">
						<Image
							src={heroImage.url}
							alt={heroImage.alt ?? heroTitle}
							fill
							priority
							className="rounded-b-2xl object-cover object-center"
						/>
						<div className="absolute inset-0 z-20 rounded-b-2xl bg-gradient-to-b from-black/55 via-black/35 to-black/20" />
					</div>
				)}
				<div className="pointer-events-none absolute inset-0 z-30 bg-[url('/grain.png')] opacity-10" />
				<div className="relative z-40 flex max-w-screen-md flex-col items-center gap-4 text-center">
					<p className="text-xs uppercase tracking-[0.35em] text-[#c1121f]">
						SPIIK
					</p>
					<h1 className="text-4xl font-extrabold leading-snug text-white">
						{heroTitle}
					</h1>
					{heroSubtitle && (
						<p className="text-base leading-7 text-white/85">{heroSubtitle}</p>
					)}
				</div>
			</section>

			{/* {sections.length > 0 && (
				<section className="py-20">
					<div className="mx-auto max-w-screen-xl px-5 sm:px-10">
						<div className="mx-auto max-w-3xl text-center">
							<h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
								{sections[0]?.title ?? "Medlemskap"}
							</h2>
							<p className="mt-4 text-sm text-foreground/70">
								{sections[0]?.text ?? "Mer information kommer snart."}
							</p>
						</div>
					</div>
				</section>
			)} */}

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
					</div>
				</section>
			)}
		</div>
	);
}
