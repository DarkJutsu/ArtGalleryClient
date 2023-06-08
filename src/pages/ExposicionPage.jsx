import { ExposicionesList } from "../components/ExposicionesList";

export function ExposicionPage() {
  return (
    <div>
      <div className="flex justify-start">
        <h2 className="text-3xl">Exposiciones</h2>
      </div>
      <ExposicionesList />
    </div>
  );
}
