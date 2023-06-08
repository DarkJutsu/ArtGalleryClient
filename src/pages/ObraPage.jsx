import { ObrasList } from "../components/ObrasList";

export function ObraPage() {
  return (
    <div>
      <div className="flex justify-start">
        <h2 className="text-3xl">Obras</h2>
      </div>
      <ObrasList />
    </div>
  )
}

