import { Link } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex flex-col">
			<header className="bg-lime-fog text-white p-4 h-20 shadow-lg sticky top-0 z-10 w-2/3 self-center rounded-3xl">
				<Link to="/">
					<div className="text-center text-5xl text-gray-900">Avistandoo</div>
				</Link>
				<Link to="/create-bird">
					<div className="text-center text-5xl text-gray-900">Subir Ave</div>
				</Link>
				{/*
        <Link to="/">
          <img src="/assets/AvistandooLogo.png" className="object-cover" />
        </Link>
        */}
			</header>
			{/* max-h-1/2 rounded-3xl */}
			<main className="mt-4 mb-4 flex-grow p-4 bg-gradient-to-br from-white/10 via-green-400/50 to-white/10 backdrop-blur-md w-11/12 self-center shadow-lg shadow-gray-500 rounded-3xl">
				{children}
			</main>
			<footer className="bg-reef-dark text-white p-2 text-center">
				&copy; 2025 Avistandoo
			</footer>
		</div>
	);
}
