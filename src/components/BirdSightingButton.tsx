import { useNavigate } from "react-router-dom";

export default function BirdSightingButton() {
    const navigate = useNavigate()
	return (
		<button
			className="bg-white  text-blue-900 p-2 rounded cursor-pointer hover:bg-gray-300 transition"
			onClick={() => {
				navigate("/load-bird-sighting");
			}}
		>
			Avistamientos
		</button>
	);
}
