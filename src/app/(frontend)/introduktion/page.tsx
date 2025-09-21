import Image from "next/image";
import type { Payload } from "payload";
import { getPayload } from "payload";
import { INTRODUCTION_PAGE } from "@/globals/constants";
import config from "@/payload.config";
import type { IntroductionPage as IntroductionPageType } from "@/payload-types";

export default async function IntroduktionPage() {
	const payload: Payload = await getPayload({ config: await config });
	const intro = (await payload.findGlobal({
		slug: INTRODUCTION_PAGE,
	})) as unknown as IntroductionPageType;

	return (
		<div style={{ padding: 24 }}>
			<h1>{intro.heroTitle ?? "Introduktion"}</h1>
			<p>{intro.heroSubtitle}</p>
			{intro.heroImage &&
				typeof intro.heroImage === "object" &&
				intro.heroImage.url && (
					<Image
						src={intro.heroImage.url}
						alt={intro.heroImage.alt ?? ""}
						width={1200}
						height={600}
						style={{ width: "100%", height: "auto", marginTop: 16 }}
					/>
				)}
			<div style={{ display: "grid", gap: 24, marginTop: 24 }}>
				{(intro.sections ?? []).map((s) => (
					<section
						key={s?.id ?? `${s?.title}-${s?.ctaUrl}`}
						style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}
					>
						<h3>{s?.title ?? ""}</h3>
						<p>{s?.text ?? ""}</p>
						{s?.image && typeof s.image === "object" && s.image.url && (
							<Image
								src={s.image.url}
								alt={s.image.alt ?? s.title ?? ""}
								width={1200}
								height={600}
								style={{ width: "100%", height: "auto", marginTop: 12 }}
							/>
						)}
						{s?.ctaUrl && s?.ctaLabel && (
							<p style={{ marginTop: 8 }}>
								<a href={s.ctaUrl}>{s.ctaLabel}</a>
							</p>
						)}
					</section>
				))}
			</div>
		</div>
	);
}
