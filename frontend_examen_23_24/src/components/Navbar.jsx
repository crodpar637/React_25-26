import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <List>
        <Link to="/ejercicio2" style={{textDecoration : "none", color: "black"}}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Visor de notas" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/ejercicio3/1" style={{textDecoration : "none", color: "black"}}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Editor de notas" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </>
  );
}

export default Navbar;
