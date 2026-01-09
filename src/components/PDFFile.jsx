import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";

// --- CORES DO TEMA ---
const COR_DESTAQUE = "#ff8c00"; // Laranja da Marca
const COR_TEXTO = "#1a202c"; // Azul Escuro

const styles = StyleSheet.create({
  page: {
    paddingTop: 130,
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
  headerLeft: { width: "35%", justifyContent: "center" },
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
    fontSize: 11,
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
    height: 50,
    backgroundColor: COR_DESTAQUE,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  footerText: {
    color: "#ffffff",
    fontSize: 8,
    fontFamily: "Helvetica",
  },
  footerLink: {
    color: "#ffffff",
    textDecoration: "underline",
    fontFamily: "Helvetica-Bold",
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
  clausulaBox: { marginBottom: 12 },
  clausulaTitle: {
    fontSize: 11,
    fontFamily: "Times-Bold",
    marginBottom: 4,
    color: COR_TEXTO,
    textTransform: "uppercase",
  },
  clausulaBody: { textAlign: "justify", fontSize: 11, color: "#000" },

  // --- ASSINATURAS (ATUALIZADO PARA 3 PESSOAS) ---
  signaturesRow: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between", // Distribui o espaço
    breakInside: "avoid",
  },
  // Estilo normal para 2 assinaturas (45% cada)
  signatureBox2: { width: "45%", alignItems: "center" },
  // Estilo menor para 3 assinaturas (30% cada) para caber Fiador
  signatureBox3: { width: "30%", alignItems: "center" },

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
  // Segurança para evitar crash se 'assinantes' não existir
  const assinantes = contrato.assinantes || {};

  const nomeParte1 = assinantes.parte1 || "Primeira Parte";
  const nomeParte2 = assinantes.parte2 || "Segunda Parte";
  const nomeExtra = assinantes.extra || null; // ex: Fiador

  // Se tiver "extra", usamos o layout de 3 colunas, senão usamos o de 2
  const boxStyle = nomeExtra ? styles.signatureBox3 : styles.signatureBox2;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* CABEÇALHO */}
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

        {/* TÍTULO */}
        <Text style={styles.mainTitle}>{contrato.titulo}</Text>

        {/* CLÁUSULAS */}
        {contrato.clausulas.map((clausula, index) => (
          <View key={index} style={styles.clausulaBox}>
            <Text style={styles.clausulaTitle}>{clausula.titulo}</Text>
            <Text style={styles.clausulaBody}>{clausula.texto}</Text>
          </View>
        ))}

        {/* ASSINATURAS (CORRIGIDO PARA SUPORTAR FIADOR) */}
        <View style={styles.signaturesRow}>
          {/* Parte 1 (Ex: Senhorio) */}
          <View style={boxStyle}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>{nomeParte1}</Text>
            <Text style={styles.signatureLabel}>(Assinatura)</Text>
          </View>

          {/* Parte 2 (Ex: Inquilino) */}
          <View style={boxStyle}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>{nomeParte2}</Text>
            <Text style={styles.signatureLabel}>(Assinatura)</Text>
          </View>

          {/* Parte Extra (Ex: Fiador) - Só renderiza se existir */}
          {nomeExtra && (
            <View style={boxStyle}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>{nomeExtra}</Text>
              <Text style={styles.signatureLabel}>(Assinatura)</Text>
            </View>
          )}
        </View>

        {/* RODAPÉ PROFISSIONAL */}
        <View style={styles.footerBar} fixed>
          <View>
            <Text style={styles.footerText}>
              Gerado via{" "}
              <Link src="https://docfacil.pt" style={styles.footerLink}>
                DocFacil.pt
              </Link>
            </Text>
            <Text style={styles.footerText}>
              Em conformidade com a Legislação Portuguesa em vigor.
            </Text>
          </View>

          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `Pág. ${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
};

export default PDFFile;
