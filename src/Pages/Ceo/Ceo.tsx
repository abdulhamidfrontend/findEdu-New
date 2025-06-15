import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import CeoHero from "./CeoHero/CeoHero";
import CeoBody from "./CeoBody/CeoBody";

const Ceo = () => {
  return (
    <div className="w-full m-auto">
      <div className="shadow-xl fixed top-0 left-0 w-full z-50 bg-white">
        <div className="max-w-[95%] mx-auto">
          <Navbar />
        </div>
      </div>
      <div className="hero">
        <CeoHero />
      </div>
      <div className="ceobody">
        <CeoBody />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Ceo;
