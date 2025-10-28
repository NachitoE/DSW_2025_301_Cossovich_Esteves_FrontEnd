import type { Bird, BirdVisualTrait, BirdVisualTraitAssignment } from "shared-types";
import { useEffect, useId, useMemo, useRef, useState } from "react";

// WARNING : VISTA HECHA PARA PROTOTIPO .


interface BirdTraitSelectorProps {
  bird: Bird;
  allTraits: BirdVisualTrait[];
  onSave: (updatedBird: Bird) => void | Promise<void>;
}

export default function BirdTraitSelector({ bird, allTraits, onSave }: BirdTraitSelectorProps) {
  const uid = useId();
  const [selectedTraits, setSelectedTraits] = useState<BirdVisualTraitAssignment[]>(bird.visualTraits ?? []);
  const [isSaving, setIsSaving] = useState(false);
  const [msg, setMsg] = useState<null | { type: "ok" | "error"; text: string }>(null);

  const interactingRef = useRef(false);

  useEffect(() => {
    setSelectedTraits(bird.visualTraits ?? []);
  }, [bird.id]);

  const traitsById = useMemo(() => {
    const m = new Map<string, BirdVisualTrait>();
    allTraits.forEach(tr => m.set(String(tr.id), tr));
    return m;
  }, [allTraits]);

  const selectedTraitIdsByType = useMemo(() => {
    const m = new Map<string, string>();
    selectedTraits.forEach(t => {
      const tr = traitsById.get(String(t.birdVisualTraitId));
      if (tr) m.set(tr.type, String(tr.id));
    });
    return m;
  }, [selectedTraits, traitsById]);

  const handleSelectTrait = (trait: BirdVisualTrait) => {
    interactingRef.current = true;
    setSelectedTraits(prev => {
      const filtered = prev.filter(t => traitsById.get(String(t.birdVisualTraitId))?.type !== trait.type);
      return [...filtered, { birdVisualTraitId: String(trait.id) }];
    });
    setTimeout(() => { interactingRef.current = false; }, 150);
  };

  const handleSaveClick = async () => {
    setIsSaving(true);
    setMsg(null);
    try {
      const updated = { ...bird, visualTraits: selectedTraits };
      await onSave(updated);
      setMsg({ type: "ok", text: "Guardado con éxito." });
    } catch (e) {
      setMsg({ type: "error", text: "No se pudo guardar. Intentalo de nuevo." });
    } finally {
      setIsSaving(false);
    }
  };

  const types = useMemo(() => [...new Set(allTraits.map(t => t.type))], [allTraits]);

  return (
    <div className="border rounded-xl p-4 shadow-md bg-white max-w-md mx-auto my-6">
      <h2 className="text-xl font-bold mb-2">{bird.name}</h2>
      <img src={bird.imageURL} alt={bird.name} className="w-full h-48 object-cover rounded-lg mb-4" />
      <div>
        <h3 className="font-semibold mb-2">Rasgos visuales</h3>
        <ul className="mb-4 space-y-4">
          {types.map(type => {
            const traitsOfType = allTraits.filter(t => t.type === type);
            const selectedId = selectedTraitIdsByType.get(type);
            return (
              <li key={type} className="p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-700 mb-2">{type}:</p>
                <div className="flex flex-col gap-2">
                  {traitsOfType.map(trait => (
                    <label
                      key={trait.id}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
                    >
                      <input
                        type="radio"
                        name={`trait-${uid}-${type}`}
                        checked={String(trait.id) === String(selectedId)}
                        onChange={() => handleSelectTrait(trait)}
                        className="w-4 h-4 text-lime-600 focus:ring-lime-500"
                        onFocus={() => (interactingRef.current = true)}
                        onBlur={() => (interactingRef.current = false)}
                      />
                      <span className="text-gray-700">{trait.description}</span>
                    </label>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>

        {msg && (
          <div
            role="status"
            className={`mb-3 text-sm ${msg.type === "ok" ? "text-green-700" : "text-red-700"}`}
          >
            {msg.text}
          </div>
        )}

        <button
          className={`w-full bg-lime-600 text-white px-4 py-2 rounded-lg transition-colors duration-200
                     hover:bg-lime-700 cursor-pointer
                     disabled:opacity-60 disabled:cursor-not-allowed`}
          onClick={handleSaveClick}
          disabled={isSaving}
          aria-busy={isSaving}
        >
          {isSaving ? "Guardando…" : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}
