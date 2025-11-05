import Header from './components/Header.jsx'; 

function ConteudoPrincipal() {
  return (
    <main>
      <h2>Bem-vindo á sua biblioteca de documentos!</h2>
      <p>Aqui vamos mostrar os seus contratos, propostas, etc.</p>
    </main>
  );
}

function App() {
  return (
    <div>
      {/* 3. "ENCAIXAR" AS PEÇAS */}
      
      {/* CORREÇÃO 2: O nome da tag é 'Header', igual ao 'import' */}
      <Header />
      
      {/* CORREÇÃO 3: O nome da tag é 'ConteudoPrincipal', igual à 'function' */}
      <ConteudoPrincipal />

    </div>
  );
}

export default App;