import { Link } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-b from-cyan-50 via-sky-50 to-sky-200">
			<header className="p-4 h-20 sticky top-0 z-10 w-full flex justify-center items-center rounded-b-3xl ">

				<Link to="/" className="flex items-center gap-4">
					<div className="text-5xl font-bold caveat-brush-regular tracking-tight md:tracking-wide drop-shadow-[0_0px_1px_rgba(255,255,0,1)]">
						<span className="text-lime-500">avistand</span>
						<span className="text-orange-400">oo</span>
					</div>
				</Link>
				<div className="ml-auto h-10 flex items-center gap-4">
					
					<GoogleLogin />
				</div>
			</header>
			<main className="flex-grow p-6 w-96 mx-auto w-full">{children}</main>
			<footer className="p-3 text-center rounded-t-3xl shadow-lg">
				&copy; 2025 Avistandoo
			</footer>
		</div>
	);
}
