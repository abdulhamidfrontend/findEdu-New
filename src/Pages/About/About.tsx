import Navbar from "@/Components/Navbar/Navbar";
import AboutHero from "./AboutHero/AboutHero";
import Body from "./Body/Body";
const About = () => {
  return (
    <div className="w-full">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <div className="max-w-[95%] mx-auto">
          <Navbar />
        </div>
      </div>
      <div className="">
        <AboutHero />
        <div>
          <Body />
        </div>
      </div>
    </div>
  );
};

export default About;
