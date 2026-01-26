
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, retornamos los datos normalizados
    return response.data;
  },
  (error) => {
    // Inicializamos un objeto de error estándar
    let respuestaError = {
      ok: false,
      datos: null,
      mensaje: 'Error desconocido',
    };

    // Manejo centralizado de errores según su tipo
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      respuestaError.mensaje = error.response.data?.mensaje || 
                         `Error: ${error.response.status} ${error.response.statusText}`;
      
      // Registros específicos según el código de estado HTTP
      if (error.response.status === 404) {
        console.warn(`Recurso no encontrado (404): ${error.config.url}`);
      } else if (error.response.status === 400) {
        console.warn(`Solicitud inválida (400): ${error.config.url}`);
      } else if (error.response.status >= 500) {
        console.error(`Error del servidor (${error.response.status}): ${error.config.url}`);
      }
    } else if (error.request) {
      // La solicitud fue realizada pero el servidor no respondió
      respuestaError.mensaje = 'No hay respuesta del servidor. Verifica tu conexión.';
      console.error('No hay respuesta del servidor:', error.request);
    } else {
      // Algo sucedió al preparar la solicitud (ej: construcción de la URL)
      respuestaError.mensaje = error.message || 'Error al realizar la solicitud';
      console.error('Error en la preparación de la solicitud:', error.message);
    }

    return Promise.reject(respuestaError);
  }
);

export default api;
