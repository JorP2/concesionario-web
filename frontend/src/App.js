import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home"
import "./App.css";
//import Contacto from "./pages/Contacto";
//import Nosotros from "./pages/Nosotros";

function App() {
  return (
    <div className="app-div">
      <Navbar />
      <main className="main-content">
        <Home/>
      </main>
      <Footer />
    </div>
  );
}

export default App;