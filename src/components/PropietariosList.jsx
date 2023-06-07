import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { getPropietarios } from "../api/gallery.api";
import { Propietario } from "./Propietario";
import { Column } from "primereact/column";

export function PropietariosList() {
  const [propie, setPropie] = useState([]);

  const loadPropie = async () => {
    const res = await getPropietarios();
    setPropie(res);
  };

  useEffect(() => {
    loadPropie();
  }, []);

  return (
    <div>
      <h1>Autores list</h1>
      <DataTable
        className="w-3/4 bg-slate-500"
        value={propie}
        removableSort
        paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Ver {first} de {last} en {totalRecords}"
        rows={10}
        rowsPerPageOptions={[10, 20, 50]}
      >
        <Column field="nombre" header="Nombre" sortable />
        <Column field="direccion" header="Dirección" sortable />
      </DataTable>

      {/* {propie.map((propie, id) => (
        <Propietario key={id} propie={propie} />
      ))} */}
    </div>
  );
}
