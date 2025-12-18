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

function ListadoDirectores() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDirectores() {
      try {
        let response = await fetch("http://localhost:3000/api/directors/");

        if (response.ok) {
          let datosDirectores = await response.json();

          // Actualizamos los datos de directores
          setDatos(datosDirectores.datos);

          // Y no tenemos errores
          setError(null);
        } else {
          setError("Respuesta errónea del servidor.");
          setDatos(null);
        }
      } catch (e) {
        setError("No se pudo conectar al servidor: " + e.toString());
        setDatos(null);
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

  return (
    <>
      <Typography variant="h3">Listado de directores</Typography>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Fecha nacimiento</TableCell>
              <TableCell>Biografía</TableCell>
              <TableCell>Fotografía</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos.map((row) => (
              <TableRow key={row.id_director}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.birth_date}</TableCell>
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
