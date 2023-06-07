import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { PropietarioPage } from "./pages/PropietarioPage";
import { Nav } from "./components/Nav";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Navigate to={"/inicio"} />} />
          <Route path="/inicio" element={<PropietarioPage />} />
          <Route path="/autores" element={<PropietarioPage />} />
          <Route path="/obras" element={<PropietarioPage />} />
          <Route path="/exposiciones" element={<PropietarioPage />} />
          <Route path="/subastas" element={<PropietarioPage />} />

          {/* <Route path="/jugador/:id" element={<JugadorFormPage />} /> */}
        </Routes>
        {/* <Toaster /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
