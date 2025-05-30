import Navbar from "@/Components/Navbar/Navbar";
import Hero from "./Hero/Hero";
import Body from "./Body/Body";
import Footer from "@/Components/Footer/Footer";

const Resources = () => {
  return (
    <div>
      <div className="shadow-xl">
        <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
          <div className="max-w-[95%] mx-auto">
            <Navbar />
          </div>
        </div>
      </div>
      <Hero />
      <div className="w-[85%] m-auto">
        <Body />
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Resources;
