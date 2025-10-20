"use client";

import type { ComponentProps } from "react";

type GoogleMapProps = {
	src: string;
	title: string;
} & Omit<ComponentProps<"iframe">, "src" | "title">;

function GoogleMap({ src, title, ...rest }: GoogleMapProps) {
	return (
		<iframe
			className="h-full w-full"
			src={src}
			loading="lazy"
			style={{ border: 0 }}
			allowFullScreen
			title={title}
			{...rest}
		/>
	);
}

export { GoogleMap };
export type { GoogleMapProps };
