import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

function Contacto() {
  return (
    <div className="container my-5">

      {/* Título */}
      <div className="bg-dark text-white text-center p-4 mb-4 rounded">
        <h1 className="h4 m-0">
          Contáctanos y encuentra tu coche ideal. Si no lo tenemos, te lo buscamos
        </h1>
      </div>

      <div className="row">

        {/* Formulario */}
        <div className="col-12 col-lg-6 mb-4">
          <form className="text-start">
            <h3 className="mb-3 text-center">Escríbenos</h3>
            <p className="mb-3 text-center">
              Si lo prefieres, puedes utilizar el siguiente formulario de contacto.
            </p>

            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Nombre" />
            </div>
            <div className="row g-2 mb-3">
              <div className="col-12 col-md-6">
                <input type="email" className="form-control" placeholder="Tu email" />
              </div>
              <div className="col-12 col-md-6">
                <input type="text" className="form-control" placeholder="Tu teléfono" />
              </div>
            </div>
            <div className="mb-3">
              <textarea className="form-control" rows="4" placeholder="Mensaje"></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Enviar
            </button>
          </form>
        </div>

        {/* Contacto directo */}
        <div className="col-12 col-lg-6 text-center">
          <h3 className="mb-3">Contáctanos directamente</h3>
          <p className="mb-3 text-center">
            Estaremos encantados de atenderte
          </p>

            <div className="d-flex align-items-center justify-content-center mb-3">
              <MdPhone className="me-2" size={30}/> +34 651 86 82 30 | +34 925 39 31 86
            </div>

            <div className="d-flex align-items-center justify-content-center mb-3">
              <MdEmail className="me-2" size={30}/> nohalesautomoviles@gmail.com
            </div>

            <div className="d-flex align-items-center justify-content-center mb-3">
              <MdLocationOn className="me-2" size={30}/> C/ Caño S/N, 45112 Burguillos de Toledo (Toledo)
            </div>
        </div>

      </div>
    </div>
  );
}

export default Contacto;