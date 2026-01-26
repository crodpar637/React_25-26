/**
 * @fileoverview Componente para editar una película existente
 * 
 * Formulario para actualizar los datos de una película.
 * Carga los datos actuales y permite modificarlos con las mismas validaciones
 * que el formulario de alta, incluyendo la posibilidad de cambiar el director.
 * 
 * @module components/EditarPelicula
 * @requires react
 * @requires @mui/material
 * @requires @mui/x-date-pickers
 * @requires dayjs
 * @requires ../api
 */

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";
import api from "../api";

/**
 * Componente para editar una película
 * 
 * Características:
 * - Obtiene el ID de la película de los parámetros de ruta
 * - Carga lista de directores y datos de la película al montar
 * - Permite modificar todos los campos con validaciones
 * - Formulario validado con reglas específicas
 * - Diálogo modal para confirmar éxito o error
 * - Navega a listado de películas tras actualización exitosa
 * 
 * @component
 * @returns {JSX.Element} Formulario de edición de película
 */
function EditarPelicula() {
  // Hook para navegación programática
  const navigate = useNavigate();
  
  // Estado del formulario
  const [pelicula, setPelicula] = useState({
    title: "",
    synopsis: "",
    release_date: "",
    id_director: "",
  });
  
  // Estado para almacenar directores disponibles
  const [directores, setDirectores] = useState([]);
  
  // Estado de validación de campos
  const [isCamposValidos, setIsCamposValidos] = useState({
    title: true,
    synopsis: true,
    release_date: true,
    id_director: true,
  });
  
  // Estado para controlar si se está enviando el formulario
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Estado del diálogo de resultado
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSeverity, setDialogSeverity] = useState("success");
  
  // Obtener ID de la película de los parámetros de ruta
  const { id_movie } = useParams();

  /**
   * Efecto para cargar la lista de directores disponibles
   */
  useEffect(() => {
    async function fetchDirectores() {
      try {
        // Obtener lista de directores del servidor
        const respuesta = await api.get("/directors/");
        setDirectores(respuesta.datos);
      } catch (error) {
        // Mostrar error si no se pueden recuperar los directores
        setDialogMessage(
          error.mensaje || "Error al recuperar los directores"
        );
        setDialogSeverity("error");
        setOpenDialog(true);
      }
    }

    fetchDirectores();
  }, []);

  /**
   * Efecto para actualizar la película cuando isUpdating cambia a true
   */
  useEffect(() => {
    async function fetchUpdatePelicula() {
      try {
        // Enviar datos actualizados al servidor
        await api.put(`/movies/${id_movie}`, pelicula);

        // Mostrar mensaje de éxito
        setDialogMessage("Actualización correcta de la película");
        setDialogSeverity("success");
        setOpenDialog(true);
      } catch (error) {
        // Mostrar mensaje de error
        setDialogMessage(
          error.mensaje || "Error al actualizar la película"
        );
        setDialogSeverity("error");
        setOpenDialog(true);
      }
      // Indicar que la operación ha terminado
      setIsUpdating(false);
    }

    if (isUpdating) fetchUpdatePelicula();
  }, [isUpdating]);

  /**
   * Efecto para cargar los datos actuales de la película al montar
   */
  useEffect(() => {
    async function fetchPelicula() {
      try {
        // Obtener datos de la película del servidor
        const respuesta = await api.get(`/movies/${id_movie}`);

        // Establecer los datos en el formulario
        setPelicula(respuesta.datos);
      } catch (error) {
        // Mostrar error si no se pueden recuperar los datos
        setDialogMessage(
          error.mensaje || "Error al recuperar los datos de la película"
        );
        setDialogSeverity("error");
        setOpenDialog(true);
      }
    }

    fetchPelicula();
  }, [id_movie]);

  /**
   * Maneja los cambios en los campos del formulario
   * @param {React.ChangeEvent} e - Evento del cambio
   */
  function handleChange(e) {
    setPelicula({ ...pelicula, [e.target.name]: e.target.value });
  }

  /**
   * Maneja el click en el botón de aceptar
   * Valida los datos antes de enviarlos
   */
  function handleClick() {
    // Evitar envíos duplicados
    if (isUpdating) return;

    if (validarDatos()) {
      setIsUpdating(true);
    }
  }

  /**
   * Maneja el cierre del diálogo de resultado
   */
  function handleDialogClose() {
    setOpenDialog(false);

    // Si fue éxito, navegar al listado de películas
    if (dialogSeverity === "success") navigate("/movies");
  }

  /**
   * Valida los datos del formulario
   * @returns {boolean} true si todos los datos son válidos, false en caso contrario
   */
  function validarDatos() {
    let valido = true;
    let objetoValidacion = {
      title: true,
      synopsis: true,
      release_date: true,
      id_director: true,
    };

    // Validación del título: mínimo 3 caracteres
    if (pelicula.title.length < 3) {
      valido = false;
      objetoValidacion.title = false;
    }

    // Validación de la sinopsis: mínimo 20 caracteres
    if (pelicula.synopsis.length < 20) {
      valido = false;
      objetoValidacion.synopsis = false;
    }

    // Validación de la fecha: campo obligatorio
    if (!pelicula.release_date) {
      valido = false;
      objetoValidacion.release_date = false;
    }

    // Validación del director: debe seleccionar uno
    if (!pelicula.id_director) {
      valido = false;
      objetoValidacion.id_director = false;
    }

    // Actualizar estado de validación
    setIsCamposValidos(objetoValidacion);

    return valido;
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
              Editar película
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
              {/* Campo de título */}
              <Grid item size={{ xs: 10 }}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Título"
                  name="title"
                  type="text"
                  maxLength="100"
                  value={pelicula.title}
                  onChange={handleChange}
                  error={!isCamposValidos.title}
                  helperText={
                    !isCamposValidos.title &&
                    "Título debe tener al menos 3 caracteres."
                  }
                />
              </Grid>

              {/* Campo de fecha de lanzamiento */}
              <Grid item size={{ xs: 10 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="es"
                >
                  <DatePicker
                    label="Fecha de lanzamiento"
                    name="release_date"
                    minDate={dayjs("1800-01-01")}
                    maxDate={dayjs()}
                    slotProps={{
                      textField: {
                        required: true,
                        fullWidth: true,
                        error: !isCamposValidos.release_date,
                        helperText: !isCamposValidos.release_date
                          ? "La fecha es obligatoria"
                          : "",
                      },
                    }}
                    value={
                      pelicula.release_date
                        ? dayjs(pelicula.release_date)
                        : null
                    }
                    onChange={(newValue) =>
                      setPelicula({
                        ...pelicula,
                        release_date: newValue.format("YYYY-MM-DD"),
                      })
                    }
                  />
                </LocalizationProvider>
              </Grid>

              {/* Campo de selección de director */}
              <Grid item size={{ xs: 10 }}>
                <TextField
                  select
                  required
                  fullWidth
                  id="id_director"
                  label="Director"
                  name="id_director"
                  value={pelicula.id_director}
                  onChange={handleChange}
                  error={!isCamposValidos.id_director}
                  helperText={
                    !isCamposValidos.id_director &&
                    "Debe seleccionar un director"
                  }
                >
                  <MenuItem value="">
                    <em>Seleccionar director</em>
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

              {/* Campo de sinopsis */}
              <Grid item size={{ xs: 10 }}>
                <TextField
                  required
                  fullWidth
                  id="synopsis"
                  label="Sinopsis"
                  name="synopsis"
                  type="text"
                  multiline
                  maxRows={4}
                  minRows={2}
                  maxLength="1000"
                  value={pelicula.synopsis}
                  onChange={handleChange}
                  error={!isCamposValidos.synopsis}
                  helperText={
                    !isCamposValidos.synopsis &&
                    "Sinopsis debe tener al menos 20 caracteres."
                  }
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

      {/* Diálogo de resultado */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        disableEscapeKeyDown
        aria-labelledby="result-dialog-title"
      >
        <DialogTitle id="result-dialog-title">
          {dialogSeverity === "success" ? "Operación correcta" : "Error"}
        </DialogTitle>
        <DialogContent dividers>
          <Alert severity={dialogSeverity} variant="filled">
            {dialogMessage}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditarPelicula;
             