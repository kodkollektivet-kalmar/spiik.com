import Image from "next/image";
import Link from "next/link";
import "./(frontend)/styles.css";

export default function NotFound() {
	return (
		<html lang="sv">
			<body>
				<div className="relative min-h-screen bg-white text-foreground">
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#FDE300_0%,#FF6A00_45%,#E43222_90%,white_120%)]" />

					<div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 text-center">
						<div className="mb-6">
							<h1 className="text-8xl font-black text-white drop-shadow-lg sm:text-9xl">
								404
							</h1>
							<div className="mt-2 h-1 w-24 bg-white/80 mx-auto rounded-full" />
						</div>

						<div className="mb-8 max-w-md">
							<h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
								Hoppsan! Sidan hittades inte
							</h2>
							<p className="text-lg text-white/90 leading-relaxed text-balance">
								Det verkar som att sidan du letar efter har försvunnit i
								cyberrymden. Kanske studerar den på distans?
							</p>
						</div>

						<div className="flex flex-col gap-4 sm:flex-row">
							<Link
								href="/"
								className="inline-flex items-center gap-2 rounded-full bg-white/90 px-8 py-4 text-sm font-semibold text-[#E43222] shadow-lg transition-all hover:scale-105 hover:bg-white hover:shadow-xl"
							>
								Tillbaka till hem
							</Link>
						</div>
					</div>
				</div>
			</body>
		</html>
	);
}
