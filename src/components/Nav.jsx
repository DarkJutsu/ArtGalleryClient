import { Link } from "react-router-dom";

export function Nav() {
  return (
    <nav className="flex justify-between py-5">
      <Link className="font-bold text-4xl" to={"/"}>
        Inicio
      </Link>
      <Link
        className="bg-indigo-500 text-lg px-3 py-2 rounded-lg"
        to={"/autores"}
      >
        Autores
      </Link>
      <Link
        className="bg-indigo-500 text-lg px-3 py-2 rounded-lg"
        to={"/obras"}
      >
        Obras
      </Link>
      <Link
        className="bg-indigo-500 text-lg px-3 py-2 rounded-lg"
        to={"/exposiciones"}
      >
        Exposiciones
      </Link>
      <Link
        className="bg-indigo-500 text-lg px-3 py-2 rounded-lg"
        to={"/subastas"}
      >
        Subastas
      </Link>
    </nav>
  );
}
