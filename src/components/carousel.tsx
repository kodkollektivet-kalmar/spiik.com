"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Media } from "@/payload-types";

type CarouselProps = {
	images: Media[];
	className?: string;
};

function Carousel({ images, className = "" }: CarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	if (!images || images.length === 0) {
		return null;
	}

	const goToPrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1,
		);
	};

	const goToNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1,
		);
	};

	const goToSlide = (index: number) => {
		setCurrentIndex(index);
	};

	return (
		<div className={cn("relative w-full", className)}>
			{/* Main image container */}
			<div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#f1f2f4]">
				{images.map((image, index) => (
					<div
						key={`image-${image.id}-${index}`}
						className={cn(
							"absolute inset-0 transition-opacity duration-500",
							index === currentIndex ? "opacity-100" : "opacity-0",
						)}
					>
						<Image
							src={image.url || ""}
							alt={image.alt || `Carousel image ${index + 1}`}
							fill
							className="object-cover"
						/>
					</div>
				))}
			</div>

			{/* Navigation arrows */}
			{images.length > 1 && (
				<>
					<button
						onClick={goToPrevious}
						className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
						aria-label="Previous image"
						type="button"
					>
						<svg
							className="h-5 w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Previous image</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>
					<button
						onClick={goToNext}
						className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
						aria-label="Next image"
						type="button"
					>
						<svg
							className="h-5 w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Next image</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>
				</>
			)}

			{/* Dots indicator */}
			{images.length > 1 && (
				<div className="mt-4 flex justify-center gap-2">
					{images.map((image, index) => (
						<button
							key={`dot-${image.id}-${index}`}
							onClick={() => goToSlide(index)}
							className={cn(
								"h-2 w-2 rounded-full transition",
								index === currentIndex
									? "bg-[#c1121f]"
									: "bg-gray-300 hover:bg-gray-400",
							)}
							aria-label={`Go to image ${index + 1}`}
							type="button"
						/>
					))}
				</div>
			)}
		</div>
	);
}

export { Carousel };
export type { CarouselProps };
