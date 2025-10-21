import Image from "next/image";
import Link from "next/link";
import type { Payload } from "payload";
import { getPayload } from "payload";
import type { ComponentType } from "react";
import { FaGlobe } from "react-icons/fa";
import {
	SiDiscord,
	SiFacebook,
	SiInstagram,
	SiLinkedin,
	SiSpotify,
	SiTiktok,
	SiYoutube,
} from "react-icons/si";
import { NAVIGATION, SITE_SETTINGS } from "@/globals/constants";
import config from "@/payload.config";
import type { Media, Navigation, SiteSetting } from "@/payload-types";

type SocialPlatform =
	| "instagram"
	| "facebook"
	| "tiktok"
	| "linkedin"
	| "youtube"
	| "spotify"
	| "discord"
	| "web";

type FooterLink = {
	label: string;
	href: string;
	external?: boolean | null;
	id?: string | null;
};

type SocialLink = {
	platform: SocialPlatform;
	label?: string | null;
	username?: string | null;
	url: string;
	id?: string | null;
};

const iconClass = "h-4 w-4";

const platformMeta: Record<
	SocialPlatform,
	{ label: string; Icon: ComponentType<{ className?: string }> }
> = {
	instagram: { label: "Instagram", Icon: SiInstagram },
	facebook: { label: "Facebook", Icon: SiFacebook },
	tiktok: { label: "TikTok", Icon: SiTiktok },
	linkedin: { label: "LinkedIn", Icon: SiLinkedin },
	youtube: { label: "YouTube", Icon: SiYoutube },
	spotify: { label: "Spotify", Icon: SiSpotify },
	discord: { label: "Discord", Icon: SiDiscord },
	web: { label: "Webb", Icon: FaGlobe },
};

function isSocialPlatform(value: unknown): value is SocialPlatform {
	return typeof value === "string" && value in platformMeta;
}

function formatPlatform(link: SocialLink) {
	const meta = platformMeta[link.platform];
	const label =
		link.label?.trim() || (link.username ? `@${link.username}` : meta.label);
	return {
		label,
		Icon: meta.Icon,
	};
}

async function Footer() {
	const payload: Payload = await getPayload({ config: await config });
	const [navigation, siteSettings] = (await Promise.all([
		payload.findGlobal({ slug: NAVIGATION }),
		payload.findGlobal({ slug: SITE_SETTINGS }),
	])) as [Navigation, SiteSetting];

	const footerLinks: FooterLink[] = Array.isArray(navigation?.footer)
		? (navigation.footer.filter((link): link is FooterLink =>
				Boolean(link?.href && link?.label),
			) ?? [])
		: [];

	const socialLinks: SocialLink[] = Array.isArray(siteSettings?.socialLinks)
		? (siteSettings.socialLinks.filter((link): link is SocialLink =>
				Boolean(link?.url && isSocialPlatform(link?.platform)),
			) ?? [])
		: [];

	const siteName = siteSettings?.siteName ?? "SPIIK";
	const contactEmail = siteSettings?.contactEmail ?? "";
	const year = new Date().getFullYear();

	const logo = siteSettings?.logo;
	let logoUrl = "/spiik-logo-white.png";
	let logoAlt = siteName;

	if (
		logo &&
		typeof logo === "object" &&
		"url" in logo &&
		typeof (logo as Media).url === "string" &&
		(logo as Media).url
	) {
		const mediaLogo = logo as Media;
		logoUrl = mediaLogo.url ?? logoUrl;
		logoAlt = mediaLogo.alt ?? logoAlt;
	}

	return (
		<footer className="relative mt-24 border-t border-white/10 bg-[#0e101a] text-white">
			<div className="mx-auto w-full max-w-screen-xl px-6 py-16 pb-36 sm:px-10 md:pb-24">
				<div className="flex flex-col gap-12 md:flex-row md:justify-between">
					<div className="max-w-lg space-y-5">
						<Image
							src={logoUrl}
							alt={logoAlt}
							width={176}
							height={64}
							className="h-14 w-auto"
							priority={false}
						/>
						<p className="text-sm text-white/70">
							Studentföreningen Prima Ingenjörer i Kalmar sedan 1989.
						</p>
						{contactEmail && (
							<a
								href={`mailto:${contactEmail}`}
								className="inline-flex items-center gap-2 text-sm font-semibold text-[#ffd028] transition hover:text-white"
							>
								{contactEmail}
							</a>
						)}
					</div>
					<div className="grid gap-12 sm:grid-cols-2">
						{footerLinks.length > 0 && (
							<div>
								<p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/40">
									Navigering
								</p>
								<ul className="mt-4 space-y-3 text-sm">
									{footerLinks.map((link) => (
										<li key={link.id ?? link.href}>
											{link.external ? (
												<a
													href={link.href}
													target="_blank"
													rel="noreferrer"
													className="transition hover:text-[#ffd028]"
												>
													{link.label}
												</a>
											) : (
												<Link
													href={link.href}
													className="transition hover:text-[#ffd028]"
												>
													{link.label}
												</Link>
											)}
										</li>
									))}
								</ul>
							</div>
						)}
						{socialLinks.length > 0 && (
							<div className="col-span-2">
								<p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/40">
									Följ oss
								</p>
								<ul className="mt-4 space-y-3 text-sm">
									{socialLinks.map((link) => {
										const { label, Icon } = formatPlatform(link);
										return (
											<li key={link.id ?? link.url}>
												<a
													href={link.url}
													target="_blank"
													rel="noreferrer"
													className="flex items-center gap-2 transition hover:text-[#ffd028]"
												>
													<Icon className={iconClass} />
													{label}
												</a>
											</li>
										);
									})}
								</ul>
							</div>
						)}
					</div>
				</div>
				<div className="mt-16 flex flex-col gap-3 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
					<span>
						© {year} {siteName}. Alla rättigheter förbehållna.
					</span>
					<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
						<span>En del av Linnékåren.</span>
						<Link
							href="https://www.linkedin.com/in/vonzweigbergksamuel/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-white/20 transition hover:text-white/40"
						>
							{/** biome-ignore lint/suspicious/noCommentText: Not a comment */}
							// made by svz
						</Link>
					</div>
				</div>
			</div>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0e101a] to-transparent md:hidden"
			/>
		</footer>
	);
}

export { Footer };
