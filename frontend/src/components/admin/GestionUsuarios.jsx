import React from "react";
import {
  getUsuarios,
  addUsuario,
  updateUsuario,
  deleteUsuario,
} from "../../api/usuarioApi";

const USUARIO_VACIO = {
  username: "",
  nombre: "",
  email: "",
  telefono: "",
  password: "",
};

function GestionUsuarios() {
  const [usuarios, setUsuarios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [busqueda, setBusqueda] = React.useState("");

  const [modalAbierto, setModalAbierto] = React.useState(false);
  const [usuarioEditando, setUsuarioEditando] = React.useState(null);
  const [form, setForm] = React.useState(USUARIO_VACIO);

  const cargar = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    cargar();
  }, []);

  const handleNuevo = () => {
    setUsuarioEditando(null);
    setForm(USUARIO_VACIO);
    setModalAbierto(true);
  };

  const handleEditar = (usuario) => {
    setUsuarioEditando(usuario);
    setForm({
      username: usuario.username,
      nombre: usuario.nombre,
      email: usuario.email,
      telefono: usuario.telefono || "",
      password: "",
    });
    setModalAbierto(true);
  };

  const handleGuardar = async () => {
    const nombre = form.nombre.trim();
    const username = form.username.trim();
    const email = form.email.trim();
    const telefono = form.telefono.trim();
    const password = form.password.trim();

    if (!nombre) return alert("El nombre es obligatorio");
    if (!username) return alert("El username es obligatorio");
    if (!email || !email.includes("@")) return alert("El email no es valido");
    if (telefono && !/^\d{9}$/.test(telefono)) {
      return alert("El telefono debe tener exactamente 9 digitos");
    }
    if (!usuarioEditando && password.length < 4) {
      return alert("La contrasena debe tener al menos 4 caracteres");
    }

    const payload = {
      username,
      nombre,
      email,
      telefono: telefono || null,
      ...(!usuarioEditando && { password }),
    };

    try {
      if (usuarioEditando) {
        const actualizado = await updateUsuario(usuarioEditando.id, payload);
        setUsuarios((prev) =>
          prev.map((u) => (u.id === actualizado.id ? actualizado : u)),
        );
      } else {
        const nuevo = await addUsuario(payload);
        setUsuarios((prev) => [...prev, nuevo]);
      }
      setModalAbierto(false);
    } catch {
      alert("Error al guardar el usuario. Revisa los datos.");
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("Seguro que quieres eliminar este usuario?")) return;
    try {
      await deleteUsuario(id);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch {
      alert("Error al eliminar el usuario.");
    }
  };

  const usuariosFiltrados = usuarios.filter(
    (u) =>
      u.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.username?.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.email?.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">{usuariosFiltrados.length} usuarios</span>
        <button className="btn btn-success" onClick={handleNuevo}>
          + Anadir usuario
        </button>
      </div>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Buscar usuario..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {loading && <p className="text-center mt-4">Cargando usuarios...</p>}
      {!loading && error && (
        <p className="text-center mt-4 text-danger">
          Error al cargar usuarios.
        </p>
      )}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Username</th>
                <th>Email</th>
                <th>Telefono</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((u) => (
                <tr key={u.id}>
                  <td>{u.nombre}</td>
                  <td>
                    <code>{u.username}</code>
                  </td>
                  <td>{u.email}</td>
                  <td>{u.telefono || "-"}</td>
                  <td>
                    {u.esSuperUsuario ? (
                      <span className="badge bg-dark">Superusuario</span>
                    ) : (
                      <span className="badge bg-secondary">Admin</span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-2 flex-wrap">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEditar(u)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleEliminar(u.id)}
                        disabled={u.esSuperUsuario}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalAbierto && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {usuarioEditando ? "Editar usuario" : "Nuevo usuario"}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setModalAbierto(false)}
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    className="form-control"
                    value={form.nombre}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, nombre: e.target.value }))
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    className="form-control"
                    value={form.username}
                    disabled={!!usuarioEditando}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, username: e.target.value }))
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Telefono</label>
                  <input
                    className="form-control"
                    value={form.telefono}
                    maxLength={9}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        telefono: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                  />
                </div>
                {!usuarioEditando && (
                  <div className="mb-3">
                    <label className="form-label">Contrasena</label>
                    <input
                      type="password"
                      className="form-control"
                      value={form.password}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, password: e.target.value }))
                      }
                    />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalAbierto(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-success" onClick={handleGuardar}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestionUsuarios;
