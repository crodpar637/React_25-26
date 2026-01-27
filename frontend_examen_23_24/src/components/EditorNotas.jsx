import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import api from "../api";


function EditorNotas() {
  // Estado del formulario
  const [nota, setNota] = useState({
    titulo: "",
    texto: "",
    urlimagen: "",
  });

  // Obtener ID de la nota de los parámetros de ruta
  const { idnota } = useParams();

 // Estado para controlar si se está enviando el formulario
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();

  /**
   * Efecto para cargar los datos actuales del director según el parámetro de la ruta
   */
  useEffect(() => {
    async function fetchNota() {
      try {
        // Obtener datos de la nota del servidor
        const respuesta = await api.get(`/notas/${idnota}`);

        // Establecer los datos en el formulario
        setNota(respuesta.datos);
      } catch (error) {
        // Mostrar error si no se pueden recuperar los datos
        alert(error.mensaje || "Error al recuperar los datos de la nota");

      }
    }

    fetchNota();
  }, [idnota]);

/**
   * Efecto para actualizar la nota cuando isUpdating cambia a true
   */
  useEffect(() => {
    async function fetchUpdateNota() {
      try {
        // Enviar datos actualizados al servidor
        await api.put(`/notas/${idnota}`, nota);
        
        // Mostrar mensaje de éxito
       alert("Actualización correcta de la nota");

       navigate("/");

       
      } catch (error) {
        // Mostrar mensaje de error
        alert(error.mensaje || "Error al actualizar nota");
       
      }
      // Indicar que la operación ha terminado
      setIsUpdating(false);
    }

    if (isUpdating) fetchUpdateNota();
  }, [isUpdating]);

/**
   * Maneja el click en el botón de aceptar
   * Valida los datos antes de enviarlos
   */
  function handleClick() {
    // Evitar envíos duplicados
    if (isUpdating) return;

    setIsUpdating(true);
  }

/**
   * Maneja los cambios en los campos del formulario
   * @param {React.ChangeEvent} e - Evento del cambio
   */
   function handleChange(e) {
    setNota({ ...nota, [e.target.name]: e.target.value });
  }

  return (
    <>
      {/* Contenedor principal */}
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Tarjeta del formulario */}
        <Grid item size={{ xs: 12, sm: 9, md: 7 }}>
          <Paper elevation={6} sx={{ mt: 3, p: 3, maxWidth: 900, mx: "auto" }}>
            {/* Título del formulario */}
            <Typography variant="h4" align="center" sx={{ mb: 3 }}>
              Editar nota
            </Typography>

            {/* Grid con los campos */}
            <Grid
              container
              spacing={2}
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Campo de titulo */}
              <Grid item size={{ xs: 10 }}>
                <TextField
                  required
                  fullWidth
                  id="titulo"
                  label="Titulo"
                  name="titulo"
                  type="text"
                  maxLength="100"
                  value={nota.titulo}
                  onChange={handleChange}
                />
              </Grid>

              {/* Campo de texto */}

              {/* Campo de biografía */}
              <Grid item size={{ xs: 10 }}>
                <TextField
                  required
                  fullWidth
                  id="texto"
                  label="Texto"
                  name="texto"
                  type="text"
                  multiline
                  maxRows={4}
                  minRows={2}
                  maxLength="1000"
                  value={nota.texto}
                  onChange={handleChange}
                />
              </Grid>

              {/* Campo de URL de fotografía */}
              <Grid item size={{ xs: 10 }}>
                <TextField
                  required
                  fullWidth
                  id="urlimagen"
                  label="URL de la fotografía"
                  name="urlimagen"
                  type="text"
                  maxLength="255"
                  value={nota.urlimagen}
                  onChange={handleChange}
                />
              </Grid>

              {/* Botón de aceptar */}
              <Grid
                item
                size={{ xs: 10 }}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="contained"
                  sx={{ mt: 3 }}
                  loading={isUpdating}
                  loadingPosition="end"
                  onClick={handleClick}
                >
                  Aceptar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default EditorNotas;
