import "./styles.css";
import { Footer } from "@/components/footer";
import ServerNav from "@/components/server-nav";

export const metadata = {
	description: "A blank template using Payload in a Next.js app.",
	title: "Payload Blank Template",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
	const { children } = props;

	return (
		<html lang="en">
			<body>
				<main className="relative">{children}</main>
				<Footer />
				<ServerNav />
			</body>
		</html>
	);
}
