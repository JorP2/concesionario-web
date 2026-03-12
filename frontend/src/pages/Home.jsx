import { MdCheck, MdEuroSymbol, MdLocationOn } from "react-icons/md"

function Home() {
  return (
    <div className="container my-5">

      {/* Título */}
      <div className="bg-dark text-white text-center p-4 mb-4 rounded">
        <h1 className="h4 m-0">Bienvenido</h1>
        <h1 className="h4 m-0">Nohales Automoviles, vehículos de confianza</h1>
      </div>

      <p className="text-center mb-5">
        Nuestros más de 25 años en el sector de la compraventa de automóviles nos avalan.
      </p>

      {/* Sección de características */}
      <div className="row text-center g-4">

        <div className="col-12 col-md-4 d-flex flex-column align-items-center">
          <MdCheck size={50}/>
          <h4 className="mt-3">Máxima garantía</h4>
          <p>
            Sometemos a nuestros coches a las más estrictas revisiones, lo que nos permite ofrecer 12 meses de garantía en todos los vehículos. Tenemos taller propio con más de 35 años de experiencia.
          </p>
        </div>

        <div className="col-12 col-md-4 d-flex flex-column align-items-center">
          <MdEuroSymbol size={50}/>
          <h4 className="mt-3">Financiación</h4>
          <p>
            Te ayudamos con la posibilidad de financiar tu vehículo en hasta 96 meses y sin entrada, independientemente de la edad del vehículo.
          </p>
        </div>

        <div className="col-12 col-md-4 d-flex flex-column align-items-center">
          <MdLocationOn size={50}/>
          <h4 className="mt-3">Compraventa en Toledo</h4>
          <p>
            Contamos con un catálogo permanente de más de 40 vehículos en nuestro concesionario en Toledo, con coches de todas las gamas y precios.
          </p>
        </div>

      </div>

    </div>
  )
}

export default Home;