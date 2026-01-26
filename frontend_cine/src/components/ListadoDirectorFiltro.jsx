/**
 * @fileoverview Componente para mostrar directores con filtros avanzados
 * 
 * Permite filtrar directores por rango de fecha de nacimiento.
 * Muestra resultados en tabla con opciones de editar, eliminar y descargar PDF.
 * 
 * @module components/ListadoDirectorFiltro
 * @requires react
 * @requires @mui/material
 * @requires @react-pdf/renderer
 * @requires ../api
 */

import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Card, CardContent, Grid, Stack, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import ListadoDirectoresFiltroPDF from "./ListadoDirectoresFiltroPDF";

function ListadoDirectorFiltro() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [filtroFechaInicio, setFiltroFechaInicio] = useState("");
  const [filtroFechaFin, setFiltroFechaFin] = useState("");
  const navigate = useNavigate();

  // Cargar directores
  useEffect(() => {
    async function fetchData() {
      try {
        const respuesta = await api.get("/directors/");

        setDatos(respuesta.datos);
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
        (director) => director.birth_date >= filtroFechaInicio
      );
    }

    // Filtro por fecha de fin
    if (filtroFechaFin) {
      resultados = resultados.filter(
        (director) => director.birth_date <= filtroFechaFin
      );
    }

    return resultados;
  }, [datos, filtroFechaInicio, filtroFechaFin]);

  async function handleDelete(id_director) {
    try {
      await api.delete("/directors/" + id_director);

      const datos_nuevos = datos.filter(
        (director) => director.id_director != id_director
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
  }

  if (error != null) {
    return (
      <>
        <Typography variant="h4" align="center" sx={{ my: 3 }}>
          Listado de directores
        </Typography>
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          {error}
        </Typography>
      </>
    );
  }

  return (
    <>
      <Typography variant="h4" align="center" sx={{ my: 3 }}>
        Listado de directores con filtros
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
                label="Fecha de nacimiento desde"
                type="date"
                value={filtroFechaInicio}
                onChange={(e) => setFiltroFechaInicio(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Fecha de nacimiento hasta"
                type="date"
                value={filtroFechaFin}
                onChange={(e) => setFiltroFechaFin(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
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

      {/* Mensaje si no hay directores */}
      {(!datosFiltrados || datosFiltrados.length === 0) && (
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          No hay directores disponibles
        </Typography>
      )}

      {/* Tabla de directores */}
      {datosFiltrados && datosFiltrados.length > 0 && (
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="directores table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="center">Fecha de nacimiento</TableCell>
                <TableCell>Biografía</TableCell>
                <TableCell>Fotografía</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datosFiltrados.map((row) => (
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
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(row.id_director)}
                      >
                        <DeleteIcon />
                      </Button>
                      <Button
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
              <ListadoDirectoresFiltroPDF data={datosFiltrados} />
            }
            fileName="directores.pdf"
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

export default ListadoDirectorFiltro;
