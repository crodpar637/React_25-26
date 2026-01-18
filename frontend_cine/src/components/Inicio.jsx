import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Inicio() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 100px)",
      }}
    >
      <Typography variant="h3" align="center">
        Bienvenido a la mejor web de cine
      </Typography>
    </Box>
  );
}
export default Inicio;