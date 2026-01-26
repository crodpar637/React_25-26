


function EditorNotas(){
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
                  id="photo_url"
                  label="URL de la fotografía"
                  name="photo_url"
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
</>)
}

export default EditorNotas;