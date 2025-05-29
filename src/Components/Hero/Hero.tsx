import HeroBg from "@/assets/Hero.png";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div data-aos="fade-up">
      <div
        className="relative h-[500px] bg-cover bg-center flex  items-center"
        style={{ backgroundImage: `url(${HeroBg})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-50 z-10" />

        <div data-aos="fade-down-right">
          <div className="relative z-20 text-blue-950 px-4">
            <h1 className="text-5xl font-bold leading-tight max-w-[500px]">
              {t("hero_title")}
            </h1>
            <p className="font-normal text-[16px] mt-7 leading-[24px] max-w-[670px]">
              {t("hero_desc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
