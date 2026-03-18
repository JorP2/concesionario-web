import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home"
import "./App.css";
// Rutas
import { Route, Routes } from "react-router-dom";
// Páginas
import Vehiculos from "./pages/Vehiculos";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import VehiculoDetalle from "./pages/VehiculoDetalle";

function App() {
  return (
    <div className="app-div">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehiculos" element={<Vehiculos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/vehiculos/:id" element={<VehiculoDetalle />} />
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;