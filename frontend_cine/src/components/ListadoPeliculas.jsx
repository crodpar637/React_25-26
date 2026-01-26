/**
 * @fileoverview Componente para mostrar el listado de películas en una tabla
 * 
 * Muestra todas las películas registradas en la base de datos en formato tabla.
 * Permite editar, eliminar y descargar los datos como PDF con timestamp.
 * 
 * @module components/ListadoPeliculas
 * @requires react
 * @requires @mui/material
 * @requires ../api
 * @requires ../utils/generatePDF
 */

import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import Fab from "@mui/material/Fab";
import { Stack, Box } from "@mui/material";
import api from "../api";
import { useNavigate } from "react-router-dom";
import generatePDF from "../utils/generatePDF";

/**
 * Componente que muestra el listado de películas en tabla
 * 
 * Características:
 * - Obtiene datos de películas del servidor al montar el componente
 * - Muestra tabla con información: título, fecha lanzamiento, director, sinopsis
 * - Permite eliminar películas
 * - Permite editar películas (navega a /movies/edit/:id)
 * - Botón flotante para descargar la tabla como PDF con timestamp
 * - Manejo de errores y estados vacíos
 * 
 * @component
 * @returns {JSX.Element} Tabla de películas o mensajes de error/vacío
 */
function ListadoPeliculas() {
  // Estado para almacenar las películas
  const [datos, setDatos] = useState([]);
  
  // Estado para manejar errores
  const [error, setError] = useState(null);
  
  // Hook para navegación programática
  const navigate = useNavigate();

  /**
   * Efecto para cargar las películas al montar el componente
   */
  useEffect(() => {
    async function fetchPeliculas() {
      try {
        // Obtener películas del backend
        const respuesta = await api.get("/movies/");

        // Actualizar estado con los datos obtenidos
        setDatos(respuesta.datos);
        setError(null);
      } catch (error) {
        // En caso de error, mostrar mensaje
        setError(error.mensaje || "No se pudo conectar al servidor");
        setDatos([]);
      }
    }

    fetchPeliculas();
  }, []);

  /**
   * Maneja la eliminación de una película
   * @async
   * @function
   * @param {number} id_movie - ID de la película a eliminar
   */
  async function handleDelete(id_movie) {
    try {
      // Enviar solicitud de eliminación al servidor
      await api.delete("/movies/" + id_movie);

      // Filtrar la película eliminada del estado local
      const datos_nuevos = datos.filter(
        (pelicula) => pelicula.id_movie != id_movie,
      );

      // Actualizar el estado sin la película eliminada
      setDatos(datos_nuevos);
      setError(null);
    } catch (error) {
      // Mostrar error si algo falla
      setError(error.mensaje || "No se pudo conectar al servidor");
      setDatos([]);
    }
  }

  // Mostrar mensaje si hay error
  if (error != null) {
    return (
      <>
        <Typography variant="h4" align="center" sx={{ my: 3 }}>
          Listado de películas
        </Typography>
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          {error}
        </Typography>
      </>
    );
  }

  // Mostrar mensaje si no hay películas
  if (!datos || datos.length === 0) {
    return (
      <>
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          No hay películas disponibles
        </Typography>
      </>
    );
  }

  return (
    <>
      {/* Contenedor con ID para capturar como PDF */}
      <Box id="pdf-content">
        {/* Título */}
        <Typography variant="h4" align="center" sx={{ my: 3 }}>
          Listado de películas
        </Typography>

        {/* Tabla con películas */}
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="películas table">
            {/* Encabezados de tabla */}
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell align="center">Fecha de lanzamiento</TableCell>
                <TableCell>Director</TableCell>
                <TableCell>Sinopsis</TableCell>
                <TableCell align="center" className="omitir-pdf">Acciones</TableCell>
              </TableRow>
            </TableHead>
            
            {/* Filas de datos */}
            <TableBody>
              {datos.map((row) => (
                <TableRow key={row.id_movie}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell align="center">{row.release_date}</TableCell>
                  <TableCell>{row.id_director_director.name}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: "500px",
                      textWrap: "wrap",
                      overflow: "hidden",
                    }}
                  >
                    {row.synopsis}
                  </TableCell>
                  <TableCell className="omitir-pdf">
                    <Stack
                      sx={{ width: "100%" }}
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      {/* Botón para eliminar */}
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(row.id_movie)}
                      >
                        <DeleteIcon />
                      </Button>
                      
                      {/* Botón para editar */}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/movies/edit/" + row.id_movie)}
                      >
                        <EditIcon />
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Botón flotante para descargar PDF con timestamp */}
      <Fab
        color="secondary"
        aria-label="imprimir"
        onClick={() => generatePDF("pdf-content", "peliculas-" +   new Date().toLocaleString("es-ES").replace(":", "-").replace(":", "-").replace(", ","_") )}
        sx={{
          position: "fixed",
          top: 85,
          right: 20,
        }}
      >
        <PrintIcon />
      </Fab>
    </>
  );
}

export default ListadoPeliculas;
