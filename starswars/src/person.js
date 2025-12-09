/**
 * Objeto que representa a Luke Skywalker.
 * @type {object}
 * @property {string} name - El nombre del personaje.
 * @property {string} height - La altura del personaje.
 * @property {string} mass - La masa del personaje.
 * @property {string} hair_color - El color de cabello del personaje.
 * @property {string} skin_color - El color de piel del personaje.
 * @property {string} eye_color - El color de ojos del personaje.
 * @property {string} birth_year - El año de nacimiento del personaje.
 * @property {string} gender - El género del personaje.
 * @property {string} homeworld - La URL del planeta natal del personaje.
 * @property {string[]} films - Las URLs de las películas en las que aparece el personaje.
 * @property {string[]} species - Las URLs de las especies a las que pertenece el personaje.
 * @property {string[]} vehicles - Las URLs de los vehículos que utiliza el personaje.
 * @property {string[]} starships - Las URLs de las naves espaciales que utiliza el personaje.
 * @property {string} created - La fecha de creación del registro del personaje.
 * @property {string} edited - La fecha de la última edición del registro del personaje.
 * @property {string} url - La URL del registro del personaje.
 */
export const luke = {
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  hair_color: "blond",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "19BBY",
  gender: "male",
  homeworld: "https://swapi.py4e.com/api/planets/1/",
  films: [
    "https://swapi.py4e.com/api/films/1/",
    "https://swapi.py4e.com/api/films/2/",
    "https://swapi.py4e.com/api/films/3/",
    "https://swapi.py4e.com/api/films/6/",
    "https://swapi.py4e.com/api/films/7/",
  ],
  species: ["https://swapi.py4e.com/api/species/1/"],
  vehicles: [
    "https://swapi.py4e.com/api/vehicles/14/",
    "https://swapi.py4e.com/api/vehicles/30/",
  ],
  starships: [
    "https://swapi.py4e.com/api/starships/12/",
    "https://swapi.py4e.com/api/starships/22/",
  ],
  created: "2014-12-09T13:50:51.644000Z",
  edited: "2014-12-20T21:17:56.891000Z",
  url: "https://swapi.py4e.com/api/people/1/",
};
