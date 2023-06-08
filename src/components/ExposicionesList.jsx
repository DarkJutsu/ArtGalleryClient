import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Toolbar } from "primereact/toolbar";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { addExposicion, delExposicion, edExposicion, getExposicion } from "../api/exposicion.api.";
import { getObra } from "../api/obra.api";

export function ExposicionesList() {
  const [expo, setExpo] = useState([]);
  const [expoEdit, setExpoEdit] = useState([]);

  const [dDialog, setDDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectObra, setSelectObra] = useState([]);
  const [selectO, setSelectO] = useState([]);

  const [submitted, setSubmitted] = useState(false);

  const [inputFecha, setInputFecha] = useState(null);
  const [inputFechaC, setInputFechaC] = useState(null);
  

  const loadExpos = () => {
    getExposicion().then((res) => setExpo(res));
  };

  
  let empty = {
    id: 0,
    titulo: "",
    descripcion: "",
    fechaInauguracion: "",
    fechaClausura: "",
    obras: "",
  };

  useEffect(() => {
    loadExpos();
  }, []);

  const save = async () => {
    setSubmitted(true);

    const data = {
      titulo: expoEdit.titulo,
      descripcion: expoEdit.descripcion,
      fechaInauguracion: formatFechaInput(inputFecha),
      fechaClausura: formatFechaInput(inputFechaC),
    };
    console.log(data);
    if (expoEdit.titulo.trim() && expoEdit.descripcion.trim()) {
      if (expoEdit.id > 0) {
        const dataE = {
          id: expoEdit.id,
          titulo: expoEdit.titulo,
          descripcion: expoEdit.descripcion,
          fechaInauguracion: expoEdit.fechaInauguracion,
          fechaClausura: expoEdit.fechaClausura
        };
        await edExposicion(dataE);
        setDDialog(false);
      } else {
        await addExposicion(data);
        setDDialog(false);
      }
    }
    loadExpos();
  };
  const del = async () => {
    await delExposicion(expoEdit.id);
    setDeleteDialog(false);
    loadExpos();
  };

  const hideDialog = () => {
    setSubmitted(false);
    setDDialog(false);
  };
  const hideDeleteDialog = () => {
    setDeleteDialog(false);
  };

  const openNew = () => {
    setExpoEdit(empty);
    setSubmitted(false);
    setDDialog(true);
  };
  const openEdit = (propie) => {
    setExpoEdit({ ...propie });
    setDDialog(true);
  };
  const openDelete = (propie) => {
    setExpoEdit(propie);
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
        onClick={del}
      />
    </div>
  );

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
  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-secondary p-button-text mr-6"
          onClick={() => openEdit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-text"
          onClick={() => openDelete(rowData)}
        />
      </div>
    );
  };

  const selectedOTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.titulo}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };
  const oOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.titulo}</div>
      </div>
    );
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let expoE = { ...expoEdit };
    expoE[`${name}`] = val;

    setExpoEdit(expoE);
  };
  const onOChange = (e) => {
    setSelectObra(e.value);
  };

  const formatFecha = (fecha) => {
    const fechaJava = fecha;
    const fechaJS = new Date(fechaJava);
    const dia = fechaJS.getDate();
    const mes = fechaJS.getMonth() + 1;
    const anio = fechaJS.getFullYear();
    const fechaFormateada = `${dia.toString().padStart(2, "0")}/${mes
      .toString()
      .padStart(2, "0")}/${anio}`;

    return fechaFormateada;
  };

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

  const formatFechaE = (fecha) => {
    const fechaJava = fecha;
    const fechaJS = new Date(fechaJava);
    const dia = fechaJS.getDate();
    const mes = fechaJS.getMonth() + 1;
    const anio = fechaJS.getFullYear();
    const fechaFormateada = `${dia.toString().padStart(2, "0")}/${mes
      .toString()
      .padStart(2, "0")}/${anio}`;

    return fechaFormateada;
  };

  const dateI = (rowData) => {
    return (
      <div>
        <span>{formatFecha(rowData.fechaInauguracion)}</span>
      </div>
    );
  };
  const dateC = (rowData) => {
    return (
      <div>
        <span>{formatFecha(rowData.fechaClausura)}</span>
      </div>
    );
  };
  

  return (
    <div>
      <div className="datatable-crud-demo">
        <div className="card">
          <Toolbar className="p-mb-4" left={leftToolbarTemplate} />
          <DataTable
            value={expo}
            dataKey="id"
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          >
            <Column field="id" header="Id" sortable></Column>
            <Column field="titulo" header="Titulo" sortable></Column>
            <Column field="descripcion" header="Descripción" sortable></Column>
            <Column
              field="fechaInauguracion"
              header="Fecha de Inauguracion"
              body={dateI}
              sortable
            ></Column>
            <Column
              field="fechaClausura"
              header="Fecha de Clausura"
              body={dateC}
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
              value={expoEdit.titulo}
              onChange={(e) => onInputChange(e, "titulo")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !expoEdit.titulo,
              })}
            />
            {submitted && !expoEdit.titulo && (
              <small className="p-invalid">Titulo is required.</small>
            )}
          </div>
          <div className="p-field pt-3">
            <label htmlFor="name">Descripción</label>
            <InputText
              id="name"
              value={expoEdit.descripcion}
              onChange={(e) => onInputChange(e, "descripcion")}
              required
              className={classNames({
                "p-invalid": submitted && !expoEdit.descripcion,
              })}
            />
            {submitted && !expoEdit.descripcion && (
              <small className="p-invalid">Descripción is required.</small>
            )}
          </div>
          <div className="p-field pt-3">
            <label htmlFor="name">Fecha de Inauguracion</label>
            <Calendar
              id="spanish"
              value={formatFechaE(expoEdit.fechaInauguracion)}
              onChange={(e) => setInputFecha(e.value)}
              dateFormat="dd/mm/yy"
              className={classNames({
                "p-invalid": submitted && !expoEdit.fechaInauguracion,
              })}
            />
            {console.log(inputFecha)}
            {submitted && !expoEdit.fechaInauguracion && (
              <small className="p-invalid">
                Fecha de Inauguracion is required.
              </small>
            )}
          </div>
          <div className="p-field pt-3">
            <label htmlFor="name">Fecha de Clausura</label>
            <Calendar
              id="spanish"
              value={formatFechaE(expoEdit.fechaClausura)}
              onChange={(e) => setInputFechaC(e.value)}
              dateFormat="dd/mm/yy"
              className={classNames({
                "p-invalid": submitted && !expoEdit.fechaClausura,
              })}
            />
            {submitted && !expoEdit.fechaClausura && (
              <small className="p-invalid">
                Fecha de Inauguracion is required.
              </small>
            )}
          </div>
          {/* <div className="p-field pt-3">
            <label htmlFor="name">Propietario</label>
            <Dropdown
              value={expoEdit.obras}
              options={selectObra}
              onChange={onOChange}
              optionLabel="titulo"
              filter
              showClear
              filterBy="titulo"
              placeholder="Select a Obra"
              valueTemplate={selectedOTemplate}
              itemTemplate={oOptionTemplate}
            />
            {submitted && !obraEdit.propietario && (
              <small className="p-invalid">
                Propietario Salida is required.
              </small>
            )}
          </div> */}
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
            {expoEdit && (
              <span>
                Are you sure you want to delete <b>{expoEdit.titulo}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
}
