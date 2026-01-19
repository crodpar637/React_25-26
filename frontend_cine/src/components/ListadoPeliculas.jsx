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

function ListadoPeliculas() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPeliculas() {
      try {
        const respuesta = await api.get("/movies/");

        // Actualizamos los datos de películas
        setDatos(respuesta.datos);

        // Y no tenemos errores
        setError(null);
      } catch (error) {
        setError(error.mensaje || "No se pudo conectar al servidor");
        setDatos([]);
      }
    }

    fetchPeliculas();
  }, []);

  async function handleDelete(id_movie) {
    try {
      await api.delete("/movies/" + id_movie);

      const datos_nuevos = datos.filter(
        (pelicula) => pelicula.id_movie != id_movie,
      );

      // Actualizamos los datos de películas sin la que hemos borrado
      setDatos(datos_nuevos);

      // Y no tenemos errores
      setError(null);
    } catch (error) {
      setError(error.mensaje || "No se pudo conectar al servidor");
      setDatos([]);
    }
  }

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
      <Box id="pdf-content">
        <Typography variant="h4" align="center" sx={{ my: 3 }}>
          Listado de películas
        </Typography>

        <TableContainer component={Paper}>
        <Table stickyHeader aria-label="películas table">
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell align="center">Fecha de lanzamiento</TableCell>
              <TableCell>Director</TableCell>
              <TableCell>Sinopsis</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
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
                <TableCell>
                  <Stack
                    sx={{ width: "100%" }}
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(row.id_movie)}
                    >
                      <DeleteIcon />
                    </Button>
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

      <Fab
        color="secondary"
        aria-label="imprimir"
        onClick={() => generatePDF("pdf-content", "peliculas")}
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
