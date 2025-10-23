import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";

export default function GoogleLogin() {
	const user = useAuth().user;
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Cerrar dropdown al hacer click fuera
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		}

		if (isDropdownOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isDropdownOpen]);

	const handleLogout = () => {
		// TODO: Implementar logout en el backend y limpiar cookies
		window.location.href = "http://localhost:3000/api/auth/logout";
	};

	if (user) {
		console.log("Usuario autenticado:", user);
		return (
			<div className="flex items-center h-screen justify-center" ref={dropdownRef}>
				<div className="relative">
					<button
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						className="flex items-center focus:outline-none"
					>
						<img
							src={user.avatarURL || "/default-avatar.webp"}
							alt={user.name}
							className="w-16 h-16 rounded-full border-2 border-gray-300 shadow hover:border-lime-500 transition cursor-pointer"
							title={user.name}
						/>
					</button>

					{isDropdownOpen && (
						<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
							<div className="px-4 py-2 border-b border-gray-200">
								<p className="text-sm font-semibold text-gray-800">{user.name}</p>
								<p className="text-xs text-gray-500">@{user.username}</p>
							</div>

							<button
								onClick={() => {
									// TODO: Navegar al perfil
									console.log("Ir al perfil");
									setIsDropdownOpen(false);
								}}
								className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-lime-50 transition"
							>
								Ver perfil
							</button>

							<button
								onClick={handleLogout}
								className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
							>
								Cerrar sesión
							</button>
						</div>
					)}
				</div>
			</div>
		);
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<a
				href="http://localhost:3000/api/auth/google"
				className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow border hover:shadow-lg transition"
				title="Login with Google"
			>
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
					alt="Google"
					className="w-8 h-8"
				/>
			</a>
		</div>
	);
}
