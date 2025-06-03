import { useState, useEffect } from "react";
import axios from "axios";

function Servicios() {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    // API
    axios
      .get("http://localhost:3000/services")
      .then((response) => {
        setServicios(response.data.slice(0, 5));
      })
      .catch((error) => {
        console.error("Error al cargar servicios:", error);
      });

  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Servicios Disponibles</h1>
      {servicios.map((servicio) => (
        <div key={servicio.id} className="border p-2 mb-2 rounded">
          <h2 className="font-semibold">{servicio.name}</h2>
          <p>{servicio.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Servicios;
