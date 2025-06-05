import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";

function Profile() {
  const { usuario, setUsuario } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Perfil del Usuario</h1>
      {usuario && token ? (
        <p>Bienvenido, {usuario[0].name}</p>
      ) : (
        <button
          onClick={() =>
            setUsuario({ nombre: "Andrés", correo: "andres@correo.com" })
          }
          className="bg-blue-500 text-white px-4 py-2 mt-4"
        >
          Iniciar sesión ficticio
        </button>
      )}
    </div>
  );
}

export default Profile;
