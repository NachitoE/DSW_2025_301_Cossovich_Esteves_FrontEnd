import { useEffect, useState } from "react";
import type { Bird } from "shared-types";
import Layout from "./components/Layout";
import BirdList from "./components/BirdList";
import BirdDetail from "./components/BirdDetail";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getAllBirds } from "./api";
import AdminDashboard from "./components/admin/AdminDashboard";
//import BirdSightingButton from "./components/BirdSightingButton";
import BirdSightingForm from "./components/BirdSightingForm";

//https://coolors.co/palette/d9ed92-b5e48c-99d98c-76c893-52b69a-34a0a4-168aad-1a759f-1e6091-184e77 palette

function App() {
	const [birds, setBirds] = useState<Bird[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		getAllBirds().then((data) => {
			console.log("data:", data);
			setBirds(data);
		});
	}, []);

	return (
		<Layout>
			<Routes>
				<Route
					path="/"
					element={
						<BirdList
							birds={birds}
							onClick={(b) => {
								navigate(`/birds/${b.id}`);
							}}
						/>
					}
				/>
				<Route path="/birds/:id" element={<BirdDetail />} />
				<Route path="/admin-dashboard" element={<AdminDashboard />} />
				<Route path="/load-bird-sighting" element={<BirdSightingForm></BirdSightingForm>}/>
			</Routes>
		</Layout>
	);
}

export default App;
