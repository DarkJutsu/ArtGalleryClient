import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Toolbar } from "primereact/toolbar";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { addObra, getObra, delObra, edObra } from "../api/obra.api";
import { useNavigate } from "react-router-dom";
import { getPropietarios } from "../api/propietario.api";
import { getExposicion } from "../api/exposicion.api.";

export function ObrasList() {
  const [obra, setObra] = useState([]);
  const [obraEdit, setObraEdit] = useState([]);

  const [dDialog, setDDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectPropi, setSelectPropi] = useState([]);
  const [selectExpo, setSelectExpo] = useState([]);
  const [selectP, setSelectP] = useState([]);
  const [selectE, setSelectE] = useState([]);

  const [submitted, setSubmitted] = useState(false);

  const nav = useNavigate();

  const loadObras = () => {
    getObra().then((res) => setObra(res));
  };

  const loadSelect = () => {
    getPropietarios().then((res) => setSelectPropi(res));
  };

  const loadSelectE = () => {
    getExposicion().then((res) => setSelectExpo(res));
  };

  useEffect(() => {
    loadObras();
    loadSelect();
    loadSelectE();
  }, []);

  let emptyObra = {
    id: 0,
    titulo: "",
    artista: "",
    image: "",
    estilo: "",
    precioSalida: 0,
    numeroRegistro: "",
    propietario: "",
  };

  const openNew = () => {
    setObraEdit(emptyObra);
    setSubmitted(false);
    setDDialog(true);
  };

  const sss = {
    id: 0,
    numeroRegistro: "string",
    titulo: "string",
    artista: "string",
    image: "string",
    estilo: "string",
    precioSalida: 0,
    exposicion: {
      id: 0,
      titulo: "string",
      descripcion: "string",
      fechaInauguracion: "2023-06-08T20:37:08.801Z",
      fechaClausura: "2023-06-08T20:37:08.801Z",
    },
    propietario: {
      id: 0,
      nombre: "string",
      direccion: "string",
    },
  };

  const save = async () => {
    setSubmitted(true);

    console.log(selectP, selectE)

    const data = {
      id: 0,
      numeroRegistro: obraEdit.numeroRegistro,
      titulo: obraEdit.titulo,
      artista: obraEdit.artista,
      image: obraEdit.image,
      estilo: obraEdit.estilo,
      precioSalida: obraEdit.precioSalida,
      exposicion: {
        id: selectE.id,
        titulo: selectE.titulo,
        descripcion: selectE.descripcion,
        fechaInauguracion: selectE.fechaInauguracion,
        fechaClausura: selectE.fechaClausura,
      },
      propietario: {
        id: selectP.id, 
        nombre: selectP.nombre,
        direccion: selectP.direccion,
      },
    };

    console.log(data);

    if (obraEdit.titulo.trim() && obraEdit.artista.trim()) {
      if (obraEdit.id > 0) {
        const dataE = {
          id: obraEdit.id,
          titulo: obraEdit.titulo,
          artista: obraEdit.artista,
          image: obraEdit.image,
          estilo: obraEdit.estilo,
          precioSalida: obraEdit.precioSalida,
          numeroRegistro: obraEdit.numeroRegistro,
          //Esta baina agregue
          exposicion: {
            id: selectE.id,
            titulo: selectE.titulo,
            descripcion: selectE.descripcion,
            fechaInauguracion: selectE.fechaInauguracion,
            fechaClausura: selectE.fechaClausura,
          },
          //
          propietario: {
            id: selectP.id,
            nombre: selectP.nombre,
            direccion: selectP.direccion,
          },
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

  const deleteObra = async () => {
    await delObra(obraEdit.id);
    setDeleteDialog(false);
    loadObras();
  };

  const hideDialog = () => {
    setSubmitted(false);
    setDDialog(false);
  };

  const hideDeleteDialog = () => {
    setDeleteDialog(false);
  };

  const edit = (propie) => {
    setObraEdit({ ...propie });
    setDDialog(true);
  };

  const confirmDelete = (propie) => {
    setObraEdit(propie);
    setDeleteDialog(true);
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
  const deleteDialogFooter = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteDialog}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteObra}
      />
    </div>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-secondary p-button-text mr-6"
          onClick={() => edit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-text"
          onClick={() => confirmDelete(rowData)}
        />
      </div>
    );
  };

  const leftToolbarTemplate = () => {
    return (
      <div>
        <Button
          label="Agregar"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={openNew}
        />
      </div>
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`showcase/demo/images/product/${rowData.image}`}
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        alt={rowData.image}
        className="product-image"
      />
    );
  };

  const selectedPTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.nombre}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };
  const pOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.nombre}</div>
      </div>
    );
  };

  const selectedExTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.titulo}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };
  const exOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.titulo}</div>
      </div>
    );
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.precioSalida);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let obraE = { ...obraEdit };
    obraE[`${name}`] = val;

    setObraEdit(obraE);
  };

  const onPChange = (e) => {
    setSelectP(e.value);
  };

  const onExChange = (e) => {
    setSelectE(e.value);
  };

  return (
    <div>
      <div className="datatable-crud-demo">
        <div className="card">
          <Toolbar className="p-mb-4" left={leftToolbarTemplate} />
          <DataTable
            value={obra}
            dataKey="id"
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          >
            <Column field="id" header="Id" sortable></Column>
            <Column field="titulo" header="Titulo" sortable></Column>
            <Column field="artista" header="Artista" sortable></Column>
            <Column
              field="image"
              header="Imagen"
              sortable
              body={imageBodyTemplate}
            ></Column>
            <Column field="estilo" header="Estilo" sortable></Column>
            <Column
              field="precioSalida"
              header="Precio Salida"
              body={priceBodyTemplate}
              sortable
            >
              $
            </Column>
            <Column
              field="numeroRegistro"
              header="Número Registro"
              sortable
            ></Column>
            <Column
              field="propietario.nombre"
              header="Propietario"
              sortable
            ></Column>
            <Column
              field="exposicion.titulo"
              header="Exposición"
              sortable
            ></Column>
            <Column body={actionBodyTemplate}></Column>
          </DataTable>
        </div>

        <Dialog
          visible={dDialog}
          style={{ width: "450px" }}
          header="Detalles de Obra"
          modal
          className="p-fluid"
          footer={DialogFooter}
          onHide={hideDialog}
        >
          <div className="p-field">
            <label htmlFor="name">Titulo</label>
            <InputText
              id="name"
              value={obraEdit.titulo}
              onChange={(e) => onInputChange(e, "titulo")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !obraEdit.titulo,
              })}
            />
            {submitted && !obraEdit.titulo && (
              <small className="p-invalid">Titulo is required.</small>
            )}
          </div>
          <div className="p-field pt-3">
            <label htmlFor="name">Artista</label>
            <InputText
              id="name"
              value={obraEdit.artista}
              onChange={(e) => onInputChange(e, "artista")}
              required
              className={classNames({
                "p-invalid": submitted && !obraEdit.artista,
              })}
            />
            {submitted && !obraEdit.artista && (
              <small className="p-invalid">Artista is required.</small>
            )}
          </div>
          <div className="p-field pt-3">
            <label htmlFor="name">Imagen</label>
            <InputText
              id="name"
              value={obraEdit.image}
              onChange={(e) => onInputChange(e, "image")}
              required
              className={classNames({
                "p-invalid": submitted && !obraEdit.image,
              })}
            />
            {submitted && !obraEdit.image && (
              <small className="p-invalid">Imagen is required.</small>
            )}
          </div>
          <div className="p-field pt-3">
            <label htmlFor="name">Estilo</label>
            <InputText
              id="name"
              value={obraEdit.estilo}
              onChange={(e) => onInputChange(e, "estilo")}
              required
              className={classNames({
                "p-invalid": submitted && !obraEdit.estilo,
              })}
            />
            {submitted && !obraEdit.estilo && (
              <small className="p-invalid">Estilo is required.</small>
            )}
          </div>
          <div className="p-field pt-3">
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
          </div>
          <div className="p-field pt-3">
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
              <small className="p-invalid">
                Propietario Salida is required.
              </small>
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
              <small className="p-invalid">
                Propietario Salida is required.
              </small>
            )}
          </div>
        </Dialog>

        <Dialog
          visible={deleteDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteDialogFooter}
          onHide={hideDeleteDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {obraEdit && (
              <span>
                Are you sure you want to delete <b>{obraEdit.titulo}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
}
