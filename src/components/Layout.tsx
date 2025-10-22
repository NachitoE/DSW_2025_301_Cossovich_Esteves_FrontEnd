import { Link } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import AdminDashboardButton from "@admin/AdminDashboardButton";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-br from-lime-100 via-blue-100 to-lime-300">
			<header className="p-4 h-20 sticky top-0 z-10 w-full flex justify-center items-center rounded-b-3xl ">
				<Link to="/" className="flex items-center gap-4">
					<div className="text-5xl font-extrabold queensides-font drop-shadow-[0_0px_2px_rgba(0,0,0,1)]">
						<span className="text-lime-500">avistand</span>
						<span className="text-blue-700">oo</span>
					</div>
				</Link>
				<div className="ml-auto h-10 flex items-center gap-4">
					
					<AdminDashboardButton />
					<GoogleLogin />
				</div>
			</header>
			<main className="flex-grow p-6 max-w-6xl mx-auto w-full">{children}</main>
			<footer className="bg-lime-700 text-white p-3 text-center rounded-t-3xl shadow-lg">
				&copy; 2025 Avistandoo
			</footer>
		</div>
	);
}
