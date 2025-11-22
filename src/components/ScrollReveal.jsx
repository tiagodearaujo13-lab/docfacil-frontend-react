import { useEffect, useRef, useState } from "react";

function ScrollReveal({ children, direction = "up", delay = "0s" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Só ativa quando o elemento entra na tela
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // Anima uma vez e para
        }
      },
      {
        threshold: 0.1, // Dispara logo que 10% do elemento seja visível
        rootMargin: "0px 0px -50px 0px", // Margem de segurança inferior
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // --- Lógica de Direção ---
  const getInitialTransform = () => {
    if (direction === "left") return "translateX(-60px)";
    if (direction === "right") return "translateX(60px)";
    return "translateY(60px)"; // Padrão (baixo para cima)
  };

  const style = {
    // Se visível, opacidade 1 e posição original. Se não, opacidade 0 e deslocado.
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translate(0, 0)" : getInitialTransform(),

    // A transição suave
    transition: `opacity 0.8s cubic-bezier(0.5, 0, 0, 1) ${delay}, transform 0.8s cubic-bezier(0.5, 0, 0, 1) ${delay}`,

    // Performance
    willChange: "opacity, transform",
  };

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
}

export default ScrollReveal;
