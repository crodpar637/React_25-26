/**
 * @fileoverview Componente de barra de navegación principal de la aplicación
 * 
 * Componente que proporciona navegación responsiva a todas las secciones de la aplicación.
 * Utiliza Material-UI AppBar y menús desplegables para mostrar opciones de directores y películas.
 * Se adapta a diferentes tamaños de pantalla (xs, md).
 * 
 * @module components/Navbar
 * @requires react
 * @requires @mui/material
 * @requires react-router
 */

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MovieTwoToneIcon from "@mui/icons-material/MovieTwoTone";
import { Link } from "react-router";
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";
import styles from "../css/Impresion.module.css";

/**
 * Componente de barra de navegación
 * 
 * Características:
 * - Menú hamburguesa para resoluciones xs
 * - Menús desplegables para directores y películas en resolución md
 * - Logo "MOVIES DB" en la esquina superior izquierda
 * - Navegación a todas las principales secciones de la aplicación
 * - Estilos responsivos para diferentes tamaños de pantalla
 * 
 * Estado interno:
 * - anclaMenuDirectores: Control del menú de directores
 * - anclaMenuPeliculas: Control del menú de películas
 * - anclaMenuXS: Control del menú hamburguesa para móviles
 * 
 * @component
 * @returns {JSX.Element} Barra de navegación con menús
 */
function Navbar() {
  // Estados para controlar la apertura/cierre de menús
  const [anclaMenuDirectores, setAnclaMenuDirectores] = React.useState(null);
  const [anclaMenuPeliculas, setAnclaMenuPeliculas] = React.useState(null);
  const [anclaMenuXS, setAnclaMenuXS] = React.useState(null);

  /**
   * Maneja la apertura del menú de directores
   * @param {React.MouseEvent} event - Evento del click
   */
  const handleClickMenuDirectores = (event) => {
    setAnclaMenuDirectores(event.currentTarget);
  };

  /**
   * Maneja la apertura del menú de películas
   * @param {React.MouseEvent} event - Evento del click
   */
  const handleClickMenuPeliculas = (event) => {
    setAnclaMenuPeliculas(event.currentTarget);
  };

  /**
   * Maneja la apertura del menú de móvil (xs)
   * @param {React.MouseEvent} event - Evento del click
   */
  const handleClickMenuXS = (event) => {
    setAnclaMenuXS(event.currentTarget);
  };

  /**
   * Cierra todos los menús abiertos
   */
  const handleCloseNavMenu = () => {
    setAnclaMenuDirectores(null);
    setAnclaMenuPeliculas(null);
    setAnclaMenuXS(null);
  };

  // Estilos para los links dentro de los menús
  const linkStyle = { color: "black", textDecoration: "none" };

  return (
    <AppBar position="static" className={styles.noprint}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Menú hamburguesa para resolución xs (móviles) */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu movies db resolucion xs"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClickMenuXS}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            
            {/* Menú desplegable para xs */}
            <Menu
              id="menu-appbar-xs"
              anchorEl={anclaMenuXS}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anclaMenuXS)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {/* Sección de Directores */}
              <ListSubheader>Menú Directores</ListSubheader>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/directors/new" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Alta de directores
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/directors" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado de directores
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/directors/cards" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado de tarjetas de directores
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/directors/filter" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Directores con filtros
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/directors/graph" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Gráficas de directores
                  </Typography>
                </Link>
              </MenuItem>
              
              {/* Divisor entre secciones */}
              <Divider />
              
              {/* Sección de Películas */}
              <ListSubheader>Menú Películas</ListSubheader>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/movies/new" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Alta de peliculas
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/movies" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado de peliculas
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/movies/filter" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Películas con filtros
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          {/* Logo y nombre de la aplicación */}
          <MovieTwoToneIcon />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mx: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MOVIES DB
          </Typography>

          {/* Menú principal para resolución md y superior */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* Botón de Directores con menú desplegable */}
            <Button
              onClick={handleClickMenuDirectores}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Directores
            </Button>
            <Menu
              id="menu-directores"
              anchorEl={anclaMenuDirectores}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anclaMenuDirectores)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/directors/new" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Alta de directores
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/directors" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado de directores
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/directors/cards" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado de tarjetas de directores
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/directors/filter" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Directores con filtros
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/directors/graph" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Gráficas de directores
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
            
            {/* Botón de Películas con menú desplegable */}
            <Button
              onClick={handleClickMenuPeliculas}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Peliculas
            </Button>
            <Menu
              id="menu-peliculas"
              anchorEl={anclaMenuPeliculas}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anclaMenuPeliculas)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/movies/new" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Alta de peliculas
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/movies" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado de peliculas
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/movies/filter" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Películas con filtros
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
           
