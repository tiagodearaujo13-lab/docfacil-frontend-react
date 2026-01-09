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
    position: "relative",
  },

  // --- MARCA D'ÁGUA ---
  watermarkContainer: {
    position: "absolute",
    top: 300,
    left: 100,
    right: 0,
    bottom: 0,
    opacity: 0.15,
    transform: "rotate(-45deg)",
    zIndex: -1,
  },
  watermarkText: {
    fontSize: 60,
    fontFamily: "Helvetica-Bold",
    color: "#ff0000",
    textAlign: "center",
  },

  // --- CABEÇALHO (Base) ---
  headerBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 90,
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

  // Estilos de Texto do Header
  logoText: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  headerTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    textAlign: "right",
  },

  // --- RODAPÉ (Base) ---
  footerBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  footerText: {
    fontSize: 8,
    fontFamily: "Helvetica",
  },
  footerLink: {
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

  // --- ASSINATURAS ---
  signaturesRow: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    breakInside: "avoid",
  },
  signatureBox2: { width: "45%", alignItems: "center" },
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
  const assinantes = contrato.assinantes || {};
  const nomeParte1 = assinantes.parte1 || "Primeira Parte";
  const nomeParte2 = assinantes.parte2 || "Segunda Parte";
  const nomeExtra = assinantes.extra || null;
  const boxStyle = nomeExtra ? styles.signatureBox3 : styles.signatureBox2;

  // --- LÓGICA VISUAL INTELIGENTE ---
  const isFree = plano === "free" || !plano;
  const isPaid = !isFree;

  // Se for pago: Fundo Branco e Texto Preto (Aspeto Jurídico Limpo)
  // Se for Grátis: Fundo Laranja e Texto Branco (Branding DocFacil)
  const headerStyle = [
    styles.headerBar,
    { backgroundColor: isPaid ? "#ffffff" : COR_DESTAQUE },
    isPaid ? { borderBottom: "1px solid #000" } : {}, // Linha fina preta nos pagos
  ];

  const footerStyle = [
    styles.footerBar,
    { backgroundColor: isPaid ? "#ffffff" : COR_DESTAQUE },
    isPaid ? { borderTop: "1px solid #000" } : {}, // Linha fina preta nos pagos
  ];

  const textHeaderColor = isPaid ? "#000000" : "#ffffff";
  const textFooterColor = isPaid ? "#000000" : "#ffffff";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* MARCA D'ÁGUA (SÓ NO FREE) */}
        {isFree && (
          <View style={styles.watermarkContainer} fixed>
            <Text style={styles.watermarkText}>VERSÃO GRÁTIS</Text>
            <Text style={styles.watermarkText}>SEM VALIDADE</Text>
            <Text style={styles.watermarkText}>DOCFACIL.PT</Text>
          </View>
        )}

        {/* CABEÇALHO INTELIGENTE */}
        <View style={headerStyle} fixed>
          <View style={styles.headerLeft}>
            {/* Se for PRO e tiver logo, mostra o logo do cliente */}
            {plano === "pro" && logo ? (
              <Image src={logo} style={styles.logoImage} />
            ) : (
              // Se não, mostra texto DocFacil (Branco no Free, Preto no Pago)
              <Text style={[styles.logoText, { color: textHeaderColor }]}>
                DOCFACIL.PT
              </Text>
            )}
          </View>
          <View style={styles.headerRight}>
            <Text style={[styles.headerTitle, { color: textHeaderColor }]}>
              {contrato.titulo}
            </Text>
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

        {/* ASSINATURAS */}
        <View style={styles.signaturesRow}>
          <View style={boxStyle}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>{nomeParte1}</Text>
            <Text style={styles.signatureLabel}>(Assinatura)</Text>
          </View>

          <View style={boxStyle}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>{nomeParte2}</Text>
            <Text style={styles.signatureLabel}>(Assinatura)</Text>
          </View>

          {nomeExtra && (
            <View style={boxStyle}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>{nomeExtra}</Text>
              <Text style={styles.signatureLabel}>(Assinatura)</Text>
            </View>
          )}
        </View>

        {/* RODAPÉ INTELIGENTE */}
        <View style={footerStyle} fixed>
          <View>
            <Text style={[styles.footerText, { color: textFooterColor }]}>
              Gerado via{" "}
              <Link
                src="https://docfacil.pt"
                style={[styles.footerLink, { color: textFooterColor }]}
              >
                DocFacil.pt
              </Link>
            </Text>
            <Text style={[styles.footerText, { color: textFooterColor }]}>
              Em conformidade com a Legislação Portuguesa em vigor.
            </Text>
          </View>

          <Text
            style={[styles.footerText, { color: textFooterColor }]}
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
