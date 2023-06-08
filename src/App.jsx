import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Nav } from "./components/Nav";
import { PropietarioPage } from "./pages/PropietarioPage";
import { ObraPage } from "./pages/ObraPage";
import { ExposicionPage } from "./pages/ExposicionPage";
import { OfertasPage } from "./pages/OfertasPage";
import { InicioPage } from "./pages/InicioPage";
import { ViewExpo } from "./components/ViewExpo";
import { ViewOferta } from "./components/ViewOferta";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Navigate to={"/inicio"} />} />
          <Route path="/inicio" element={<InicioPage />} />
          <Route path="/autores" element={<PropietarioPage />} />
          <Route path="/obras" element={<ObraPage />} />
          <Route path="/exposiciones" element={<ExposicionPage />} />
          <Route path="/subastas" element={<OfertasPage />} />

          <Route path="/view-expo/:id" element={<ViewExpo />} />
          <Route path="/view-oferta/:id" element={<ViewOferta />} />
        </Routes>
        {/* <Toaster /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
