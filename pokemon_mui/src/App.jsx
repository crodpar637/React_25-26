import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Pokecard from "./Pokecard";

function App() {
  const [pokemonId, setPokemonId] = useState("");
  const [datos, setDatos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        let response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );

        if (response.ok) {
          let datosPokemon = await response.json();

          // Actualizamos los datos de Pokemon
          setDatos(datosPokemon);

          // Y no tenemos errores
          setError(null);
        } else if (response.status == 404) {
          setError("El pokemon que buscas no existe");
          setDatos(null);
        } else {
          setError("Respuesta errónea del servidor.");
          setDatos(null);
        }
      } catch (e) {
        setError("No se pudo conectar al servidor: " + e.toString() );
        setDatos(null);
      }
      setIsLoading(false);
    }

    if (isLoading) fetchPokemon();
  }, [isLoading]);

  return (
    <>
      <Grid container>
        <Grid
          size={{ xs: 12, md: 6, lg: 4 }}
          offset={{ xs: 0, md: 3, lg: 4 }}
          sx={{ mt: 2 }}
        >
          <Stack
            direction="column"
            spacing={2}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Pokemon Info</Typography>

            <TextField
              fullWidth
              variant="outlined"
              label="Pokemon id/name"
              name="pokemonId"
              value={pokemonId}
              onChange={(e) => setPokemonId(e.target.value)}
            ></TextField>

            <Button
              fullWidth
              variant="contained"
              onClick={() => setIsLoading(true)}
            >
              Buscar Pokemon
            </Button>

            {datos != null ? (
              <Pokecard datos={datos} />
            ) : (
              <>
                {error == null ? (
                  <Typography variant="h6">Busca tu pokemon</Typography>
                ) : (
                  <Typography variant="h6">{error}</Typography>
                )}
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
