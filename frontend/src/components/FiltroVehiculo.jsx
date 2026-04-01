function FiltroVehiculo() {
  return (
    <>
      <div className="card p-3 mb-2 bg-light text-dark ">
        <form className="mb-4 ms-2">
          <h5>¿Qué buscas?</h5>
          {/*  Barra de búsqueda */}
          <div className="input-group mb-3 w-90">
            <input
              type="text"
              className="form-control"
              placeholder="..."
              aria-label="Buscar vehiculo"
            />
          </div>
          <div className="row g-2">
            {/* Select marca */}
            <div className="mb-3 col-md">
              <select className="form-select" defaultValue="">
                <option value="" disabled>Marca...</option>
                
                <option value="abarth">Abarth</option>
                <option value="alfa-romeo">Alfa Romeo</option>
                <option value="audi">Audi</option>
                <option value="bmw">BMW</option>
                <option value="citroen">Citroën</option>
                <option value="cupra">Cupra</option>
                <option value="dacia">Dacia</option>
                <option value="dodge">Dodge</option>
                <option value="ds">DS</option>
                <option value="fiat">Fiat</option>
                <option value="ford">Ford</option>
                <option value="honda">Honda</option>
                <option value="kia">Kia</option>
                <option value="land-rover">Land Rover</option>
                <option value="mazda">Mazda</option>
                <option value="mercedes">Mercedes-Benz</option>
                <option value="mini">Mini</option>
                <option value="mitsubishi">Mitsubishi</option>
                <option value="nissan">Nissan</option>
                <option value="opel">Opel</option>
                <option value="peugeot">Peugeot</option>
                <option value="renault">Renault</option>
                <option value="seat">SEAT</option>
                <option value="skoda">Skoda</option>
                <option value="subaru">Subaru</option>
                <option value="suzuki">Suzuki</option>
                <option value="tesla">Tesla</option>
                <option value="toyota">Toyota</option>
                <option value="volkswagen">Volkswagen</option>
                <option value="volvo">Volvo</option>
              </select>
            </div>

            {/* Select año */}
            <div className="mb-3 col-md">
              <select className="form-select">
                <option value="">Año...</option>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>

            {/* Select precio */}
            <div className="mb-3 col-md">
              <select className="form-select">
                <option value="">Precio...</option>
                <option>Hasta €10.000</option>
                <option>Hasta €20.000</option>
                <option>Hasta €30.000</option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">
              Buscar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FiltroVehiculo;
