/**
 * @fileoverview Componente que muestra directores en tarjetas personalizadas
 * 
 * Alternativa visual al listado en tabla. Muestra directores como tarjetas con
 * imagen, nombre, biografía y fecha de nacimiento. Permite editar y eliminar directores.
 * 
 * @module components/ListadoCardsDirectores
 * @requires react
 * @requires @mui/material
 * @requires ../api
 */

import PrintIcon from "@mui/icons-material/Print";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import styles from "../css/Impresion.module.css";

/**
 * Componente que muestra el listado de directores como tarjetas
 * 
 * Características:
 * - Obtiene directores del servidor al montar el componente
 * - Muestra cada director como una tarjeta con imagen
 * - Tarjeta contiene: nombre, biografía, fecha de nacimiento
 * - Acciones: editar y borrar director
 * - Botón flotante para imprimir la página
 * - Diseño responsivo (xs: 12, sm: 6, md: 4, lg: 3 columnas)
 * 
 * @component
 * @returns {JSX.Element} Grid de tarjetas de directores o mensajes de estado
 */
function ListadoCardsDirectores() {
  // Estado para almacenar los directores
  const [datos, setDatos] = useState([]);
  
  // Estado para manejar errores
  const [error, setError] = useState(null);

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
      {/* Título */}
      <Typography variant="h4" align="center" sx={{ my: 3 }}>
        Listado de directores
      </Typography>
      
      {/* Grid responsivo con tarjetas */}
      <Grid container spacing={1}>
        {datos.map((row) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={row.id_director}>
            {/* Tarjeta de director */}
            <Card>
              {/* Imagen del director */}
              <CardMedia
                sx={{ height: 350 }}
                image={row.photo_url}
                title={row.name}
              />
              
              {/* Contenido de la tarjeta */}
              <CardContent>
                {/* Nombre del director */}
                <Typography gutterBottom variant="h5" component="div">
                  {row.name}
                </Typography>
                
                {/* Biografía del director */}
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {row.biography}
                </Typography>
                
                {/* Fecha de nacimiento */}
                <Typography variant="caption" gutterBottom>
                  {row.birth_date}
                </Typography>
              </CardContent>
              
              {/* Botones de acciones */}
              <CardActions>
                {/* Botón para editar */}
                <Link to={`/directors/edit/${row.id_director}`}>
                  <Button size="small">EDITAR</Button>
                </Link>
                
                {/* Botón para eliminar */}
                <Button
                  size="small"
                  onClick={() => handleDelete(row.id_director)}
                >
                  BORRAR
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Botón flotante para imprimir */}
      <Fab
        className={styles.noprint}
        color="secondary"
        aria-label="imprimir"
        onClick={() => window.print()}
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

export default ListadoCardsDirectores;
