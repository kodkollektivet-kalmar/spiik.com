import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Payload } from "payload";
import { getPayload } from "payload";
import { SPONSORS_PAGE } from "@/globals/constants";
import { richTextStyles } from "@/lib/rich-text-styles";
import config from "@/payload.config";
import type { SponsorsPage as SponsorsPageType } from "@/payload-types";

// Revalidate this page every week (604800 seconds)
export const revalidate = 604800;

export default async function SponsorsPage() {
	const payload: Payload = await getPayload({ config: await config });
	const sponsors = (await payload.findGlobal({
		slug: SPONSORS_PAGE,
		depth: 2,
	})) as SponsorsPageType;

	return (
		<div className="relative overflow-hidden bg-white text-foreground">
			{sponsors.content && (
				<section className="py-20">
					<div className="mx-auto max-w-screen-xl px-5 sm:px-10">
						<div className="mx-auto max-w-4xl">
							<div
								className={`prose prose-lg max-w-none text-foreground/80 ${richTextStyles}`}
							>
								<RichText data={sponsors.content} />
							</div>
						</div>
					</div>
				</section>
			)}
		</div>
	);
}
