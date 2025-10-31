import { useState } from "react";
import { createBirdComment } from "../api";
import { useAuth } from "../context/AuthContext";

type BirdCommentTextBoxProps = {
  birdId: string;
  onCommentAdded: () => void;
};

export default function BirdCommentTextBox({
  birdId,
  onCommentAdded,
}: BirdCommentTextBoxProps) {
  const { user } = useAuth();
  const [content, setContent] = useState("");

  //#region Event Handlers
  const handleCommentSubmit = async () => {
    if (!content) return;

    await createBirdComment({
      birdId,
      text: content,
    });

    setContent("");
    onCommentAdded();
  };
  //#endregion
  if (!user) {
    return (
      <div className="text-center text-lg text-lime-700">
        Tienes que iniciar sesión para comentar.
      </div>
    );
  }
  return (
    <div className="flex flex-col flex-1/2 mb-4">
      <textarea
        className="border border-gray-300 rounded-md p-2 mb-2"
        placeholder={`Comentar como ${user?.name}`}
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <button
        onClick={handleCommentSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        Submit
      </button>
    </div>
  );
}
