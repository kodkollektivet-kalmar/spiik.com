import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Media } from "@/payload-types";

type Sponsor = {
	logo?: (number | null) | Media;
	name?: string | null;
	description?: string | null;
	website?: string | null;
	id?: string | null;
};

type SponsorCardProps = {
	sponsor: Sponsor;
	children?: ReactNode;
	className?: string;
};

function SponsorCard({ sponsor, children, className = "" }: SponsorCardProps) {
	const logo =
		sponsor.logo && typeof sponsor.logo === "object" && sponsor.logo !== null
			? sponsor.logo
			: null;
	const hasWebsite = sponsor.website && sponsor.website.trim() !== "";

	const content = (
		<div
			className={cn(
				"flex items-center gap-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all",
				className,
			)}
		>
			{logo?.url && (
				<div className="flex-shrink-0 w-20 h-20 relative">
					<Image
						src={logo.url}
						alt={logo.alt || sponsor.name || "Sponsor logo"}
						fill
						className="object-contain"
					/>
				</div>
			)}

			<div className="flex-1 min-w-0">
				<h3 className="text-lg font-semibold text-foreground mb-2">
					{sponsor.name || "Sponsor"}
				</h3>
				{sponsor.description && (
					<p className="text-sm text-foreground/70 leading-relaxed">
						{sponsor.description}
					</p>
				)}
				{children}
			</div>

			{hasWebsite && (
				<div className="flex-shrink-0">
					<span className="text-xs text-[#c1121f] font-medium">→</span>
				</div>
			)}
		</div>
	);

	if (hasWebsite) {
		return (
			<Link
				href={sponsor.website ?? ""}
				target="_blank"
				rel="noopener noreferrer"
				className="block hover:scale-[1.02] transition-transform"
			>
				{content}
			</Link>
		);
	}

	return content;
}

export { SponsorCard };
export type { SponsorCardProps, Sponsor };
