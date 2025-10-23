import type { Bird, BirdSighting, BirdVisualTrait } from "shared-types";
import type { User } from "shared-types";
import type { Comment } from "shared-types";
import axios from "axios";

const API_URL = "http://localhost:3000";
const API_GET_ALL_BIRDS_URL = `${API_URL}/api/birds`;
const API_GET_BIRD_URL = `${API_URL}/api/birds`;
const API_BIRD_COMMENTS_URL = `${API_URL}/api/comments`;
const API_BIRD_TRAITS_URL = `${API_URL}/api/bird-visual-traits`;
const API_BIRD_SIGHTING_URL = `${API_URL}/api/bird-sighting`;
const API_AUTH_URL = `${API_URL}/api/auth`;

axios.defaults.withCredentials = true;

export async function getAllBirds(): Promise<Bird[]> {
	const res = await axios.get(API_GET_ALL_BIRDS_URL);
	return extractData(res)
}

export async function getBirdById(id: string): Promise<Bird> {
	const res = await axios.get(`${API_GET_BIRD_URL}/${id}`);
	return extractData(res)
}

export async function createBird(
	bird: Omit<Bird, "id">,
	user: User
): Promise<any> {
	const res = await axios.post(API_GET_ALL_BIRDS_URL, {
		headers: {
			"Content-Type": "application/json",
		},
		data: { user, bird },
	});
	return extractData(res)
}

export async function getBirdCommentsById(birdId: string): Promise<Comment[]> {
	const res = await axios.get(`${API_BIRD_COMMENTS_URL}/${birdId}`);
	return extractData(res) || [];
}
export async function updateBird(bird: Bird) {
	const res = await axios.put(`${API_GET_BIRD_URL}/${bird.id}`, {
		headers: {
			"Content-Type": "application/json",
		},
		data: bird,
	});
	return extractData(res)
}

export async function createBirdComment(data: {
	birdId: string;
	userId: string;
	text: string;
}) {
	const res = await axios.post(API_BIRD_COMMENTS_URL, {
		headers: {
			"Content-Type": "application/json",
		},
		data,
	});
	return extractData(res)
}

export async function getUserById(userId: string): Promise<User | null> {
	try {
		const res = await axios.get(`${API_URL}/api/users/${userId}`);
		return extractData(res)
	} catch (error) {
		console.error("Error fetching user:", error);
		return null;
	}
}

export async function isAdmin(): Promise<boolean> {
	try {
		const res = await axios.get(`${API_URL}/api/auth/isAdmin`, {
			withCredentials: true,
		});
		return res.data.isAdmin;
	} catch (error) {
		console.error("Error checking admin status:", error);
		return false;
	}
}

export async function getAllBirdVisualTraits() {
	const res = await axios.get(API_BIRD_TRAITS_URL);
	return extractData(res)
}

export async function getBirdVisualTraitById(
	id: string
): Promise<BirdVisualTrait | null> {
	try {
		const res = await axios.get(`${API_BIRD_TRAITS_URL}/${id}`);
		return extractData(res)
	} catch (error) {
		console.error("Error fetching bird visual trait:", error);
		return null;
	}
}

export async function getAllBirdSightings() : Promise<BirdSighting[]> {
	const res = await axios.get(API_BIRD_SIGHTING_URL);
	return extractData(res)
}

export async function createBirdSighting(data: {
	birdId: string;
	userId: string;
	dateTime: Date;
	ubicationLatitude:number;
	ubicationLongitude: number;
}) {
	const res = await axios.post(API_BIRD_SIGHTING_URL, {
		headers: {
			"Content-Type": "application/json",
		},
		data,
	});
	return extractData(res)
}

export async function getMeAuth(){
	const res = await axios.get(`${API_AUTH_URL}/me`);
	return extractData(res)
}

export async function logoutAuth(){
	const res = await axios.get(`${API_AUTH_URL}/logout`);
}
const extractData = (res: any) => res.data.data;