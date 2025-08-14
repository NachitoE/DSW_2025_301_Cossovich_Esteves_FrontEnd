import type { Bird } from "shared-types";
import type { User } from "shared-types";
import type { Comment } from "shared-types";
import axios from "axios";

const API_URL = "http://localhost:3000";
const API_GET_ALL_BIRDS_URL = `${API_URL}/api/birds`;
const API_GET_BIRD_URL = `${API_URL}/api/birds`;
const API_BIRD_COMMENTS_URL = `${API_URL}/api/comments`;

export async function getAllBirds(): Promise<Bird[]> {
  const res = await axios.get(API_GET_ALL_BIRDS_URL);
  return res.data.data;
}

export async function getBirdById(id: string): Promise<Bird> {
  const res = await axios.get(`${API_GET_BIRD_URL}/${id}`);
  const bird = res.data.data; // ???
  return bird as Bird;
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
  return res.data;
}

export async function getBirdCommentsById(birdId: string): Promise<Comment[]> {
  const res = await axios.get(`${API_BIRD_COMMENTS_URL}/${birdId}`);
  return res.data;
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
  return res.data;
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const res = await axios.get(`${API_URL}/api/users/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
