import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home"
import "./App.css";
// Rutas
import { Route, Routes } from "react-router-dom";
// Páginas
import Login from "./pages/Login";
import Vehiculos from "./pages/Vehiculos";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import Administrador from "./pages/Administrador";

function App() {
  return (
    <div className="app-div">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vehiculos" element={<Vehiculos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/administrador" element={<Administrador />} />
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;