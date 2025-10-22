import { revalidatePath } from "next/cache";

export async function revalidatePages({
	collection,
	global,
}: {
	collection?: string;
	global?: string;
}) {
	const revalidatedPaths: string[] = [];

	try {
		// Revalidate specific pages based on what was updated
		if (global) {
			// Revalidate pages based on global slug
			switch (global) {
				case "introduction-page":
					revalidatePath("/introduktion");
					revalidatedPaths.push("/introduktion");
					break;
				case "board-page":
					revalidatePath("/styrelsen");
					revalidatedPaths.push("/styrelsen");
					break;
				case "housing-page":
					revalidatePath("/boende");
					revalidatedPaths.push("/boende");
					break;
				case "membership-page":
					revalidatePath("/medlemskap");
					revalidatedPaths.push("/medlemskap");
					break;
				case "sponsors-page":
					revalidatePath("/sponsorer");
					revalidatedPaths.push("/sponsorer");
					break;
				case "statutes-page":
					revalidatePath("/stadgar");
					revalidatedPaths.push("/stadgar");
					break;
				case "kodkollektivet-page":
					revalidatePath("/kodkollektivet");
					revalidatedPaths.push("/kodkollektivet");
					break;
				case "site-settings":
					// Site settings affect all pages
					revalidatePath("/", "layout");
					revalidatedPaths.push("/ (layout)");
					break;
				case "navigation":
					// Navigation affects all pages
					revalidatePath("/", "layout");
					revalidatedPaths.push("/ (layout)");
					break;
			}
		}

		if (collection) {
			// Revalidate pages based on collection changes
			switch (collection) {
				case "programs":
					// Programs affect the home page
					revalidatePath("/");
					revalidatedPaths.push("/");
					break;
				case "board-members":
					// Board members affect the board page
					revalidatePath("/styrelsen");
					revalidatedPaths.push("/styrelsen");
					break;
				case "media":
					// Media changes can affect any page, so revalidate all
					revalidatePath("/", "layout");
					revalidatedPaths.push("/ (layout)");
					break;
			}
		}

		// Also revalidate the home page for any global changes (except site-wide changes)
		if (global && !["site-settings", "navigation"].includes(global)) {
			revalidatePath("/");
			revalidatedPaths.push("/");
		}

		console.log("Revalidated paths:", revalidatedPaths);
		return revalidatedPaths;
	} catch (error) {
		console.error("Revalidation error:", error);
		throw error;
	}
}
