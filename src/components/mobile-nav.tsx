"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui";

type NavLink = { label: string; href: string; external?: boolean; id?: string };

type MobileNavProps = {
	links: NavLink[];
};

export function MobileNav(props: MobileNavProps) {
	const { links } = props;
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", onEsc);
		return () => document.removeEventListener("keydown", onEsc);
	}, []);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<button
				type="button"
				aria-label={open ? "Stäng meny" : "Öppna meny"}
				className="fixed left-1/2 -translate-x-1/2 bottom-7 h-16 w-16 rounded-full bg-white shadow-[0_8px_20px_rgba(0,0,0,0.25)] flex items-center justify-center gap-1 border-0 z-[60]"
				onClick={() => setOpen((v) => !v)}
			>
				{open ? (
					<X className="text-[#c1121f]" size={26} strokeWidth={3} />
				) : (
					<Menu className="text-[#c1121f]" size={26} strokeWidth={3} />
				)}
			</button>

			<SheetContent
				side="top"
				aria-label="Navigering"
				showClose={false}
				className="p-4 rounded-b-2xl"
			>
				<SheetHeader className="sr-only">
					<SheetTitle>Navigering</SheetTitle>
				</SheetHeader>
				<ul className="list-none m-0 p-0">
					{links.map((l) => (
						<li key={l.id ?? l.href} className="border-b border-border">
							{l.external ? (
								<Link
									href={l.href}
									target="_blank"
									rel="noreferrer"
									onClick={() => setOpen(false)}
									className="block py-3 font-bold text-foreground hover:text-[#c1121f]"
								>
									{l.label}
								</Link>
							) : (
								<Link
									href={l.href}
									onClick={() => setOpen(false)}
									className="block py-3 font-bold text-foreground hover:text-[#c1121f]"
								>
									{l.label}
								</Link>
							)}
						</li>
					))}
				</ul>
			</SheetContent>
		</Sheet>
	);
}
