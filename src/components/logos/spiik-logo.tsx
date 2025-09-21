import Image from "next/image";

// Has to be exported as default for Payload CMS admin panel to work
export default function SpiikLogo() {
	return (
		<Image
			src="/spiik-logo-white.png"
			alt="Spiik logga"
			width={250}
			height={250}
			className="invert"
		/>
	);
}
