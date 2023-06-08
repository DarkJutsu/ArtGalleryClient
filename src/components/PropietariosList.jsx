import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Toolbar } from "primereact/toolbar";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import {
  addAutor,
  getPropietarios,
  delAutor,
  edAutor,
} from "../api/propietario.api";
import { useNavigate } from "react-router-dom";

export function PropietariosList() {
  const [propie, setPropie] = useState([]);
  const [propieEdit, setPropieEdit] = useState([]);

  const [autorDialog, setAutorDialog] = useState(false);
  const [deleteAutorDialog, setDeleteAutorDialog] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const nav = useNavigate();

  const loadPropie = () => {
    getPropietarios().then((res) => setPropie(res));
  };

  useEffect(() => {
    loadPropie();
  }, []);

  let emptyAutor = {
    id: 0,
    nombre: "",
    direccion: "",
  };

  const openNew = () => {
    setPropieEdit(emptyAutor);
    setSubmitted(false);
    setAutorDialog(true);
  };

  const saveProduct = async () => {
    setSubmitted(true);

    const data = {
      nombre: propieEdit.nombre,
      direccion: propieEdit.direccion,
    };

    if (propieEdit.nombre.trim() && propieEdit.direccion.trim()) {
      let _autors = [...propie];
      if (propieEdit.id > 0) {
        const dataE = {
          id: propieEdit.id,
          nombre: propieEdit.nombre,
          direccion: propieEdit.direccion,
        };
        await edAutor(dataE);
        _autors[propieEdit.id] = propieEdit;
      } else {
        await addAutor(data);
        _autors.push(data);
      }
      loadPropie();
      setAutorDialog(false);
      setPropieEdit(_autors);
      // setPropieEdit(emptyAutor);
    }
  };

  const deleteAutor = async () => {
    console.log(propieEdit.id);
    await delAutor(propieEdit.id);
    setDeleteAutorDialog(false);
    loadPropie();
  };

  const hideDialog = () => {
    setSubmitted(false);
    setAutorDialog(false);
  };

  const hideDeleteAutorDialog = () => {
    setDeleteAutorDialog(false);
  };

  const editAutor = (propie) => {
    setPropieEdit({ ...propie });
    setAutorDialog(true);
    loadPropie();
  };

  const confirmDeleteAutor = (propie) => {
    setPropieEdit(propie);
    setDeleteAutorDialog(true);
  };

  const autorDialogFooter = (
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
        onClick={saveProduct}
      />
    </div>
  );
  const deleteAutorDialogFooter = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteAutorDialog}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteAutor}
      />
    </div>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-secondary p-button-text mr-6"
          onClick={() => editAutor(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-text"
          onClick={() => confirmDeleteAutor(rowData)}
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

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let autorE = { ...propieEdit };
    autorE[`${name}`] = val;

    setPropieEdit(autorE);
  };

  return (
    <div>
      <div className="datatable-crud-demo">
        <div className="card">
          <Toolbar className="p-mb-4" left={leftToolbarTemplate} />

          <DataTable
            value={propie}
            dataKey="id"
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          >
            <Column field="id" header="Id" sortable></Column>
            <Column field="nombre" header="Nombre" sortable></Column>
            <Column field="direccion" header="Dirección" sortable></Column>
            <Column body={actionBodyTemplate}></Column>
          </DataTable>
        </div>

        <Dialog
          visible={autorDialog}
          style={{ width: "450px" }}
          header="Editar"
          modal
          className="p-fluid"
          footer={autorDialogFooter}
          onHide={hideDialog}
        >
          <div className="p-field">
            <label htmlFor="name">Nombre</label>
            <InputText
              id="name"
              value={propieEdit.nombre}
              onChange={(e) => onInputChange(e, "nombre")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !propieEdit.nombre,
              })}
            />
            {submitted && !propieEdit.nombre && (
              <small className="p-invalid">Nombre is required.</small>
            )}
          </div>
          <div className="p-field pt-3">
            <label htmlFor="name">Dirección</label>
            <InputText
              id="name"
              value={propieEdit.direccion}
              onChange={(e) => onInputChange(e, "direccion")}
              required
              className={classNames({
                "p-invalid": submitted && !propieEdit.direccion,
              })}
            />
            {submitted && !propieEdit.direccion && (
              <small className="p-invalid">Dirección is required.</small>
            )}
          </div>
        </Dialog>

        <Dialog
          visible={deleteAutorDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteAutorDialogFooter}
          onHide={hideDeleteAutorDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {propieEdit && (
              <span>
                Are you sure you want to delete <b>{propieEdit.nombre}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
}
