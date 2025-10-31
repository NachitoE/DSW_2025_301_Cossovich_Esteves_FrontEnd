import Header from "./Header";
import MainRenderer from "./MainRenderer";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-b from-cyan-50 via-sky-50 to-sky-200">
			<Header></Header>
			<MainRenderer children={children}></MainRenderer>
			{/*
			<footer className="p-3 text-center rounded-t-3xl shadow-lg">
				&copy; 2025 Avistandoo
			</footer>
			*/}
		</div>
	);
}
