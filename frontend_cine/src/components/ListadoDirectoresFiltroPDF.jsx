import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
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
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    backgroundColor: "#f0f0f0",
    padding: 8,
    fontWeight: "bold",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 8,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 9,
  },
});

function ListadoDirectoresFiltroPDF({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.title}>
          <Text>Listado de Directores</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Nombre</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Fecha de Nacimiento</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Biografía</Text>
            </View>
            {/* <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Foto</Text>
            </View> */}
          </View>

          {data.map((director, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{director.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{director.birth_date}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {director.biography
                    ? director.biography
                    : ""}
                </Text>
              </View>
              {/* <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {director.photo_url ? "✓" : ""}
                </Text>
              </View> */}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default ListadoDirectoresFiltroPDF;
