import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// --- CORES DO TEMA ---
const COR_DESTAQUE = "#ff8c00"; // Laranja
const COR_TEXTO = "#1a202c"; // Azul Escuro

const styles = StyleSheet.create({
  page: {
    paddingTop: 130, // Espaço generoso para o Header não tapar texto
    paddingBottom: 80,
    paddingHorizontal: 50,
    fontFamily: "Times-Roman",
    fontSize: 11,
    lineHeight: 1.5,
    color: "#000",
    backgroundColor: "#fff",
  },

  // --- CABEÇALHO FIXO ---
  headerBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: COR_DESTAQUE,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  // Áreas do Header (30% Logo | 70% Título)
  headerLeft: {
    width: "35%",
    justifyContent: "center",
  },
  headerRight: {
    width: "65%",
    alignItems: "flex-end",
    justifyContent: "center",
  },

  logoImage: { width: 100, height: 50, objectFit: "contain" },
  logoText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 11, // Um pouco menor para não quebrar linha em títulos longos
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    textAlign: "right",
  },

  // --- RODAPÉ FIXO ---
  footerBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: COR_DESTAQUE,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  footerText: {
    color: "#ffffff",
    fontSize: 9,
    fontFamily: "Helvetica",
    fontWeight: "bold",
  },

  // --- CONTEÚDO ---
  mainTitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Times-Bold",
    textTransform: "uppercase",
    color: COR_TEXTO,
    textDecoration: "underline",
  },
  clausulaBox: {
    marginBottom: 12,
  },
  clausulaTitle: {
    fontSize: 11,
    fontFamily: "Times-Bold",
    marginBottom: 4,
    color: COR_TEXTO,
    textTransform: "uppercase",
  },
  clausulaBody: {
    textAlign: "justify",
    fontSize: 11,
    color: "#000",
  },

  // --- ASSINATURAS ---
  signaturesRow: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    breakInside: "avoid",
  },
  signatureBox: { width: "45%", alignItems: "center" },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: "#000",
    width: "100%",
    marginBottom: 5,
  },
  signatureName: {
    fontSize: 10,
    fontFamily: "Times-Bold",
    textAlign: "center",
  },
  signatureLabel: { fontSize: 9, color: "#666", textAlign: "center" },
});

const PDFFile = ({ contrato, plano, logo }) => {
  const nomeParte1 = contrato.assinantes
    ? contrato.assinantes.parte1
    : "Primeira Parte";
  const nomeParte2 = contrato.assinantes
    ? contrato.assinantes.parte2
    : "Segunda Parte";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* === CABEÇALHO FIXO === */}
        <View style={styles.headerBar} fixed>
          <View style={styles.headerLeft}>
            {plano === "pro" && logo ? (
              <Image src={logo} style={styles.logoImage} />
            ) : (
              <Text style={styles.logoText}>DOCFACIL.PT</Text>
            )}
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerTitle}>{contrato.titulo}</Text>
          </View>
        </View>

        {/* === TÍTULO PRINCIPAL === */}
        <Text style={styles.mainTitle}>{contrato.titulo}</Text>

        {/* === CLÁUSULAS === */}
        {/* REMOVI 'wrap={false}' para o texto fluir naturalmente entre páginas */}
        {contrato.clausulas.map((clausula, index) => (
          <View key={index} style={styles.clausulaBox}>
            <Text style={styles.clausulaTitle}>{clausula.titulo}</Text>
            <Text style={styles.clausulaBody}>{clausula.texto}</Text>
          </View>
        ))}

        {/* === ASSINATURAS === */}
        <View style={styles.signaturesRow}>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>{nomeParte1}</Text>
            <Text style={styles.signatureLabel}>(Assinatura)</Text>
          </View>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>{nomeParte2}</Text>
            <Text style={styles.signatureLabel}>(Assinatura)</Text>
          </View>
        </View>

        {/* === RODAPÉ FIXO === */}
        <View style={styles.footerBar} fixed>
          <Text style={styles.footerText}>Processado por DocFacil.pt</Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
};

export default PDFFile;
