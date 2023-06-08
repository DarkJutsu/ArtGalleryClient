import { useNavigate, useParams } from "react-router-dom";
import { getObra } from "../api/obra.api";
import { getOferta } from "../api/oferta.api";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Calendar } from "primereact/calendar";

import classNames from "classnames";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { getPropietarios } from "../api/propietario.api";

export function ViewExpo() {
  const [obra, setObra] = useState([]);
  const [obraId, setObraId] = useState([]);
  const [oferta, setOferta] = useState([]);
  const [tituloExpo, setTituloExpo] = useState(null);

  const [inputFecha, setInputFecha] = useState(null);

  const [obraExEdit, setObraExEdit] = useState([]);
  const [dDialog, setDDialog] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const nav = useNavigate();
  const params = useParams();

  const loadObras = async () => {
    await getObra().then((res) =>
      setObra(res.filter(({ exposicion }) => exposicion.id == params.id))
    );
  };

  // const loadObras = async () => {
  //   await getObra().then((res) =>
  //     setObra(
  //       res.filter((data) => {
  //         obra.estado = loadOferta(data.id) ? "Vendido" : "Disponible";
  //         data.exposicion.id == params.id;
  //       })
  //     )
  //   );
  // };

  // const loadOferta = async (idObra) => {
  //   const data = await getOferta().then((res) =>
  //     res.filter((data) => {
  //       data.obra.id == idObra && data.aceptado == 1;
  //     })
  //   );
  //   return data != null;
  // };

  useEffect(() => {
    loadObras();
  }, []);

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`showcase/demo/images/product/${rowData.image}`}
        onError={(e) =>
          (e.target.src =
            "https://cdn0.unprofesor.com/es/posts/6/4/1/resumen_de_romeo_y_julieta_por_actos_3146_600.jpg")
        }
        alt={rowData.image}
        className="product-image flex justify-center w-full"
      />
    );
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const footer = (
    <span>
      <Button label="Oferta" icon="pi pi-check" />
    </span>
  );

  const save = async () => {
    setSubmitted(true);

    const data = {
      id: 0,
    };

    console.log(data);

    if (obraExEdit.titulo.trim() && obraExEdit.artista.trim()) {
      if (obraExEdit.id > 0) {
        const dataE = {
          id: obraExEdit.id,
        };
        // await edObra(dataE);
        setDDialog(false);
      } else {
        await addObra(data);
        setDDialog(false);
      }
    }
    loadObras();
  };
  let empty = {
    id: 0,
    nombre: "",
    telefono: "",
    monto: "",
    fecha: "",
    aceptado: "",
    obra: "",
  };
  const openNew = () => {
    setObraExEdit(empty);
    setSubmitted(false);
    setDDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setDDialog(false);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let obraE = { ...obraExEdit };
    obraE[`${name}`] = val;

    setObraExEdit(obraE);
  };

  const DialogFooter = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={save}
      />
    </div>
  );

  const formatFechaInput = (fecha) => {
    const fechaJava = fecha;
    const fechaJS = new Date(fechaJava);
    const dia = fechaJS.getDate();
    const mes = fechaJS.getMonth() + 1;
    const anio = fechaJS.getFullYear();
    const fechaFormateada = `${anio}-${mes.toString().padStart(2, "0")}-${dia
      .toString()
      .padStart(2, "0")}`;

    return fechaFormateada;
  };

  return (
    <div>
      <h2 className="text-2xl ">Exposición</h2>
      <div className="grid grid-cols-3 gap-3 pt-3">
        {obra.map((obra, id) => (
          <>
            <Card
              key={id}
              title={obra.titulo}
              onClick={() => {
                openNew();
              }}
              footer={footer}
              style={{ width: "25rem", marginBottom: "2em" }}
              className="cursor-pointer"
            >
              {imageBodyTemplate(obra.image)}
              <p className="m-0" style={{ lineHeight: "1.5" }}>
                {obra.artista} <br />
                <span>{formatCurrency(obra.precioSalida)}</span>
              </p>
            </Card>
          </>
        ))}
      </div>

      <Dialog
        visible={dDialog}
        style={{ width: "450px" }}
        header="Detalles de Oferta"
        modal
        className="p-fluid"
        footer={DialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            value={obraExEdit.nombre}
            onChange={(e) => onInputChange(e, "nombre")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !obraExEdit.nombre,
            })}
          />
          {submitted && !obraExEdit.nombre && (
            <small className="p-invalid">nombre is required.</small>
          )}
        </div>
        <div className="p-field pt-3">
          <label htmlFor="name">Telefono</label>
          <InputNumber
            id="price"
            value={obraExEdit.telefono}
            onValueChange={(e) => onInputChange(e, "telefono")}
            required
            className={classNames({
              "p-invalid": submitted && !obraExEdit.telefono,
            })}
          />
          {submitted && !obraExEdit.telefono && (
            <small className="p-invalid">Precio Salida is required.</small>
          )}
        </div>
        <div className="p-field pt-3">
          <label htmlFor="name">Oferta</label>
          <InputNumber
            id="price"
            value={obraExEdit.monto}
            onValueChange={(e) => onInputChange(e, "monto")}
            mode="currency"
            currency="USD"
            locale="en-US"
            required
            className={classNames({
              "p-invalid": submitted && !obraExEdit.monto,
            })}
          />
          {submitted && !obraExEdit.monto && (
            <small className="p-invalid">Precio Salida is required.</small>
          )}
        </div>
        <div className="p-field pt-3">
          <label htmlFor="name">Fecha de Inauguracion</label>
          <Calendar
            id="spanish"
            value={obraExEdit.fecha}
            onChange={(e) => setInputFecha(e.value)}
            dateFormat="dd/mm/yy"
            className={classNames({
              "p-invalid": submitted && !obraExEdit.fecha,
            })}
          />
          {console.log(inputFecha)}
          {submitted && !obraExEdit.fecha && (
            <small className="p-invalid">
              Fecha de Inauguracion is required.
            </small>
          )}
        </div>
      </Dialog>
    </div>
  );
}
