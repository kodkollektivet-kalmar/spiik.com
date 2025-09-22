import type { Payload } from "payload";
import { getPayload } from "payload";
import { MobileNav } from "@/components/mobile-nav";
import config from "@/payload.config";

export default async function ServerNav() {
	const payload: Payload = await getPayload({ config: await config });
	const nav = await payload.findGlobal({ slug: "navigation" });

	const links = (nav?.main ?? []) as Array<{
		label: string;
		href: string;
		external?: boolean;
		id?: string;
	}>;

	return (
		<>
			{/* Desktop nav */}
			<nav className="hidden md:block fixed top-3 left-1/2 -translate-x-1/2 z-[70]">
				<ul className="flex items-center gap-6 rounded-full bg-white/90 px-4 py-2 shadow">
					{links.map((l) => (
						<li key={l.id ?? l.href}>
							{l.external ? (
								<a
									href={l.href}
									target="_blank"
									rel="noreferrer"
									className="text-sm font-semibold hover:text-[#c1121f]"
								>
									{l.label}
								</a>
							) : (
								<a
									href={l.href}
									className="text-sm font-semibold hover:text-[#c1121f]"
								>
									{l.label}
								</a>
							)}
						</li>
					))}
				</ul>
			</nav>

			{/* Mobile FAB + sheet */}
			<div className="md:hidden">
				<MobileNav links={links} />
			</div>
		</>
	);
}
