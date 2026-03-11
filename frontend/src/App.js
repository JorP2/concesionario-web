import { Navbar } from "./components/Navbar";
import Vehiculos from "./pages/Vehiculos";
import Footer from "./components/Footer";

function App() {
  return (

    <div className="app-div">
      <Navbar />
        <h1>Concesionario</h1>
        <Vehiculos />
      <Footer />
    </div>
  );
}

export default App;