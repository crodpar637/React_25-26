/**
 * @fileoverview Componente para crear un nuevo director
 * 
 * Formulario para registrar un nuevo director con validaciones.
 * Los campos requeridos son: nombre (mín 10 chars), fecha nacimiento, 
 * biografía (mín 50 chars) y URL de fotografía válida.
 * 
 * @module components/AltaDirector
 * @requires react
 * @requires @mui/material
 * @requires @mui/x-date-pickers
 * @requires dayjs
 * @requires ../api
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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
 * Componente para crear un nuevo director
 * 
 * Características:
 * - Formulario validado con reglas específicas
 * - DatePicker para seleccionar fecha de nacimiento
 * - Mostrador de errores de validación en cada campo
 * - Diálogo modal para confirmar éxito o error
 * - Navega a inicio tras creación exitosa
 * 
 * Validaciones:
 * - Nombre: mínimo 10 caracteres
 * - Biografía: mínimo 50 caracteres
 * - Foto URL: debe ser una URL válida
 * - Fecha: campo obligatorio (entre 1800 y hoy)
 * 
 * @component
 * @returns {JSX.Element} Formulario de alta de director
 */
function AltaDirector() {
  // Hook para navegación programática
  const navigate = useNavigate();
  
  // Estado del formulario
  const [director, setDirector] = useState({
    name: "",
    birth_date: "",
    biography: "",
    photo_url: "",
  });
  
  // Estado de validación de campos
  const [isCamposValidos, setIsCamposValidos] = useState({
    name: true,
    birth_date: true,
    biography: true,
    photo_url: true,
  });
  
  // Estado para controlar si se está enviando el formulario
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Estado del diálogo de resultado
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSeverity, setDialogSeverity] = useState("success");

  /**
   * Efecto para crear el director cuando isUpdating cambia a true
   */
  useEffect(() => {
    async function fetchCreateDirector() {
      try {
        // Enviar datos del director al servidor
        const respuesta = await api.post("/directors/", director);
        
        // Mostrar mensaje de éxito
        setDialogMessage(respuesta.mensaje);
        setDialogSeverity("success");
        setOpenDialog(true);
      } catch (error) {
        // Mostrar mensaje de error
        setDialogMessage(error.mensaje || "Error al crear el director");
        setDialogSeverity("error");
        setOpenDialog(true);
      }
      // Indicar que la operación ha terminado
      setIsUpdating(false);
    }

    if (isUpdating) fetchCreateDirector();
  }, [isUpdating]);

  /**
   * Maneja los cambios en los campos del formulario
   * @param {React.ChangeEvent} e - Evento del cambio
   */
  function handleChange(e) {
    setDirector({ ...director, [e.target.name]: e.target.value });
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

    // Si fue éxito, navegar a la página de inicio
    if (dialogSeverity === "success") navigate("/");
  }

  /**
   * Valida los datos del formulario
   * @returns {boolean} true si todos los datos son válidos, false en caso contrario
   */
  function validarDatos() {
    let valido = true;
    let objetoValidacion = {
      name: true,
      birth_date: true,
      biography: true,
      photo_url: true,
    };

    // Validación del nombre: mínimo 10 caracteres
    if (director.name.length < 10) {
      valido = false;
      objetoValidacion.name = false;
    }

    // Validación de la biografía: mínimo 50 caracteres
    if (director.biography.length < 50) {
      valido = false;
      objetoValidacion.biography = false;
    }

    // Validación de la URL de la fotografía
    if (!isValidURL(director.photo_url)) {
      valido = false;
      objetoValidacion.photo_url = false;
    }

    // Validación de la fecha: campo obligatorio
    if (!director.birth_date) {
      valido = false;
      objetoValidacion.birth_date = false;
    }
    
    // Actualizar estado de validación
    setIsCamposValidos(objetoValidacion);

    return valido;
  }

  /**
   * Valida si una cadena es una URL válida usando expresión regular
   * @param {string} urlString - URL a validar
   * @returns {boolean} true si es una URL válida, false en caso contrario
   */
  const isValidURL = (urlString) => {
    var patronURL = new RegExp(
      // valida protocolo (http o https)
      "^(https?:\\/\\/)?" +
        // valida nombre de dominio
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        // valida OR dirección ip (v4)
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        // valida puerto y path
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        // valida queries
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        // valida fragment locator
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!patronURL.test(urlString);
  };

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
              Alta de director
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
              {/* Campo de nombre */}
              <Grid item size={{ xs: 10 }}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  name="name"
                  type="text"
                  maxLength="100"
                  value={director.name}
                  onChange={handleChange}
                  error={!isCamposValidos.name}
                  helperText={
                    !isCamposValidos.name && "Nombre debe tener al menos 10 caracteres."
                  }
                />
              </Grid>
              
              {/* Campo de fecha de nacimiento */}
              <Grid item size={{ xs: 10 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="es"
                >
                  <DatePicker
                    label="Fecha de nacimiento"
                    name="birth_date"
                    minDate={dayjs("1800-01-01")}
                    maxDate={dayjs()}
                    slotProps={{
                      textField: {
                        required: true,
                        error: !isCamposValidos.birth_date,
                        helperText: !isCamposValidos.birth_date
                          ? "La fecha es obligatoria"
                          : "",
                      },
                    }}
                    value={
                      director.birth_date ? dayjs(director.birth_date) : null
                    }
                    onChange={(newValue) =>
                      setDirector({
                        ...director,
                        birth_date: newValue.format("YYYY-MM-DD"),
                      })
                    }
                  />
                </LocalizationProvider>
              </Grid>
              
              {/* Campo de biografía */}
              <Grid item size={{ xs: 10 }}>
                <TextField
                  required
                  fullWidth
                  id="biography"
                  label="Biografía"
                  name="biography"
                  type="text"
                  multiline
                  maxRows={4}
                  minRows={2}
                  maxLength="500"
                  value={director.biography}
                  onChange={handleChange}
                  error={!isCamposValidos.biography}
                  helperText={
                    !isCamposValidos.biography &&
                    "Biografía debe tener al menos 50 caracteres."
                  }
                />
              </Grid>
              
              {/* Campo de URL de fotografía */}
              <Grid item size={{ xs: 10 }}>
                <TextField
                  required
                  fullWidth
                  id="photo_url"
                  label="URL de la fotografía"
                  name="photo_url"
                  type="text"
                  maxLength="255"
                  value={director.photo_url}
                  onChange={handleChange}
                  error={!isCamposValidos.photo_url}
                  helperText={
                    !isCamposValidos.photo_url &&
                    "Ingrese una URL válida de la fotografía."
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

export default AltaDirector;
             