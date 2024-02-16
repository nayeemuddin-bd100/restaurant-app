import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Notification from "@/app/components/Notification";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "./components/providers/AuthProvider";
import ToastProvider from "./providers/ToastProvider";
import QueryProvider from "./providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "PizzaKing",
	description: "Best Pizza in Town",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>
					<QueryProvider>
						<ToastProvider />
						<Notification />
						<Navbar />
						{children}
						<Footer />
					</QueryProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
