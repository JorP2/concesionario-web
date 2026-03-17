import { MdCheck, MdEuroSymbol, MdLocationOn } from "react-icons/md";
import "../styles/Home.css";

function Home() {
  return (
    <div className="container my-5">
      {/* Título */}
      <div className="bg-dark text-white text-center p-4 rounded mb-2">
        <h1 className="h3 m-0">Bienvenido</h1>
        <h3 className="h5 m-0">Nohales Automoviles, vehículos de confianza</h3>
      </div>

      <div className="card mb-4 border-0 shadow">
        <img
          src="https://picsum.photos/900/350?random=1"
          className="card-img-top"
          alt="Vehículo destacado"
        />
        {/* Texto */}
        <div className="card-body text-center">
          <p className="card-text">
            Nuestros más de 25 años en el sector de la compraventa de
            automóviles nos avalan.
          </p>
        </div>
      </div>

      {/* Sección de características */}
      <div className="row g-4">
        {/* CARD 1 */}
        <div className="col-12 col-md-4">
          <div className="card h-100 text-center shadow-sm feature-card">
            <div className="card-body">
              <MdCheck size={50} className="mb-3" />
              <h5 className="card-title">Máxima garantía</h5>
              <p className="card-text">
                Sometemos a nuestros coches a las más estrictas revisiones, lo
                que nos permite ofrecer 12 meses de garantía en todos los
                vehículos. Tenemos taller propio con más de 35 años de
                experiencia.
              </p>
            </div>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="col-12 col-md-4">
          <div className="card h-100 text-center shadow-sm feature-card">
            <div className="card-body">
              <MdEuroSymbol size={50} className="mb-3" />
              <h5 className="card-title">Financiación</h5>
              <p className="card-text">
                Te ayudamos con la posibilidad de financiar tu vehículo en hasta
                96 meses y sin entrada, independientemente de la edad del
                vehículo.
              </p>
            </div>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="col-12 col-md-4">
          <div className="card h-100 text-center shadow-sm feature-card">
            <div className="card-body">
              <MdLocationOn size={50} className="mb-3" />
              <h5 className="card-title">Compraventa en Toledo</h5>
              <p className="card-text">
                Contamos con un catálogo permanente de más de 40 vehículos en
                nuestro concesionario en Toledo, con coches de todas las gamas y
                precios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
