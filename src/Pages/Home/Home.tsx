import Navbar from "../../Components/Navbar/Navbar";
import Hero from "../../Components/Hero/Hero";
import HomeBody from "@/Components/HomeBody/Body";
import Footer from "@/Components/Footer/Footer";

const Home = () => {
  return (
    <div className="w-full">
      <div className="shadow-xl">
        <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
          <div className="max-w-[95%] mx-auto">
            <Navbar />
          </div>
        </div>
      </div>
      <Hero />
      <div className="max-w-[95%] mt-15 m-auto">
        <HomeBody />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
