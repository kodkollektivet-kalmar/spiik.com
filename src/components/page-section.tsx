import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { richTextStyles } from "@/lib/rich-text-styles";
import { cn } from "@/lib/utils";
import type { Media } from "@/payload-types";

type Section = {
	title?: string | null;
	text?: {
		root: {
			type: string;
			children: {
				type: string;
				version: number;
				[k: string]: unknown;
			}[];
			direction: ("ltr" | "rtl") | null;
			format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
			indent: number;
			version: number;
		};
		[k: string]: unknown;
	} | null;
	image?: (number | null) | Media;
	ctaLabel?: string | null;
	ctaUrl?: string | null;
	id?: string | null;
};

type PageSectionProps = {
	section: Section;
	children?: ReactNode;
	className?: string;
	index?: number;
};

function PageSection({
	section,
	children,
	className = "",
	index = 0,
}: PageSectionProps) {
	const hasImage =
		section.image && typeof section.image === "object" && section.image.url;
	const hasCta = section.ctaLabel && section.ctaUrl;
	const hasText = section.text;

	const image =
		section.image && typeof section.image === "object" && section.image !== null
			? section.image
			: null;

	const isImageLeft = index % 2 === 0;

	return (
		<section className={`py-16 ${className}`}>
			<div className="mx-auto max-w-screen-xl">
				{hasImage && hasText ? (
					<div className="flex flex-col gap-0 lg:grid lg:grid-cols-2 lg:items-center">
						{/* Text content - always first on mobile */}
						<div
							className={`space-y-4 px-5 lg:px-8 ${isImageLeft ? "lg:col-start-2" : ""}`}
						>
							{section.title && (
								<h2 className="text-2xl font-semibold text-foreground">
									{section.title}
								</h2>
							)}
							<div
								className={`prose prose-sm max-w-none text-foreground/80 ${richTextStyles}`}
							>
								{hasText && section.text && <RichText data={section.text} />}
							</div>
							{hasCta && section.ctaUrl && (
								<Link
									href={section.ctaUrl}
									className="inline-flex text-sm font-semibold text-[#c1121f] hover:underline"
								>
									{section.ctaLabel}
								</Link>
							)}
							{children}
						</div>

						{/* Image - always second on mobile */}
						<div
							className={cn(
								"relative aspect-square overflow-hidden rounded-3xl bg-[#f1f2f4]",
								isImageLeft
									? "lg:col-start-1 lg:row-start-1"
									: "lg:col-start-2 lg:row-start-1",
							)}
						>
							<Image
								src={image?.url ?? ""}
								alt={image?.alt ?? section.title ?? ""}
								fill
								className="object-cover"
							/>
						</div>
					</div>
				) : (
					<div className="space-y-6 px-5">
						{section.title && (
							<h2 className="text-2xl font-semibold text-foreground">
								{section.title}
							</h2>
						)}
						{hasText && section.text && (
							<div
								className={cn(
									"prose prose-sm max-w-none text-foreground/80",
									richTextStyles,
								)}
							>
								<RichText data={section.text} />
							</div>
						)}
						{hasImage && image && image.url && (
							<div className="relative aspect-square overflow-hidden rounded-xl bg-[#f1f2f4]">
								<Image
									src={image?.url ?? ""}
									alt={image?.alt ?? section.title ?? ""}
									fill
									className="object-cover"
								/>
							</div>
						)}
						{hasCta && section.ctaUrl && (
							<Link
								href={section.ctaUrl}
								className="inline-flex text-sm font-semibold text-[#c1121f] hover:underline"
							>
								{section.ctaLabel}
							</Link>
						)}
						{children}
					</div>
				)}
			</div>
		</section>
	);
}

export { PageSection, type Section };
