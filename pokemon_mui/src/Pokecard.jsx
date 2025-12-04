import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function Pokecard({datos}) {

  return (
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
  );
}

export default Pokecard;
