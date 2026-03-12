import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

function Contacto() {
  return (
    <div className="container my-5">

      <div className="bg-dark text-white text-center p-4 mb-4 rounded">
        <h1 className="h4 m-0">
          Contáctanos y encuentra tu coche ideal. Si no lo tenemos, te lo buscamos
        </h1>
      </div>

      <form className="mx-auto" style={{ maxWidth: "500px" }}>

        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Nombre" />
        </div>

        <div className="row g-2 mb-3">
          <div className="col-12 col-md-6">
            <input type="email" className="form-control" placeholder="Email" />
          </div>
          <div className="col-12 col-md-6">
            <input type="text" className="form-control" placeholder="Teléfono" />
          </div>
        </div>

        <div className="mb-3">
          <textarea className="form-control" rows="4" placeholder="Mensaje"></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Enviar
        </button>
      </form>

      <div className="mt-5">
        <div className="d-flex align-items-center mb-2">
          <MdPhone className="me-2" size={24}/> +34 651 86 82 30
        </div>
        <div className="d-flex align-items-center mb-2">
          <MdEmail className="me-2" size={24}/> nohalesautomoviles@gmail.com
        </div>
        <div className="d-flex align-items-center mb-2">
          <MdLocationOn className="me-2" size={24}/> C/ Caño S/N, 45112 Burguillos de Toledo (Toledo)
        </div>
      </div>

    </div>
  );
}

export default Contacto;