import { isAdmin } from "@/api";
import { useEffect, useState, type JSX } from "react";
import CreateBirdForm from "./CreateBirdForm";
import AssignBirdTraits from "./AssignBirdTraits";

export default function AdminDashboard() {
	const [admin, setAdmin] = useState(false);
	// --- SECTIONS ---
	const handleCreateBird = () => {
		setSection(<CreateBirdForm />);
	};
	const handleAssignBirdTraits = () => {
		setSection(<AssignBirdTraits />);
	};
	const [section, setSection] = useState<JSX.Element | null>(null);
	useEffect(() => {
		const checkAdmin = async () => {
			const _isAdmin: boolean = await isAdmin();
			setAdmin(_isAdmin);
		};
		checkAdmin();
	}, []);

	if (!admin) return <p>Tenés que ser admin para poder ver esta sección.</p>;

	return (
		<div>
			<div>{createButton("Crear Pájaro", handleCreateBird)}</div>
			<div>
				{createButton("Asignar Características", handleAssignBirdTraits)}
			</div>
			<div>
				<h1>Panel de Administración</h1>
				{section}
			</div>
		</div>
	);
}

function createButton(
	text: String,
	_onClick: React.MouseEventHandler
): JSX.Element {
	return (
		<button
			onClick={_onClick}
			className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600 transition"
		>
			{text}
		</button>
	);
}
