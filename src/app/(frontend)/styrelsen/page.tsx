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
		<div style={{ padding: 24 }}>
			<h1>{boardPage.heroTitle ?? "Styrelsen"}</h1>
			<p>{boardPage.heroSubtitle}</p>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
					gap: 24,
					marginTop: 24,
				}}
			>
				{members?.map((m) => (
					<article
						key={m.id}
						style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}
					>
						{typeof m.image === "object" && m.image?.url && (
							<Image
								src={m.image.url}
								alt={m.image.alt ?? m.name}
								width={500}
								height={600}
								style={{ width: "100%", height: "auto" }}
							/>
						)}
						<h3 style={{ marginTop: 8 }}>{m.name}</h3>
						<p>{m.position}</p>
						{m.studies && <p>Studerar: {m.studies}</p>}
						{m.message && <p>Meddelande: {m.message}</p>}
						{m.quote && <p>"{m.quote}"</p>}
						{m.merit && <p>Merit: {m.merit}</p>}
						{m.favoriteGame && <p>Favoritspel: {m.favoriteGame}</p>}
						{m.email && (
							<p>
								<a href={`mailto:${m.email}`}>{m.email}</a>
							</p>
						)}
					</article>
				))}
			</div>
		</div>
	);
}
