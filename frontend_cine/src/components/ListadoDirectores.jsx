/**
 * @fileoverview Componente para mostrar el listado de directores en una tabla
 * 
 * Muestra todos los directores registrados en la base de datos en formato tabla.
 * Permite editar, eliminar y descargar los datos como PDF.
 * 
 * @module components/ListadoDirectores
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
import Avatar from "@mui/material/Avatar";
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
 * Componente que muestra el listado de directores en tabla
 * 
 * Características:
 * - Obtiene datos de directores del servidor al montar el componente
 * - Muestra tabla con información: nombre, fecha nacimiento, biografía, foto
 * - Permite eliminar directores
 * - Permite editar directores (navega a /directors/edit/:id)
 * - Botón flotante para descargar la tabla como PDF
 * - Manejo de errores y estados vacíos
 * 
 * @component
 * @returns {JSX.Element} Tabla de directores o mensajes de error/vacío
 */
function ListadoDirectores() {
  // Estado para almacenar los directores
  const [datos, setDatos] = useState([]);
  
  // Estado para manejar errores
  const [error, setError] = useState(null);
  
  // Hook para navegación programática
  const navigate = useNavigate();

  /**
   * Efecto para cargar los directores al montar el componente
   */
  useEffect(() => {
    async function fetchDirectores() {
      try {
        // Obtener directores del backend
        const respuesta = await api.get("/directors/");

        // Actualizar estado con los datos obtenidos
        setDatos(respuesta.datos);
        setError(null);
      } catch (error) {
        // En caso de error, mostrar mensaje
        setError(error.mensaje || "No se pudo conectar al servidor");
        setDatos([]);
      }
    }

    fetchDirectores();
  }, []);

  /**
   * Maneja la eliminación de un director
   * @async
   * @function
   * @param {number} id_director - ID del director a eliminar
   */
  async function handleDelete(id_director) {
    try {
      // Enviar solicitud de eliminación al servidor
      await api.delete("/directors/" + id_director);

      // Filtrar el director eliminado del estado local
      const datos_nuevos = datos.filter(
        (director) => director.id_director != id_director,
      );

      // Actualizar el estado sin el director eliminado
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
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          {error}
        </Typography>
      </>
    );
  }

  // Mostrar mensaje si no hay directores
  if (!datos || datos.length === 0) {
    return (
      <>
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          No hay directores disponibles
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
          Listado de directores
        </Typography>

        {/* Tabla con directores */}
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="simple table">
            {/* Encabezados de tabla */}
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="center">Fecha nacimiento</TableCell>
                <TableCell>Biografía</TableCell>
                <TableCell>Fotografía</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            
            {/* Filas de datos */}
            <TableBody>
              {datos.map((row) => (
                <TableRow key={row.id_director}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="center">{row.birth_date}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: "500px",
                      textWrap: "wrap",
                      overflow: "hidden",
                    }}
                  >
                    {row.biography}
                  </TableCell>
                  <TableCell>
                    <Avatar alt={row.name} src={row.photo_url} />
                  </TableCell>
                  <TableCell>
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
                        onClick={() => handleDelete(row.id_director)}
                      >
                        <DeleteIcon />
                      </Button>

                      {/* Botón para editar */}
                      <Button
                        sx={{ ml: 1 }}
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          navigate("/directors/edit/" + row.id_director)
                        }
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

      {/* Botón flotante para descargar PDF */}
      <Fab
        color="secondary"
        aria-label="imprimir"
        onClick={() => generatePDF("pdf-content", "directores")}
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

export default ListadoDirectores;
