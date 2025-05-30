import HeroBg from "@/assets/Hero.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div
        className="relative h-[500px] bg-cover bg-center flex  items-center"
        style={{ backgroundImage: `url(${HeroBg})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-50 z-10" />

        <div className="relative z-20 text-blue-950 px-4 w-full">
          <div className="flex items-center justify-between w-full px-10">
            <div className="left max-w-[60%]">
              <h1 className="text-[20px] font-[400]">{t("resources-title")}</h1>
              <p className="text-[20px] font-[400] mt-3">
                {t("resources-materials")}
              </p>
              <p className="text-[48px] font-[700]">
                {t("learning-resources")}
              </p>
            </div>

            <div className="right">
              <div className="flex items-center gap-2">
                <Link to={"/"}>
                  <p className="text-white cursor-pointer hover:underline text-[20px] font-[400]">
                    {t("home")}
                  </p>
                </Link>
                <span className="text-[20px] cursor-pointer hover:underline text-white">
                  |
                </span>
                <p className="text-[20px] font-[400]">{t("resources")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
