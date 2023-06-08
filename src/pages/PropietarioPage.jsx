import { PropietariosList } from "../components/PropietariosList";

export function PropietarioPage() {
  return (
    <div>
      <div className="flex justify-start">
        <h2 className="text-3xl">Autores</h2>
      </div>
      <PropietariosList />
    </div>
  );
}
