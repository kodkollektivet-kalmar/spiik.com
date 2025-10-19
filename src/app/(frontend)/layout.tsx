import "./styles.css";
import { Footer } from "@/components/footer";
import ServerNav from "@/components/server-nav";

export const metadata = {
	name: "apple-mobile-web-app-title",
	content: "SPIIK",
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
