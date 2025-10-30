import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { isAdmin, logoutAuth } from "@/api";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function GoogleLogin() {
	const { user, setUser } = useAuth();
	const [admin, setAdmin] = useState(false);
	const navigate = useNavigate();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const checkAdmin = async () => {
			const _isAdmin: boolean = await isAdmin();
			setAdmin(_isAdmin);
		};
		checkAdmin();
	}, []);

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

	const handleLogout = async () => {
		await logoutAuth();
		setUser(null)
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
								className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-lime-50 transition cursor-pointer"
							>
								Ver perfil [TODO]
							</button>
							{admin && (
							<button
								onClick={() => {
									navigate("/admin-dashboard");
								}}
								className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-lime-50 transition cursor-pointer"
							>
								Admin Dashboard
							</button>)}
							<button
								onClick={handleLogout}
								className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
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
				title="Login with Google"
			>
				<div className="dis">
				<FaGoogle></FaGoogle>
				Iniciar Sesión</div>
			</a>
		</div>
	);
}
