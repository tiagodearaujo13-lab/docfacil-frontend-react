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
    paddingHorizontal: 50, // Margens largas
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
    fontSize: 16, // Título grande
    textAlign: "center",
    marginBottom: 30,
    marginTop: 10,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  clausulaContainer: { marginBottom: 15 }, // Espaço arejado
  clausulaTitulo: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Helvetica-Bold",
  },
  clausulaTexto: { textAlign: "justify", fontSize: 12 },
  assinaturas: {
    marginTop: 60, // Bastante espaço antes de assinar
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

// 2. ESTILO "COMPACTO" (Para contratos longos - Cabe tudo em 1 página)
const estiloCompacto = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35, // Margens apertadas
    fontFamily: "Helvetica",
    fontSize: 10, // Letra menor
    lineHeight: 1.5,
  },
  headerLogo: {
    position: "absolute",
    top: 20,
    right: 35,
    width: 50, // Logo um pouco menor
    height: 50,
    objectFit: "contain",
  },
  title: {
    fontSize: 14, // Título menor
    textAlign: "center",
    marginBottom: 20,
    marginTop: 15,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  clausulaContainer: { marginBottom: 10 }, // Espaço apertado
  clausulaTitulo: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 3,
    fontFamily: "Helvetica-Bold",
  },
  clausulaTexto: { textAlign: "justify", fontSize: 10 },
  assinaturas: {
    marginTop: 30, // Pouco espaço antes de assinar
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
  // LÓGICA INTELIGENTE:
  // Um contrato base tem 6 itens (Partes, Objeto, Preço, Vigência, Foro, Assinaturas).
  // Se tiver mais de 6, significa que tem cláusulas extras, então usamos o modo COMPACTO.
  const usarModoCompacto = contrato.clausulas.length > 6;

  // Escolhe o estilo certo
  const styles = usarModoCompacto ? estiloCompacto : estiloNormal;

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
            <Text>O Prestador</Text>
          </View>
          <View style={styles.linhaAssinatura}>
            <Text>O Cliente</Text>
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
