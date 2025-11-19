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

      <div id="funcionalidades">
        <ScrollReveal>
          <Features />
        </ScrollReveal>
      </div>

      <div id="como-funciona">
        <ScrollReveal>
          <Steps />
        </ScrollReveal>
      </div>

      <div id="testemunhos">
        <ScrollReveal>
          <Testimonials />
        </ScrollReveal>
      </div>

      <div id="precos">
        <ScrollReveal>
          <Pricing />
        </ScrollReveal>
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
