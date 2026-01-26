import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

function VisorNotas() {
  // Estado para almacenar los datos de las notas
  const [datos, setDatos] = useState([]);
  // Estado para manejar errores
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNotas() {
      try {
        // Obtener notas del backend
        const respuesta = await api.get("/notas/");

        // Actualizar estado con los datos obtenidos
        setDatos(respuesta.datos);
        setError(null);
      } catch (error) {
        // En caso de error, mostrar mensaje
        setError(error.mensaje || "No se pudo conectar al servidor");
        setDatos([]);
      }
    }

    fetchNotas();
  }, []);

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

  // Mostrar mensaje si no hay notas
  if (!datos || datos.length === 0) {
    return (
      <>
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          No hay notas disponibles
        </Typography>
      </>
    );
  }

  return (
    <>
      <Typography variant="h3" align="center" sx={{ my: 3 }}>
        Visor de notas
      </Typography>
      <Grid container spacing={2}>
        {datos.map((nota) => (
          <Grid key={nota.idnota} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5">{nota.titulo}</Typography>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  {(new Date(nota.fcreacion)).toLocaleDateString()}
                </Typography>
                <CardMedia
                  sx={{ height: 250 }}
                  image={nota.urlimagen}
                  title={nota.titulo}
                />
                <Typography variant="body2" sx={{mt:2}}>{nota.texto}</Typography>
              </CardContent>
              <CardActions>
                <Link to={"/ejercicio3/" + nota.idnota}>
                  <Button size="small">EDITAR NOTA</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
export default VisorNotas;
