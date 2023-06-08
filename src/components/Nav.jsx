import { Link } from "react-router-dom";
import { TabMenu } from "primereact/tabmenu";

export function Nav() {
  const items = [
    {
      label: (
        <Link className="font-bold text-4xl" to={"/"}>
          Inicio
        </Link>
      ),
      icon: "pi pi-fw pi-home",
    },
    {
      label: (
        <Link
          className="text-lg px-3 py-2 rounded-lg"
          to={"/autores"}
        >
          Autores
        </Link>
      ),
      icon: "pi pi-fw pi-user",
    },
    {
      label: (
        <Link
          className="text-lg px-3 py-2 rounded-lg"
          to={"/obras"}
        >
          Obras
        </Link>
      ),
      icon: "pi pi-fw pi-palette",
    },
    {
      label: (
        <Link
          className="text-lg px-3 py-2 rounded-lg"
          to={"/exposiciones"}
        >
          Exposiciones
        </Link>
      ),
      icon: "pi pi-fw pi-file",
    },
    {
      label: (
        <Link
          className="text-lg px-3 py-2 rounded-lg"
          to={"/subastas"}
        >
          Ofertas
        </Link>
      ),
      icon: "pi pi-fw pi-money-bill",
    },
  ];

  return (
    <nav className="flex py-5 gap-4">
      <TabMenu model={items} />
    </nav>
  );
}
