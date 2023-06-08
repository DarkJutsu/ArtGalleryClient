import { useNavigate, useParams } from "react-router-dom";
import { getObra } from "../api/obra.api";
import { getOferta } from "../api/oferta.api";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

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
    titulo: "",
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
          <label htmlFor="name">Titulo</label>
          <InputText
            id="name"
            value={obraExEdit.titulo}
            onChange={(e) => onInputChange(e, "titulo")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !obraExEdit.titulo,
            })}
          />
          {submitted && !obraExEdit.titulo && (
            <small className="p-invalid">Titulo is required.</small>
          )}
        </div>
        {/* <div className="p-field pt-3">
          <label htmlFor="name">Precio Salida</label>
          <InputNumber
            id="price"
            value={obraEdit.precioSalida}
            onValueChange={(e) => onInputChange(e, "precioSalida")}
            mode="currency"
            currency="USD"
            locale="en-US"
            required
            className={classNames({
              "p-invalid": submitted && !obraEdit.precioSalida,
            })}
          />
          {submitted && !obraEdit.precioSalida && (
            <small className="p-invalid">Precio Salida is required.</small>
          )}
        </div>
        <div className="p-field pt-3">
          <label htmlFor="name">Número Registro</label>
          <InputText
            id="name"
            value={obraEdit.numeroRegistro}
            onChange={(e) => onInputChange(e, "numeroRegistro")}
            required
            className={classNames({
              "p-invalid": submitted && !obraEdit.numeroRegistro,
            })}
          />
          {submitted && !obraEdit.numeroRegistro && (
            <small className="p-invalid">
              Número Registro Salida is required.
            </small>
          )}
        </div> */}
        {/* <div className="p-field pt-3">
          <label htmlFor="name">Propietario</label>
          <Dropdown
            value={obraEdit.propietario}
            options={selectPropi}
            onChange={onPChange}
            optionLabel="nombre"
            filter
            showClear
            filterBy="nombre"
            placeholder="Select a Propietario"
            valueTemplate={selectedPTemplate}
            itemTemplate={pOptionTemplate}
          />
          {submitted && !obraEdit.propietario && (
            <small className="p-invalid">Propietario Salida is required.</small>
          )}
        </div>
        <div className="p-field pt-3">
          <label htmlFor="name">Exposiciones</label>
          <Dropdown
            value={obraEdit.exposicion}
            options={selectExpo}
            onChange={onExChange}
            optionLabel="nombre"
            filter
            showClear
            filterBy="nombre"
            placeholder="Select a Propietario"
            valueTemplate={selectedExTemplate}
            itemTemplate={exOptionTemplate}
          />
          {submitted && !obraEdit.exposicion && (
            <small className="p-invalid">Propietario Salida is required.</small>
          )}
        </div> */}
      </Dialog>
    </div>
  );
}
