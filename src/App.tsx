import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import OTP from "./Pages/OTP/OTP";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "@/store/store";
import Resources from "./Pages/Resources/Resources";
import Profile from "./Pages/Profile/Profile";
import About from "./Pages/About/About";

function App() {
  const { i18n } = useTranslation();
  const lang = useSelector((state: RootState) => state.language.lang);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
