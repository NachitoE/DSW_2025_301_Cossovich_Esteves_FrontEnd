import type {
	Bird,
	BirdVisualTrait,
	BirdVisualTraitAssignment,
} from "shared-types";
import { useState } from "react";

interface BirdTraitSelectorProps {
	bird: Bird;
	allTraits: BirdVisualTrait[];
	onSave: (updatedBird: Bird) => void;
}

export default function BirdTraitSelector({
	bird,
	allTraits,
	onSave,
}: BirdTraitSelectorProps) {
	const [selectedTraits, setSelectedTraits] = useState<
		BirdVisualTraitAssignment[]
	>(bird.visualTraits ?? []);

	const selectedTraitIdsByType = new Map<string, string>();
	selectedTraits.forEach((t) => {
		const trait = allTraits.find((tr) => tr.id === t.birdVisualTraitId);
		if (trait) selectedTraitIdsByType.set(trait.type, trait.id);
	});

	const handleToggleTrait = (trait: BirdVisualTrait) => {
		const isSelected = selectedTraits.some(
			(t) => t.birdVisualTraitId === trait.id
		);
		if (isSelected) {
			setSelectedTraits(
				selectedTraits.filter((t) => t.birdVisualTraitId !== trait.id)
			);
		} else {
			const filtered = selectedTraits.filter((t) => {
				const prevTrait = allTraits.find((tr) => tr.id === t.birdVisualTraitId);
				return prevTrait?.type !== trait.type;
			});
			setSelectedTraits([...filtered, { birdVisualTraitId: trait.id }]);
		}
	};

	const handleSave = () => {
		onSave({ ...bird, visualTraits: selectedTraits });
	};

	return (
		<div className="border rounded-xl p-4 shadow-md bg-white max-w-md mx-auto my-6">
			<h2 className="text-xl font-bold mb-2">{bird.name}</h2>
			<img
				src={bird.imageURL}
				alt={bird.name}
				className="w-full h-48 object-cover rounded-lg mb-4"
			/>
			<div>
				<h3 className="font-semibold mb-2">Rasgos visuales</h3>
				<ul className="mb-4">
					{[...new Set(allTraits.map((t) => t.type))].map((type) => {
						const traitsOfType = allTraits.filter((t) => t.type === type);
						const selectedId = selectedTraitIdsByType.get(type);
						return (
							<li key={type} className="mb-2">
								<span className="font-semibold">{type}:</span>
								{traitsOfType.map((trait) => (
									<label key={trait.id} className="ml-2">
										<input
											type="radio"
											name={`trait-${type}`}
											checked={selectedId === trait.id}
											onChange={() => handleToggleTrait(trait)}
										/>
										<span className="ml-1">{trait.description}</span>
									</label>
								))}
								{selectedId && (
									<button
										type="button"
										className="ml-2 text-xs text-red-600 underline"
										onClick={() =>
											handleToggleTrait(
												allTraits.find((t) => t.id === selectedId)!
											)
										}
									>
										Quitar
									</button>
								)}
							</li>
						);
					})}
				</ul>
				<button
					className="bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700 transition cursor-pointer"
					onClick={handleSave}
				>
					Guardar cambios
				</button>
			</div>
		</div>
	);
}
