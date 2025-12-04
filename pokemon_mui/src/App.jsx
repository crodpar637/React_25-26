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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

function App() {
  const [pokemonId, setPokemonId] = useState("");
  const [datos, setDatos] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

useEffect(() => {
    async function fetchPokemon() {
      try {
        let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );

        let datosPokemon = await response.json();

        // Actualizamos los datos de Pokemon
        setDatos(datosPokemon);

        // Y no tenemos errores
        setError(null);
      } catch (e) {
        setError("No se pudo conectar al servidor");
      }
       setIsLoading(false);
    }

    if (isLoading) 
      fetchPokemon();
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

            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={datos.sprites.front_default}
                title={datos.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {datos.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Peso: {datos.weight}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Altura: {datos.height}
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
