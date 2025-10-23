import { useEffect, useState } from "react";
import { getBirdCommentsById, getUserById } from "../api";
import type { Comment, User } from "shared-types";

type CommentWithUser = Comment & { user: User };

type BirdCommentListProps = {
	birdId: string;
	refreshKey?: number;
};
export default function BirdCommentList({
	birdId,
	refreshKey,
}: BirdCommentListProps) {
	const [birdComments, setBirdComments] = useState<CommentWithUser[]>([]);

	useEffect(() => {
		async function fetchCommentsWithAvatars() {
			const comments = await getBirdCommentsById(birdId);
			// Asegurarse de que comments es un array
			if (!Array.isArray(comments)) {
				console.error("Expected comments to be an array, got:", comments);
				setBirdComments([]);
				return;
			}
			//order by date
			comments.sort((a, b) => {
				return (
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			});
			const commentsWithUsers = await Promise.all(
				comments.map(async (comment) => {
					const user = await getUserById(comment.userId);
					return {
						...comment,
						user: user!,
					};
				})
			);
			setBirdComments(commentsWithUsers);
		}
		fetchCommentsWithAvatars();
	}, [birdId, refreshKey]);

	if (!birdComments) {
		return (
			<div className="text-center text-lg text-lime-700">
				Cargando comentarios...
			</div>
		);
	}
	if (birdComments.length === 0) {
		return (
			<div>
				<h2 className="text-2xl font-bold text-lime-800 mb-4">Comentarios</h2>
				<p>No hay comentarios para este pájaro.</p>
			</div>
		);
	}
	return (
		<div className="border-2 rounded-md p-4 w-full">
			<h2 className="text-2xl font-bold text-lime-800 mb-4">Comentarios</h2>
			{birdComments.map((element) => (
				<div className="border-b border-gray-200 py-2" key={element.id}>
					<p className="text-gray-700">
						{/* TODO: Poner avatar default */}
						{element.user.avatarURL && (
							<img
								src={element.user.avatarURL}
								alt={`${element.userId}'s avatar`}
								className="inline-block w-8 h-8 rounded-full mr-2"
							/>
						)}
						<strong>{element.user.name}</strong>: {element.text}
					</p>
					<p className="text-sm text-gray-500">
						{new Date(element.createdAt).toLocaleDateString()}
					</p>
				</div>
			))}
		</div>
	);
}
