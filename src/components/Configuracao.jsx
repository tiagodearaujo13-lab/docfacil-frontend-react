function Configuracao() {
  return (
    <div>
      <h2>⚙️ Configurações da Conta</h2>
      <p>Aqui você poderá alterar sua senha e dados pessoais em breve.</p>

      {/* Um exemplo visual de formulário desativado */}
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          background: "#fff",
          borderRadius: "8px",
        }}
      >
        <label style={{ display: "block", marginBottom: "5px" }}>
          Nome de Utilizador
        </label>
        <input
          type="text"
          value="Tiago Araújo"
          disabled
          style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
        />

        <label style={{ display: "block", marginBottom: "5px" }}>Email</label>
        <input
          type="email"
          value="tiago@docfacil.pt"
          disabled
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
    </div>
  );
}

export default Configuracao;
