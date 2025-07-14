import { useState } from "react";
import type { Bird } from "shared-types";
import { createBird } from "../api";

export default function CreateBirdForm() {
	const [formData, setFormData] = useState({
		name: "",
		scientificName: "",
		description: "",
		image: null as File | null,
	});

	const [previewURL, setPreviewURL] = useState<string | null>(null);
	const [uploading, setUploading] = useState(false);
	const [result, setResult] = useState<string | null>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, files } = e.target;

		if (type === "file" && files && files[0]) {
			const file = files[0];
			setFormData((prev) => ({ ...prev, image: file }));
			setPreviewURL(URL.createObjectURL(file));
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.name || !formData.scientificName || !formData.description) {
			setResult("Por favor, completa todos los campos requeridos.");
			return;
		}
		setUploading(true);
		let imageURL = "";

		if (formData.image) {
			const uploadData = new FormData();
			uploadData.append("file", formData.image);
			uploadData.append("upload_preset", "avistandoo");
			uploadData.append("folder", "aves");

			try {
				const imageResponse = await fetch(
					"https://api.cloudinary.com/v1_1/dzxlynhfm/image/upload",
					{
						method: "POST",
						body: uploadData,
					}
				);

				const imageUploadData = await imageResponse.json();
				imageURL = imageUploadData.secure_url;
			} catch (error) {
				console.error("Error al subir imagen:", error);
				setResult("Error al subir la imagen. Por favor, inténtalo de nuevo.");
				setUploading(false);
				return;
			}
		}

		const newBird: Omit<Bird, "id"> = {
			name: formData.name,
			scientificName: formData.scientificName,
			description: formData.description,
			imageURL,
		};
		//await for finished createBird??
		const response = await createBird(newBird);
		if (response.status !== 201) {
			setUploading(false);
			setResult(response.message || "Error al crear el pájaro.");
			return;
		}
		setUploading(false);
		setResult("Pájaro creado correctamente. ");
	};

	return (
		<div className="max-w-xl mx-auto">
			<h1 className="text-center text-3xl font-bold mb-6">
				🐦 AGREGAR NUEVO AVE 🐦
			</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				{createInput(
					"text",
					"name",
					"Cotorra Argentina",
					"Nombre del Ave",
					formData.name,
					handleInputChange,
					true
				)}
				{createInput(
					"text",
					"scientificName",
					"Myiopsitta monachus",
					"Nombre Científico",
					formData.scientificName,
					handleInputChange,
					true
				)}
				{createInput(
					"file",
					"image",
					"",
					"Imagen del Ave",
					"",
					handleInputChange
				)}
				{createInput(
					"text",
					"description",
					"Es un ave que...",
					"Descripción",
					formData.description,
					handleInputChange,
					true
				)}

				<button
					type="submit"
					disabled={uploading}
					className={`w-full px-4 py-2 rounded ${
						uploading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
					} text-white`}
				>
					{uploading ? "Subiendo..." : "Guardar Ave"}
				</button>
			</form>

			{previewURL && (
				<div className="mt-4 text-center">
					<p className="font-semibold">Vista previa de la imagen:</p>
					<img src={previewURL} alt="Preview" className="mx-auto max-h-64" />
				</div>
			)}

			{result && <p className="text-green-600 text-center mt-4">{result}</p>}
		</div>
	);
}

function createInput(
	type: string,
	name: string,
	placeholder: string,
	label: string,
	value: string,
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
	required: boolean = false
) {
	return (
		<div>
			-
			<label className="block text-lg font-medium text-gray-700 text-center">
				{required && <span className="text-red-500">*</span>}
				{label}
			</label>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				value={type === "file" ? undefined : value}
				onChange={onChange}
				className="border px-3 py-2 w-full rounded text-center"
			/>
		</div>
	);
}
