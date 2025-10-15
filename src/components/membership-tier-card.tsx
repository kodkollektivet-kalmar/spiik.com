import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PricingOption = {
	years: string;
	amount: string;
};

type MembershipTierCardProps = {
	label: string;
	title: string;
	description: string;
	prices: PricingOption[];
	gradient: string;
	children?: ReactNode;
};

function MembershipTierCard({
	label,
	title,
	description,
	prices,
	gradient,
	children,
}: MembershipTierCardProps) {
	const hasChildren = Boolean(children);

	return (
		<div
			className={cn(
				"rounded-3xl bg-gradient-to-br p-8 shadow-xl ring-1 ring-zinc-200/50 sm:p-12",
				gradient,
			)}
		>
			<div
				className={cn(
					"gap-8",
					hasChildren
						? "grid sm:grid-cols-[1.3fr_1fr] sm:items-start"
						: "flex flex-col",
				)}
			>
				<div className="space-y-4 text-foreground">
					<div className="space-y-2">
						{label && (
							<p className="text-xs uppercase tracking-[0.32em] pb-2 text-[#E43222]/70">
								{label}
							</p>
						)}
						<h2 className="text-2xl font-semibold text-[#2b1a08]">{title}</h2>
						{description && (
							<p className="text-sm leading-6 text-[#564c40]/90">
								{description}
							</p>
						)}
					</div>
					{prices.length > 0 && (
						<div className="space-y-3">
							{prices.length > 0 && (
								<div className="space-y-2">
									{prices.map((option) => (
										<div
											key={`${option.years}-${option.amount}`}
											className="flex items-center gap-2 text-sm"
										>
											<span className="text-[#c1121f]">🔨</span>
											<span className="font-medium text-[#2b1a08]">
												{option.amount} ({option.years} års medlemskap)
											</span>
										</div>
									))}
								</div>
							)}
						</div>
					)}
				</div>
				{hasChildren ? (
					<div className="flex items-center justify-center">{children}</div>
				) : null}
			</div>
		</div>
	);
}

export { MembershipTierCard };
