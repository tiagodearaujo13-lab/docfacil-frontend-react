import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast.jsx";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    visivel: false,
    mensagem: "",
    tipo: "sucesso", // 'sucesso' ou 'erro'
  });

  const showToast = (mensagem, tipo = "sucesso") => {
    setToast({ visivel: true, mensagem, tipo });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visivel: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* O Toast fica sempre à espreita aqui, pronto a aparecer */}
      {toast.visivel && (
        <Toast
          mensagem={toast.mensagem}
          tipo={toast.tipo}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
}

// O nosso "Gancho" personalizado para usar fácil
export function useToast() {
  return useContext(ToastContext);
}
