import { useNavigate, useParams } from "react-router-dom";

export function ViewOferta() {
  const params = useParams();

  return (
    <div>
      <h2>Oferta {params.id}</h2>
    </div>
  );
}
