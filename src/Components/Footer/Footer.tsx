import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-blue-950 w-full">
      <div className="max-w-[90%] m-auto">
        <h1 className="text-white text-4xl font-bold pt-7 ">LOGO</h1>
        <div className="flex items-center p-10 gap-20  text-white">
          <div className="links flex items-center gap-25">
            <div>
              <h3 className="cursor-pointer hover:underline py-2">
                {t("home")}
              </h3>
              <h3 className="cursor-pointer hover:underline py-2">
                {t("studycenters")}
              </h3>
              <h3 className="cursor-pointer hover:underline py-2">
                {t("about")}
              </h3>
            </div>
            <div>
              <h3 className="cursor-pointer hover:underline py-2">
                {t("contact")}
              </h3>
              <h3 className="cursor-pointer hover:underline py-2">
                {t("comments")}
              </h3>
              <h3 className="cursor-pointer hover:underline py-2">
                {t("projects")}
              </h3>
            </div>
          </div>
          <div className="subjects gap-20 flex items-center">
            <div>
              <h3 className="cursor-pointer opacity-50 text-[14px] hover:underline py-2">
                {t("IT")}
              </h3>
              <h3 className="cursor-pointer opacity-50 text-[14px] hover:underline py-2">
                {t("math")}
              </h3>
              <h3 className="cursor-pointer opacity-50 text-[14px] hover:underline py-2">
                {t("marketing")}
              </h3>
              <h3 className="cursor-pointer opacity-50 text-[14px] hover:underline py-2">
                {t("sat")}
              </h3>
            </div>
            <div>
              <h3 className="cursor-pointer opacity-50 text-[14px] hover:underline py-2">
                {t("english")}
              </h3>
              <h3 className="cursor-pointer opacity-50 text-[14px] hover:underline py-2">
                {t("smm")}
              </h3>
              <h3 className="cursor-pointer opacity-50 text-[14px] hover:underline py-2">
                {t("design")}
              </h3>
              <h3 className="cursor-pointer opacity-50 text-[14px] hover:underline py-2">
                {t("business")}
              </h3>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-white opacity-50 text-[14px]">
            © 2025 Findedu. All Rights Reserved. Best Girls
          </h3>
          <div className="icons"></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
