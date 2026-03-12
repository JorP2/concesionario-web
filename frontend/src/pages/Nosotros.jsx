function Nosotros() {
  return (
    <div className="container my-5">

      {/* Título */}
      <div className="bg-dark text-white text-center p-4 mb-4">
        <h1 className="h4 m-0">
          Compraventa de vehículos en Toledo
        </h1>
      </div>

      {/* Contenido en columnas con ancho igual */}
      <div className="row">

        <div className="col-12 col-lg-6 bg-dark text-white text-center">
          <h3 className="pt-3 mb-3">Concesionario de confianza</h3>
          <p>
            Trabajamos por y para nuestros clientes, ofreciendo vehículos totalmente revisados y con garantía. 
            Nuestro concesionario físico se encuentra en Burguillos de Toledo (Toledo) donde podrás visitar nuestras instalaciones. 
            Contamos con un catálogo permanente de más de 40 vehículos, siempre en constante renovación.
          </p>
        </div>

        <div className="col-12 col-lg-6 bg-light text-center">
          <h3 className="pt-3 mb-3">Profesionalidad y transparencia</h3>
          <p>
            Te ayudamos ofreciéndote nuestro asesoramiento profesional durante todo el proceso de compra. 
            Trabajamos según los más altos estándares de calidad, lo que nos permite ofrecer los mejores vehículos, siempre según tus gustos y necesidades.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Nosotros;