import { useEffect, useState } from "react";
import { isAdmin } from "@/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboardButton() {
	const [admin, setAdmin] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		const checkAdmin = async () => {
			const _isAdmin: boolean = await isAdmin();
			setAdmin(_isAdmin);
		};
		checkAdmin();
	}, []);

	if (!admin) return null;
	return (
		<button
			className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600 transition"
			onClick={() => {
				if (admin) {
					navigate("/admin-dashboard");
				} else {
					alert("No tienes permisos para acceder a esta sección.");
				}
			}}
		>
			Admin Dashboard
		</button>
	);
}
