import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { setLang } from "@/store/slices/languageSlice";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.language.lang);

  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    dispatch(setLang(newLang));
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="flex items-center justify-between py-5">
      <h1 className="font-bold text-3xl">LOGO</h1>

      <div className="flex gap-8">
        <Link to={"/"}>
          <h3>{t("home")}</h3>
        </Link>
        <Link to={"/about"}>
          <h3>{t("about")}</h3>
        </Link>
        <Link to={"/resources"}>
          <h3>{t("resources")}</h3>
        </Link>
        <h3 className="flex gap-2 items-center">
          <FaRegHeart /> {t("favorites")}
        </h3>
      </div>

      <div className="flex items-center gap-5 relative" ref={dropdownRef}>
        <select
          value={lang}
          onChange={handleChangeLang}
          className="border px-2 py-1 rounded"
        >
          <option value="uz">O‘zbekcha</option>
          <option value="en">English</option>
        </select>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="bg-blue-950 text-white px-4 py-2 rounded"
            >
              {user.firstName}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow w-40 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  <h1 className="flex items-center gap-2">
                    <FaRegUser />
                    Profile
                  </h1>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <h1 className="flex items-center text-red-600 gap-2">
                    <AiOutlineLogout className="" />
                    Logout
                  </h1>
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="border px-4 py-2 rounded">{t("login")}</button>
            </Link>
            <Link to="/register">
              <button className="bg-blue-950 text-white px-4 py-2 rounded">
                {t("register")}
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
