import { Navbar } from "./components/Navbar";
import Vehiculos from "./pages/Vehiculos";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app-div">
      <Navbar />
      <main className="main-content">
        <h1>Concesionario</h1>
        <Vehiculos />
      </main>
      <Footer />
    </div>
  );
}

export default App;