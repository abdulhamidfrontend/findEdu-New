import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import MyCentersHero from "./My-centers hero/MyCentersHero";
import MyCentersBody from "./My-centers body/MyCentersBody";

const MyCenters = () => {
  return (
    <div>
      <div className="w-full m-auto">
        <div className="shadow-xl fixed top-0 left-0 w-full z-50 bg-white">
          <div className="max-w-[95%] mx-auto">
            <Navbar />
          </div>
        </div>
        <div className="hero">
          <MyCentersHero />
        </div>
        <div>
          <MyCentersBody />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MyCenters;
