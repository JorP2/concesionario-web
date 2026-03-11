import React from 'react'

// Barra Superior de Navegación
export const Navbar = () => {
  return (
    <>
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark shadow'>
      <div className='container-fluid'>

        {/* Logo / Nombre */}
        <a className='navbar-brand' href='/'>
        <img src="/logoNohalesAutomoviles.png" alt="Concesionario-Nohales" width="140" height="50"></img>
        </a>

        {/* Botón hamburguesa */}
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarMain'
          aria-controls='navbarMain'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        {/* Links */}
        <div className='collapse navbar-collapse' id='navbarMain'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>

            {/* Coches */}
            <li className='nav-item'>
              <a className='nav-link active' href='/vehiculos'>
                Coches
              </a>
            </li>

            {/* Nosotros */}
            <li className='nav-item'>
              <a className='nav-link' href='/nosotros'>
                Nosotros
              </a>
            </li>

            {/* Contacto dropdown */}
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='/contacto'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Contacto
              </a>

              <ul className='dropdown-menu'>
                <li>
                  <a className='dropdown-item' href='/'>
                    WhatsApp
                  </a>
                </li>

                <li>
                  <a className='dropdown-item' href='/'>
                    Gmail
                  </a>
                </li>

                <li><hr className='dropdown-divider' /></li>

                <li>
                  <a className='dropdown-item' href='/contacto'>
                    Formulario
                  </a>
                </li>
              </ul>
            </li>

          </ul>

          {/* Buscador */}
          <form className='d-flex' role='search'>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Buscar coche...'
              aria-label='Buscar'
            />

            <button className='btn btn-outline-light' type='submit'>
              Buscar
            </button>
          </form>

        </div>
      </div>
    </nav>
    </>
  )
}

