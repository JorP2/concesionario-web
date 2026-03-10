import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Coches from './pages/Coches';
import Login from './pages/Login';
import Admin from './pages/Admin';
import DetalleCoche from './pages/DetalleCoche';  // ← NUEVA IMPORTACIÓN
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/coches" element={<Coches />} />
            <Route path="/coche/:id" element={<DetalleCoche />} />  {/* ← NUEVA RUTA */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;