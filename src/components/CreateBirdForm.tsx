import type { Bird } from "shared-types";

export default function CreateBirdForm() {
  return (
    <div>
      <h1 className="text-center">🐦--AGREGAR NUEVO AVE--🐦</h1>
      <form>
        {createInput("text", "Cotorra Argentina", "Nombre Del Ave")}
        {createInput("text", "Myiopsitta monachus", "Nombre Cientifico")}
        {createInput("file", "", "Imagen del Ave")}
        {createInput("text", "Es un ave que...", "Descripción")}
      </form>
      <h2>TODO</h2>
      {}
    </div>
  );
}

function createInput(type: string, placeholder: string, label: string) {
  return (
    <div>
      <label className="block text-2xl font-medium text-gray-700 self-center text-center">
        {label}
      </label>
      <input
        className={"self-center text-center w-100"}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
