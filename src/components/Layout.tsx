import { Link } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-b from-cyan-50 via-sky-50 to-sky-200">
			<Header></Header>
			<main className="flex-grow p-6 w-96 mx-auto w-full">{children}</main>
			<footer className="p-3 text-center rounded-t-3xl shadow-lg">
				&copy; 2025 Avistandoo
			</footer>
		</div>
	);
}
