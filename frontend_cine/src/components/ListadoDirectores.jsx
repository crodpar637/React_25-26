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
import api from "../api";

function ListadoDirectores() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDirectores() {
      try {
        const respuesta = await api.get("/directors/");
        
        // Actualizamos los datos de directores
        setDatos(respuesta.datos);

        // Y no tenemos errores
        setError(null);
      } catch (error) {
        setError(error.mensaje || "No se pudo conectar al servidor");
        setDatos([]);
      }
    }

    fetchDirectores();
  }, []);

  if (error != null) {
    return (
      <>
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
          No hay directores disponibles
        </Typography>
      </>
    );
  }

  return (
    <>
      <Typography variant="h4" align="center" sx={{my: 3}}>Listado de directores</Typography>

      <TableContainer component={Paper}>
        <Table stickyHeader ria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="center">Fecha nacimiento</TableCell>
              <TableCell>Biografía</TableCell>
              <TableCell>Fotografía</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos.map((row) => (
              <TableRow key={row.id_director}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="center">{row.birth_date}</TableCell>
                <TableCell>{row.biography}</TableCell>
                <TableCell>
                  <Avatar alt={row.name} src={row.photo_url} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ListadoDirectores;
