import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Payload } from "payload";
import { getPayload } from "payload";
import { STATUTES_PAGE } from "@/globals/constants";
import { richTextStyles } from "@/lib/rich-text-styles";
import config from "@/payload.config";
import type { StatutesPage as StatutesPageType } from "@/payload-types";

// Revalidate this page every week (604800 seconds)
export const revalidate = 604800;

export { metadata } from "./metadata";

export default async function StatutesPage() {
	const payload: Payload = await getPayload({ config: await config });
	const statutes = (await payload.findGlobal({
		slug: STATUTES_PAGE,
		depth: 2,
	})) as StatutesPageType;

	return (
		<div className="relative overflow-hidden bg-white text-foreground">
			<section className="py-20">
				<div className="mx-auto max-w-screen-xl px-5 sm:px-10">
					<div className="mx-auto max-w-3xl text-center">
						<p className="text-xs uppercase tracking-[0.32em] text-[#E43222]/70">
							Stadgar
						</p>
						<h1 className="mt-3 text-3xl font-bold text-foreground text-balance sm:text-4xl">
							SPIIKs stadgar
						</h1>
						<p className="mt-4 text-sm text-foreground/70">
							Här hittar du alla officiella dokument som styr vår
							studentförening.
						</p>
					</div>
				</div>
			</section>

			{statutes.content && (
				<section className="py-20">
					<div className="mx-auto max-w-screen-xl px-5 sm:px-10">
						<div className="mx-auto max-w-4xl">
							<div
								className={`prose prose-lg max-w-none text-foreground/80 ${richTextStyles}`}
							>
								<RichText data={statutes.content} />
							</div>
						</div>
					</div>
				</section>
			)}
		</div>
	);
}
