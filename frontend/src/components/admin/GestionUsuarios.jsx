import React from "react";
import {
  getUsuarios,
  addUsuario,
  updateUsuario,
  deleteUsuario,
  activateUser,
  deactivateUser,
  changePassword,
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

  // Modal crear/editar
  const [modalAbierto, setModalAbierto] = React.useState(false);
  const [usuarioEditando, setUsuarioEditando] = React.useState(null); // null = crear
  const [form, setForm] = React.useState(USUARIO_VACIO);

  // Modal cambiar contraseña
  const [modalPassword, setModalPassword] = React.useState(false);
  const [usuarioPassword, setUsuarioPassword] = React.useState(null);
  const [nuevaPassword, setNuevaPassword] = React.useState("");

  const cargar = async () => {
    setLoading(true);
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

  // Abrir modal crear
  const handleNuevo = () => {
    setUsuarioEditando(null);
    setForm(USUARIO_VACIO);
    setModalAbierto(true);
  };

  // Abrir modal editar
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

  // Guardar (crear o editar)
  const handleGuardar = async () => {
    // Validaciones
    if (!form.nombre.trim()) return alert("El nombre es obligatorio");
    if (!form.username.trim()) return alert("El username es obligatorio");
    if (!form.email.trim() || !form.email.includes("@"))
      return alert("El email no es válido");
    if (!usuarioEditando && !form.password.trim())
      return alert("La contraseña es obligatoria");
    if (form.telefono && !/^\d{9}$/.test(form.telefono))
      return alert("El teléfono debe tener exactamente 9 dígitos");

    // Construye solo los campos que acepta el backend
    const payload = {
      username: form.username,
      nombre: form.nombre,
      email: form.email,
      telefono: form.telefono || null,
      ...(!usuarioEditando && { password: form.password }),
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

  // Activar / desactivar
  const handleToggleActivo = async (usuario) => {
    try {
      const actualizado = usuario.activo
        ? await deactivateUser(usuario.id)
        : await activateUser(usuario.id);
      setUsuarios((prev) =>
        prev.map((u) => (u.id === actualizado.id ? actualizado : u)),
      );
    } catch {
      console.error("Error al cambiar estado del usuario");
    }
  };

  // Borrar
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;
    try {
      await deleteUsuario(id);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch {
      console.error("Error al eliminar el usuario");
    }
  };

  // Cambiar contraseña
  const handleAbrirPassword = (usuario) => {
    setUsuarioPassword(usuario);
    setNuevaPassword("");
    setModalPassword(true);
  };

  const handleGuardarPassword = async () => {
    try {
      await changePassword(usuarioPassword.id, nuevaPassword);
      setModalPassword(false);
    } catch {
      console.error("Error al cambiar la contraseña");
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
      {/* Cabecera */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">{usuariosFiltrados.length} usuarios</span>
        <button className="btn btn-success" onClick={handleNuevo}>
          + Añadir usuario
        </button>
      </div>

      {/* Buscador */}
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Buscar usuario..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* Estados */}
      {loading && <p className="text-center mt-4">Cargando usuarios...</p>}
      {!loading && error && (
        <p className="text-center mt-4 text-danger">
          Error al cargar usuarios.
        </p>
      )}

      {/* Tabla */}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Username</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th>Estado</th>
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
                  <td>{u.telefono || "—"}</td>
                  <td>
                    {u.esSuperUsuario ? (
                      <span className="badge bg-dark">Superusuario</span>
                    ) : (
                      <span className="badge bg-secondary">Admin</span>
                    )}
                  </td>
                  <td>
                    <span
                      className={`badge ${u.activo ? "bg-success" : "bg-danger"}`}
                    >
                      {u.activo ? "Activo" : "Inactivo"}
                    </span>
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
                        className={`btn btn-sm ${u.activo ? "btn-outline-warning" : "btn-outline-success"}`}
                        onClick={() => handleToggleActivo(u)}
                        disabled={u.esSuperUsuario}
                      >
                        {u.activo ? "Desactivar" : "Activar"}
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleAbrirPassword(u)}
                      >
                        Contraseña
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

      {/* ── MODAL CREAR / EDITAR ── */}
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
                  <label className="form-label">Teléfono</label>
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
                    <label className="form-label">Contraseña</label>
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

      {/* ── MODAL CAMBIAR CONTRASEÑA ── */}
      {modalPassword && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Cambiar contraseña — {usuarioPassword?.nombre}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setModalPassword(false)}
                />
              </div>
              <div className="modal-body">
                <label className="form-label">Nueva contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={nuevaPassword}
                  onChange={(e) => setNuevaPassword(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalPassword(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleGuardarPassword}
                >
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
