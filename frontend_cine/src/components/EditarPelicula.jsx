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

function EditarPelicula() {
  const navigate = useNavigate();
  const [pelicula, setPelicula] = useState({
    title: "",
    synopsis: "",
    release_date: "",
    id_director: "",
  });
  const [directores, setDirectores] = useState([]);
  const [isCamposValidos, setIsCamposValidos] = useState({
    title: true,
    synopsis: true,
    release_date: true,
    id_director: true,
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSeverity, setDialogSeverity] = useState("success");
  const { id_movie } = useParams();

  // Cargar directores
  useEffect(() => {
    async function fetchDirectores() {
      try {
        const respuesta = await api.get("/directors/");
        setDirectores(respuesta.datos);
      } catch (error) {
        setDialogMessage(
          error.mensaje || "Error al recuperar los directores"
        );
        setDialogSeverity("error");
        setOpenDialog(true);
      }
    }

    fetchDirectores();
  }, []);

  useEffect(() => {
    async function fetchUpdatePelicula() {
      try {
        await api.put(`/movies/${id_movie}`, pelicula);

        setDialogMessage("Actualización correcta de la película");
        setDialogSeverity("success");
        setOpenDialog(true);
      } catch (error) {
        setDialogMessage(
          error.mensaje || "Error al actualizar la película"
        );
        setDialogSeverity("error");
        setOpenDialog(true);
      }
      setIsUpdating(false);
    }

    if (isUpdating) fetchUpdatePelicula();
  }, [isUpdating]);

  useEffect(() => {
    async function fetchPelicula() {
      try {
        const respuesta = await api.get(`/movies/${id_movie}`);

        setPelicula(respuesta.datos);
      } catch (error) {
        setDialogMessage(
          error.mensaje || "Error al recuperar los datos de la película"
        );
        setDialogSeverity("error");
        setOpenDialog(true);
      }
    }

    fetchPelicula();
  }, [id_movie]);

  function handleChange(e) {
    setPelicula({ ...pelicula, [e.target.name]: e.target.value });
  }

  function handleClick() {
    if (isUpdating) return;

    if (validarDatos()) {
      setIsUpdating(true);
    }
  }

  function handleDialogClose() {
    setOpenDialog(false);

    if (dialogSeverity === "success") navigate("/movies");
  }

  function validarDatos() {
    let valido = true;
    let objetoValidacion = {
      title: true,
      synopsis: true,
      release_date: true,
      id_director: true,
    };

    // Validación del título
    if (pelicula.title.length < 3) {
      valido = false;
      objetoValidacion.title = false;
    }

    // Validación de la sinopsis
    if (pelicula.synopsis.length < 20) {
      valido = false;
      objetoValidacion.synopsis = false;
    }

    // Validación de la fecha como requerida
    if (!pelicula.release_date) {
      valido = false;
      objetoValidacion.release_date = false;
    }

    // Validación del director
    if (!pelicula.id_director) {
      valido = false;
      objetoValidacion.id_director = false;
    }

    setIsCamposValidos(objetoValidacion);

    return valido;
  }

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item size={{ xs: 12, sm: 9, md: 7 }}>
          <Paper elevation={6} sx={{ mt: 3, p: 3, maxWidth: 900, mx: "auto" }}>
            <Typography variant="h4" align="center" sx={{ mb: 3 }}>
              Editar película
            </Typography>

            <Grid
              container
              spacing={2}
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
                    "Compruebe el formato del título."
                  }
                />
              </Grid>

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
                    "Compruebe el formato de la sinopsis."
                  }
                />
              </Grid>

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
