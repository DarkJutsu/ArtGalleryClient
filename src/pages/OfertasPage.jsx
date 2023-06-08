import { OfertasList } from "../components/OfertasList";

export function OfertasPage() {
  return (
    <div>
      <div className="flex justify-start">
        <h2 className="text-3xl">Ofertas</h2>
      </div>
      <OfertasList />
    </div>
  )
}
