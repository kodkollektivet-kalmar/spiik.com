import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "SPIIK",
		short_name: "SPIIK",
		description: "SPIIK webbplats",
		start_url: "/",
		display: "standalone",
		background_color: "#fff",
		theme_color: "#fff",
		orientation: "portrait",
		categories: ["education", "university", "student", "community"],
		lang: "sv-SE",
		icons: [
			{
				src: "/web-app-manifest-192x192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/web-app-manifest-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
	};
}
