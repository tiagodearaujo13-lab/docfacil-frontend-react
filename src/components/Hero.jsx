import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import styles from "./Hero.module.css";

import ImgSlide1 from "../assets/hero-background.webp";
import ImgSlide2 from "../assets/hero-background2.webp";
import ImgSlide3 from "../assets/hero-background3.webp";

function Hero() {
  // Dados dos Slides (Para facilitar a manutenção)
  const slidesData = [
    {
      id: 1,
      image: ImgSlide1,
      tituloPrincipal: "Documentos Jurídicos",
      tituloDestaque: "Blindados e Rápidos.",
      subtitulo:
        "Esqueça o Word e a insegurança jurídica. Crie contratos em conformidade com a lei portuguesa, em menos de 2 minutos.",
    },
    {
      id: 2,
      image: ImgSlide2,
      tituloPrincipal: "Gestão Empresarial",
      tituloDestaque: "Sem Burocracia.",
      subtitulo:
        "Concentre-se em fazer crescer o seu negócio. Nós tratamos da papelada complexa com modelos aprovados por advogados.",
    },
    {
      id: 3,
      image: ImgSlide3,
      tituloPrincipal: "Acesse de Qualquer Lugar",
      tituloDestaque: "Segurança Total.",
      subtitulo:
        "Os seus documentos estão sempre disponíveis na nuvem, protegidos com a máxima segurança e prontos para assinar.",
    },
  ];

  return (
    <div className={styles.heroWrapper}>
      {/* --- CAMADA 1: O CAROUSEL (Fundo e Texto que muda) --- */}
      <Swiper
        modules={[Autoplay, Navigation, EffectFade]}
        effect={"fade"} // Transição suave de "desvanecer" em vez de deslizar
        speed={1000} // Duração da transição (1 segundo)
        autoplay={{
          delay: 5000, // Espera 5 segundos em cada slide
          disableOnInteraction: false, // Continua a rodar mesmo se o user clicar
        }}
        navigation={true} // Ativa as setas laterais
        loop={true} // Carousel infinito
        className={styles.swiperContainer}
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* A imagem de fundo é aplicada aqui via style inline para ser dinâmica */}
            <div
              className={styles.slideBackground}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${slide.image})`,
              }}
            >
              <div className={styles.slideContent}>
                <h1 className={styles.titulo}>
                  {slide.tituloPrincipal} <br />
                  <span className={styles.destaque}>
                    {slide.tituloDestaque}
                  </span>
                </h1>
                <p className={styles.subtitulo}>{slide.subtitulo}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* --- CAMADA 2: CONTEÚDO FIXO (Botões que ficam por cima) --- */}
      <div className={styles.fixedOverlay}>
        <div className={styles.ctaGroup}>
          <Link to="/registo" className={styles.botaoPrimary}>
            Começar Grátis
          </Link>

          <a href="#como-funciona" className={styles.botaoSecondary}>
            Ver como funciona
          </a>
        </div>

        <p className={styles.trustText}>
          🔒 Mais de 500 documentos gerados este mês.
        </p>
      </div>
    </div>
  );
}

export default Hero;
