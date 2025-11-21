import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// 1. ESTILO "NORMAL" (Para contratos curtos - Preenche bem a folha)
const estiloNormal = StyleSheet.create({
  page: {
    paddingTop: 50,
    paddingBottom: 80,
    paddingHorizontal: 50,
    fontFamily: "Helvetica",
    fontSize: 12, // Letra grande
    lineHeight: 1.5,
  },
  headerLogo: {
    position: "absolute",
    top: 30,
    right: 50,
    width: 60,
    height: 60,
    objectFit: "contain",
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    marginTop: 10,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  clausulaContainer: { marginBottom: 15 },
  clausulaTitulo: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Helvetica-Bold",
  },
  clausulaTexto: { textAlign: "justify", fontSize: 12 },
  assinaturas: {
    marginTop: 60, // Bastante espaço
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linhaAssinatura: {
    borderTopWidth: 1,
    borderTopColor: "#000",
    width: "40%",
    textAlign: "center",
    paddingTop: 5,
    fontSize: 10,
  },
  logoMarca: {
    position: "absolute",
    bottom: 30,
    right: 50,
    fontSize: 10,
    color: "#ff8c00",
    opacity: 0.6,
  },
});

// 2. ESTILO "COMPACTO" (Para contratos longos)
const estiloCompacto = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: "Helvetica",
    fontSize: 10, // Letra menor
    lineHeight: 1.5,
  },
  headerLogo: {
    position: "absolute",
    top: 20,
    right: 35,
    width: 50,
    height: 50,
    objectFit: "contain",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 15,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  clausulaContainer: { marginBottom: 10 },
  clausulaTitulo: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 3,
    fontFamily: "Helvetica-Bold",
  },
  clausulaTexto: { textAlign: "justify", fontSize: 10 },
  assinaturas: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linhaAssinatura: {
    borderTopWidth: 1,
    borderTopColor: "#000",
    width: "40%",
    textAlign: "center",
    paddingTop: 5,
    fontSize: 9,
  },
  logoMarca: {
    position: "absolute",
    bottom: 30,
    right: 35,
    fontSize: 9,
    color: "#ff8c00",
    opacity: 0.6,
  },
});

const PDFFile = ({ contrato, plano, logo }) => {
  // LÓGICA INTELIGENTE: Se tiver muitas cláusulas, usa o modo compacto
  const usarModoCompacto = contrato.clausulas.length > 6;
  const styles = usarModoCompacto ? estiloCompacto : estiloNormal;

  // Proteção para nomes das assinaturas
  const nomeParte1 = contrato.assinantes
    ? contrato.assinantes.parte1
    : "Primeira Parte";
  const nomeParte2 = contrato.assinantes
    ? contrato.assinantes.parte2
    : "Segunda Parte";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo do Usuário (Se for PRO) */}
        {plano === "pro" && logo && (
          <Image style={styles.headerLogo} src={logo} />
        )}

        <Text style={styles.title}>{contrato.titulo}</Text>

        {contrato.clausulas.map((clausula, index) => (
          <View key={index} style={styles.clausulaContainer} wrap={false}>
            <Text style={styles.clausulaTitulo}>{clausula.titulo}</Text>
            <Text style={styles.clausulaTexto}>{clausula.texto}</Text>
          </View>
        ))}

        <View style={styles.assinaturas} wrap={false}>
          <View style={styles.linhaAssinatura}>
            <Text>{nomeParte1}</Text>
          </View>
          <View style={styles.linhaAssinatura}>
            <Text>{nomeParte2}</Text>
          </View>
        </View>

        {/* Marca d'água (Se for FREE) */}
        {plano !== "pro" && (
          <Text style={styles.logoMarca}>Documento criado em DocFacil.pt</Text>
        )}
      </Page>
    </Document>
  );
};

export default PDFFile;
