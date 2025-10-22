import type { Bird } from "shared-types";
import { useEffect, useState } from "react";
import { getBirdById, getBirdVisualTraitById } from "../api";
import { useParams } from "react-router-dom";
import BirdCommentList from "./BirdCommentList";
import BirdCommentTextBox from "./BirdCommentTextBox";
import BirdSightingButton from "./BirdSightingButton";

export default function BirdDetail() {
	const [bird, setBird] = useState<Bird | null>(null);
	const { id } = useParams<{ id: string }>();
	const [birdTraits, setBirdTraits] = useState<string[]>([]);

	useEffect(() => {
		if (!id) return;
		getBirdById(id).then((bird) => {
			document.title = `🐦${bird.name} - Avistandoo🐦`;
			setBird(bird);
		});
	}, [id]);

	useEffect(() => {
		if (!bird) return;
		bird.visualTraits?.forEach((trait) => {
			getBirdVisualTraitById(trait.birdVisualTraitId).then((traitData) => {
				const traitDescription = traitData?.description;
				setBirdTraits((prev) => [...prev, traitDescription!]);
			});
		});
	}, [bird]);

	//refreshing
	const [refreshKey, setRefreshKey] = useState(0);

	const handleRefresh = () => {
		setRefreshKey((prevKey) => prevKey + 1);
	};

	if (!bird) {
		return <div className="text-center text-lg text-lime-700">Cargando...</div>;
	}

	return (
		<div className="max-w-2xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col items-center">
			<img
				src={bird.imageURL}
				alt={bird.name}
				className="rounded-2xl shadow-lg mb-6 w-full max-w-md object-cover"
			/>
			<h1 className="text-3xl font-bold text-lime-800 mb-2">{bird.name}</h1>
			<h2 className="italic text-lg text-lime-600 mb-4 underline">
				{bird.scientificName}
			</h2>

			{birdTraits && (
				<h2>Características: {birdTraits.map((trait) => trait).join(", ")}</h2>
			)}
			<BirdSightingButton />
			<p className="text-gray-800 text-center text-lg">{bird.description}</p>
			<BirdCommentTextBox birdId={id!} onCommentAdded={handleRefresh} />
			<BirdCommentList birdId={id!} refreshKey={refreshKey} />
		</div>
	);
}
