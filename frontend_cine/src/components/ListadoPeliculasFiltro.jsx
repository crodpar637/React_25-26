import { useState, useEffect, useMemo } from "react";
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
import ClearIcon from "@mui/icons-material/Clear";
import DownloadIcon from "@mui/icons-material/Download";
import Fab from "@mui/material/Fab";
import api from "../api";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ListadoPeliculasFiltroPDF from "./ListadoPeliculasFiltroPDF";

function ListadoPeliculasFiltro() {
  const [datos, setDatos] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [error, setError] = useState(null);
  const [filtroFechaInicio, setFiltroFechaInicio] = useState("");
  const [filtroFechaFin, setFiltroFechaFin] = useState("");
  const [filtroDirector, setFiltroDirector] = useState("");
  const navigate = useNavigate();

  // Cargar películas y directores
  useEffect(() => {
    async function fetchData() {
      try {
        const respuestaPeliculas = await api.get("/movies/");
        const respuestaDirectores = await api.get("/directors/");

        setDatos(respuestaPeliculas.datos);
        setDirectores(respuestaDirectores.datos);
        setError(null);
      } catch (error) {
        setError(error.mensaje || "No se pudo conectar al servidor");
        setDatos([]);
      }
    }

    fetchData();
  }, []);

  // Calcular datos filtrados con useMemo
  const datosFiltrados = useMemo(() => {
    let resultados = datos;

    // Filtro por fecha de inicio
    if (filtroFechaInicio) {
      resultados = resultados.filter(
        (pelicula) => pelicula.release_date >= filtroFechaInicio,
      );
    }

    // Filtro por fecha de fin
    if (filtroFechaFin) {
      resultados = resultados.filter(
        (pelicula) => pelicula.release_date <= filtroFechaFin,
      );
    }

    // Filtro por director
    if (filtroDirector) {
      resultados = resultados.filter(
        (pelicula) => pelicula.id_director == filtroDirector,
      );
    }

    return resultados;
  }, [datos, filtroFechaInicio, filtroFechaFin, filtroDirector]);

  async function handleDelete(id_movie) {
    try {
      await api.delete("/movies/" + id_movie);

      const datos_nuevos = datos.filter(
        (pelicula) => pelicula.id_movie != id_movie,
      );

      setDatos(datos_nuevos);
      setError(null);
    } catch (error) {
      setError(error.mensaje || "No se pudo conectar al servidor");
    }
  }

  function limpiarFiltros() {
    setFiltroFechaInicio("");
    setFiltroFechaFin("");
    setFiltroDirector("");
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

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 3 }}>
        Listado de películas con filtros
      </Typography>

      {/* Tarjeta de filtros */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Filtros
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Fecha de inicio"
                type="date"
                value={filtroFechaInicio}
                onChange={(e) => setFiltroFechaInicio(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Fecha de fin"
                type="date"
                value={filtroFechaFin}
                onChange={(e) => setFiltroFechaFin(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                select
                label="Director"
                value={filtroDirector}
                onChange={(e) => setFiltroDirector(e.target.value)}
                fullWidth
              >
                <MenuItem value="">
                  <em>Todos los directores</em>
                </MenuItem>
                {directores.map((director) => (
                  <MenuItem
                    key={director.id_director}
                    value={director.id_director}
                  >
                    {director.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={limpiarFiltros}
                fullWidth
                startIcon={<ClearIcon />}
                sx={{ height: "100%" }}
              >
                Limpiar filtros
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Mensaje si no hay películas */}
      {(!datosFiltrados || datosFiltrados.length === 0) && (
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          No hay películas disponibles
        </Typography>
      )}

      {/* Tabla de películas */}
      {datosFiltrados && datosFiltrados.length > 0 && (
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="películas table">
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell align="center">Fecha de lanzamiento</TableCell>
                <TableCell>Director</TableCell>
                <TableCell>Sinopsis</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datosFiltrados.map((row) => (
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
      )}

      {datosFiltrados && datosFiltrados.length > 0 && (
        <Fab
          aria-label="descargar"
          sx={{
            position: "fixed",
            top: 85,
            right: 20,
          }}
        >
          <PDFDownloadLink
            document={
              <ListadoPeliculasFiltroPDF data={datosFiltrados} />
            }
            fileName="peliculas.pdf"
          >
            {({ loading }) => (
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {loading ? (
                  <Typography sx={{ fontSize: 12 }}>...</Typography>
                ) : (
                  <DownloadIcon />
                )}
              </Box>
            )}
          </PDFDownloadLink>
        </Fab>
      )}
    </>
  );
}

export default ListadoPeliculasFiltro;
