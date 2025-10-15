import Image from "next/image";
import type { Payload } from "payload";
import { getPayload } from "payload";
import { BOARD_MEMBERS } from "@/collections/constants";
import { BOARD_PAGE } from "@/globals/constants";
import config from "@/payload.config";

import type {
	BoardMember as BoardMemberType,
	BoardPage as BoardPageType,
} from "@/payload-types";

export default async function StyrelsenPage() {
	const payload: Payload = await getPayload({ config: await config });

	const boardPage = (await payload.findGlobal({
		slug: BOARD_PAGE,
	})) as unknown as BoardPageType;
	const membersResult = await payload.find({
		collection: BOARD_MEMBERS,
		limit: 100,
		pagination: false,
		sort: "order",
	});
	const members = (membersResult as unknown as { docs: BoardMemberType[] })
		.docs;

	return (
		<div className="relative min-h-screen bg-white">
			{/* Hero */}
			<section className="relative mx-auto flex w-full items-center justify-center overflow-hidden px-5 py-8 text-center sm:py-20">
				<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#FDE300_0%,#FF6A00_45%,#E43222_95%)] opacity-95" />
				<div className="max-w-screen-sm text-foreground">
					<p className="text-sm uppercase tracking-[0.25em] text-white/80">
						Styrelsen
					</p>
					<h1 className="mt-3 text-4xl font-extrabold leading-snug">
						{boardPage.heroTitle ?? "Möt SPIIKs styrelse"}
					</h1>
					{boardPage.heroSubtitle && (
						<p className="text-base leading-7 text-foreground/70">
							{boardPage.heroSubtitle}
						</p>
					)}
				</div>
			</section>

			{/* Members grid */}
			<section className="relative pb-24">
				<div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-6 px-5 sm:grid-cols-2 lg:grid-cols-3">
					{members.map((member) => {
						const image =
							typeof member.image === "object" && member.image !== null
								? member.image
								: null;

						return (
							<article
								key={member.id}
								className="flex h-full flex-col overflow-hidden rounded-3xl bg-white p-5 shadow-xl ring-1 ring-black/5"
							>
								<div className="relative mb-4 aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-100 to-zinc-200">
									{image?.url && (
										<Image
											src={image.url}
											alt={image.alt ?? member.name}
											fill
											className="object-cover"
											priority={false}
										/>
									)}
								</div>
								<div className="flex flex-col gap-2">
									<div>
										<h3 className="text-lg font-semibold text-foreground">
											{member.name}
										</h3>
										<p className="text-sm font-medium uppercase tracking-wide text-[#c1121f]">
											{member.position}
										</p>
									</div>

									{member.message && (
										<p className="text-sm leading-6 text-foreground/80">
											{member.message}
										</p>
									)}

									<div className="grid grid-cols-1 gap-1 text-sm text-foreground/60">
										{member.studies && <p>Studerar: {member.studies}</p>}
										{member.merit && <p>Merit: {member.merit}</p>}
										{member.favoriteGame && (
											<p>Favoritspel: {member.favoriteGame}</p>
										)}
									</div>

									{member.quote && (
										<blockquote className="mt-2 border-l-2 border-[#FDE300] pl-3 text-sm italic text-foreground/70">
											“{member.quote}”
										</blockquote>
									)}

									{member.email && (
										<a
											href={`mailto:${member.email}`}
											className="mt-3 inline-flex items-center justify-center rounded-full bg-[#c1121f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#a20e1b]"
										>
											Kontakta
										</a>
									)}
								</div>
							</article>
						);
					})}
				</div>
			</section>
		</div>
	);
}
