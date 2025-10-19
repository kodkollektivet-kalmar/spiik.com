import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Media } from "@/payload-types";

type HeroSectionProps = {
	title: string;
	subtitle?: string | null;
	image?: (number | null) | Media;
	badge?: string;
	className?: string;
	children?: ReactNode;
};

function HeroSection({
	title,
	subtitle,
	image,
	badge = "SPIIK",
	className = "",
	children,
}: HeroSectionProps) {
	const heroImage = typeof image === "object" && image !== null ? image : null;

	return (
		<section
			className={cn(
				"relative mx-auto flex min-h-[65vh] w-full flex-col items-center justify-center overflow-hidden rounded-b-3xl px-6 py-32 text-center sm:px-10",
				className,
			)}
		>
			{/* <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,#FDE300_0%,#FF6A00_45%,#E43222_90%,white_120%)]" /> */}

			{heroImage?.url && (
				<div className="pointer-events-none absolute inset-0 z-10 rounded-b-2xl">
					<Image
						src={heroImage.url}
						alt={heroImage.alt ?? title}
						fill
						priority
						className="rounded-b-2xl object-cover object-center"
					/>
					<div className="absolute inset-0 z-20 rounded-b-2xl bg-gradient-to-b from-black/70 via-black/55 to-black/40" />
				</div>
			)}

			<div className="pointer-events-none absolute inset-0 z-30 bg-[url('/grain.png')] opacity-10" />

			<div className="relative z-40 flex max-w-screen-md flex-col items-center gap-4 text-center">
				{badge && (
					<p className="text-xs uppercase tracking-[0.35em] text-[#c1121f]">
						{badge}
					</p>
				)}
				<h1 className="text-4xl font-extrabold leading-snug text-white">
					{title}
				</h1>
				{subtitle && (
					<p className="text-base leading-7 text-white/85">{subtitle}</p>
				)}
				{children}
			</div>
		</section>
	);
}

export { HeroSection, type HeroSectionProps };
