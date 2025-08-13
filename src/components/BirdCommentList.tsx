import { useEffect, useState } from "react";
import { getBirdCommentsById } from "../api";
import type { Comment } from "shared-types";

type BirdCommentListProps = {
  birdId: string;
};
export default function BirdCommentList({ birdId }: BirdCommentListProps) {
  const [birdComments, setBirdComments] = useState<Comment[]>([]);

  useEffect(() => {
    getBirdCommentsById(birdId).then((comments) => {
      setBirdComments(comments);
    });
  }, [birdId]);

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
    <div>
      <h2 className="text-2xl font-bold text-lime-800 mb-4">Comentarios</h2>
      {birdComments.map((element) => {
        return (
          <p key={element.id}>
            Usuario {element.userId}: {element.text}
          </p>
        );
      })}
    </div>
  );
}
