import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import Steps from "../components/Steps.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Pricing from "../components/Pricing.jsx";
import FAQ from "../components/FAQ.jsx";
import FeedbackForm from "../components/FeedbackForm.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";

function LandingPage() {
  return (
    <>
      <Hero />

      {/* Features não tem animação interna, então mantemos o wrapper aqui */}
      <div id="funcionalidades">
        <ScrollReveal>
          <Features />
        </ScrollReveal>
      </div>

      {/* REMOVIDO ScrollReveal aqui porque o Steps.jsx já tem os seus próprios delays internos */}
      <div id="como-funciona">
        <Steps />
      </div>

      <div id="testemunhos">
        <ScrollReveal>
          <Testimonials />
        </ScrollReveal>
      </div>

      {/* REMOVIDO ScrollReveal aqui porque o Pricing.jsx já tem as animações Esquerda/Direita */}
      <div id="precos">
        <Pricing />
      </div>

      <div id="faq">
        <ScrollReveal>
          <FAQ />
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <FeedbackForm />
      </ScrollReveal>
    </>
  );
}

export default LandingPage;
