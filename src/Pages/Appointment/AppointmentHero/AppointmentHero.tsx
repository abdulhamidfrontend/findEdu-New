import AboutHeroImg from "@/assets/AboutHeroImg.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AppointmentHero = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div
        className="relative h-[500px]  bg-cover bg-center flex  items-center"
        style={{ backgroundImage: `url(${AboutHeroImg})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-60 z-10" />

        <div className="relative px-15 z-20 w-full text-blue-950 ">
          <div className="flex items-center justify-between w-full">
            <div className="left">
              <h1 className="text-[18px] font-normal leading-[28px]">
                Ta'lim markaziga tashriflaringizni boshqaring
              </h1>
              <p className="font-bold text-[50px]  leading-[60px] ">
                Sizning navbatlaringiz
              </p>
            </div>
            <div className="right">
              <div className="flex items-center gap-2">
                <Link to={"/"}>
                  <h1 className="text-white text-[20px] hover:underline">
                    {t("home")}
                  </h1>
                </Link>
                <span>|</span>
                <h1 className=" text-[20px]">{t("Appointment")}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentHero;
