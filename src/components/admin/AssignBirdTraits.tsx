import { useEffect, useState } from "react";
import { getAllBirds, getAllBirdVisualTraits, updateBird } from "@/api";
import type { Bird, BirdVisualTrait } from "shared-types";
import BirdTraitSelector from "@admin/BirdTraitSelector";

export default function AssignBirdTraits() {
	const [birds, setBirds] = useState<Bird[] | null>(null);
	const [traits, setTraits] = useState<BirdVisualTrait[]>([]);

	useEffect(() => {
		const fetchBirds = async () => {
			const allBirds = await getAllBirds();
			setBirds(allBirds);
		};
		const fetchTraits = async () => {
			const allTraits = await getAllBirdVisualTraits();
			setTraits(allTraits);
		};
		fetchBirds();
		fetchTraits();
	}, [birds]);

	const handleSave = (bird: Bird) => {
		updateBird(bird);
	};

	return (
		<div>
			{birds && traits && (
				<>
					{birds.map((bird: Bird) => (
						<div key={bird.id}>
							{
								<BirdTraitSelector
									bird={bird}
									allTraits={traits}
									onSave={handleSave}
								/>
							}
						</div>
					))}
				</>
			)}
		</div>
	);
}
