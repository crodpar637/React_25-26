import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 9,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  table: {
    display: "table",
    width: "100%",
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: "#bfbfbf",
    marginTop: 20,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    backgroundColor: "#f0f0f0",
    padding: 8,
    fontWeight: "bold",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 8,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 8,
  },
});

function ListadoPeliculasFiltroPDF({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.title}>
          <Text>Listado de Películas</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Título</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Lanzamiento</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Director</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Sinopsis</Text>
            </View>
          </View>

          {data.map((pelicula, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{pelicula.title}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{pelicula.release_date}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {pelicula.id_director_director.name || ""}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {pelicula.synopsis
                    ? pelicula.synopsis.substring(0, 60) + "..."
                    : ""}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default ListadoPeliculasFiltroPDF;
