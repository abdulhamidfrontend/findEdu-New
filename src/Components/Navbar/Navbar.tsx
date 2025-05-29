import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { setLang } from "@/store/slices/languageSlice";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.language.lang);

  const handleChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    dispatch(setLang(newLang));
    i18n.changeLanguage(newLang); // <== BU MUHIM!
  };

  return (
    <div className="flex items-center justify-between py-5">
      <h1 className="font-bold text-3xl">LOGO</h1>

      <div className="flex gap-8">
        <h3>{t("home")}</h3>
        <h3>{t("about")}</h3>
        <h3>{t("resources")}</h3>
        <h3 className="flex gap-2 items-center">
          <FaRegHeart /> {t("favorites")}
        </h3>
      </div>

      <div className="flex items-center gap-5">
        <select
          value={lang}
          onChange={handleChangeLang}
          className="border px-2 py-1 rounded"
        >
          <option value="uz">O‘zbekcha</option>
          <option value="en">English</option>
        </select>

        <Link to="/login">
          <button className="border px-4 py-2 rounded">{t("login")}</button>
        </Link>
        <Link to="/register">
          <button className="bg-blue-950 text-white px-4 py-2 rounded">
            {t("register")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
