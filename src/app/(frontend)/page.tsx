import { ChevronDown, MoveDown } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import "./styles.css";
import type { Payload } from "payload";
import { getPayload } from "payload";
import { PROGRAMS } from "@/collections/constants";
import config from "@/payload.config";

// Revalidate this page every week (604800 seconds)
export const revalidate = 604800;

export { metadata } from "./metadata";

export default async function HomePage() {
	const payload: Payload = await getPayload({ config: await config });
	const programsRes = await payload.find({
		collection: PROGRAMS,
		sort: "order",
	});
	const programs = (
		programsRes as unknown as {
			docs: Array<{
				id: number;
				code: string;
				name: string;
				degree?: string | null;
				description?: string | null;
				url: string;
				color?: string | null;
			}>;
		}
	).docs;

	return (
		<>
			<div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[160vh] hero-gradient mask-bottom-fade" />
			{/* Hero */}
			<section className="relative mx-auto flex min-h-screen w-full flex-col items-center justify-center px-5 py-20">
				{/* Logo */}
				<Image
					src="/spiik-logo.png"
					alt="SPIIK"
					width={300}
					height={300}
					className="w-auto px-16"
					priority
					quality={60}
					sizes="(max-width: 640px) 200px, (max-width: 1024px) 260px, 300px"
				/>

				{/* Headline */}
				<h1 className="my-16 text-center text-3xl font-extrabold leading-tight text-white sm:text-4xl">
					Studentföreningen
					<br />
					<span className="text-[#fff275]">Prima Ingenjörer</span>
					<br />i Kalmar
				</h1>

				{/* Skrolla hint (bottom-right) */}
				<div className="pointer-events-none absolute bottom-7 right-4 flex items-end gap-1 text-white/90 sm:right-3">
					<div className="flex flex-col items-center justify-end">
						<ChevronDown className="h-4 w-4" aria-hidden />
						<ChevronDown className="h-4 w-4 -mt-1" aria-hidden />
					</div>
					<span className="text-sm font-semibold tracking-wide [writing-mode:vertical-rl]">
						Skrolla
					</span>
				</div>
			</section>

			{/* Content sections - follow mock closely */}
			<section>
				<div className="mx-auto w-full max-w-screen-sm px-5 py-20 sm:max-w-screen-md">
					{/* Välkommen
					<div className="mb-16">
						<h2 className="text-3xl font-bold leading-snug text-white">
							Välkommen till <span className="text-[#FDE300]">SPIIK</span>
						</h2>
						<p className="mt-2 text-lg text-balance leading-relaxed text-white/80">
							Här hittar du info om oss, vår styrelse och vad vi arbetar med
						</p>
					</div> */}

					{/* Vilka är vi? */}
					<div className="mb-10 flex flex-col items-center">
						<h2 className="mb-3 text-4xl font-semibold text-white">
							Vilka är vi?
						</h2>
						<Image
							src="/kalle.png"
							alt="SPIIK"
							width={1000}
							height={1000}
							className="rounded-3xl object-cover h-[70vh]"
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
							quality={75}
						/>
						<p className="mt-3 text-center text-foreground/80">
							SPIIK är en utbildningsförening under Linnéuniversitetets
							studentkår, Linnékåren.
						</p>
						<div className="mt-10 flex flex-col items-center text-zinc-500">
							<MoveDown className="-mt-1 h-10 w-10" />
						</div>
					</div>

					{/* Vart finns vi? */}
					<div className="mb-10 flex flex-col items-center">
						<h2 className="mb-3 text-4xl font-semibold text-spiik-red">
							Vart finns vi?
						</h2>
						<div className="h-[70vh] w-full overflow-hidden rounded-3xl ring-1 ring-black/5 shadow-xl">
							{(() => {
								const GoogleMap = dynamic(() =>
									import("@/components/google-map").then((m) => m.GoogleMap),
								);
								return (
									<GoogleMap
										src="https://www.google.com/maps/d/embed?mid=1_1o4t-ET9iWjq4iadIJxW6qPcVb1xoc&ehbc=2E312F"
										title="Våning 4 i hus Magna"
									/>
								);
							})()}
						</div>
						<p className="mt-2 text-center text-sm font-semibold">
							Våning 4 i hus Magna
						</p>
						<div className="mt-10 flex flex-col items-center text-zinc-500">
							<MoveDown className="-mt-1 h-10 w-10" />
						</div>
					</div>

					{/* Utbildningar prompt */}
					<div className="mb-6 flex flex-col items-center">
						<h2 className="text-4xl mb-3 font-semibold text-spiik-yellow">
							Utbildningar!
						</h2>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							{programs.map((p) => (
								<div
									key={p.id}
									className="rounded-xl bg-white p-5 shadow-xl ring-1 ring-black/5"
								>
									<div className="flex items-center gap-3">
										<div
											className="flex h-10 w-10 items-center justify-center rounded-md text-sm font-extrabold"
											style={{
												backgroundColor: p.color || "#e7f0ff",
												color: "#111",
											}}
										>
											{p.code}
										</div>
										<div>
											<h4 className="text-base font-semibold leading-tight">
												{p.name}
											</h4>
											{p.degree && (
												<p className="text-xs text-foreground/60">{p.degree}</p>
											)}
										</div>
									</div>
									{p.description && (
										<p className="mt-3 text-sm leading-6 text-foreground/80">
											{p.description}
										</p>
									)}
									<a
										href={p.url}
										target="_blank"
										rel="noreferrer"
										className="mt-3 inline-flex text-sm font-semibold text-[#c1121f] hover:underline"
									>
										Läs mer →
									</a>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
