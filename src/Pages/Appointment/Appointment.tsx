import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import AppointmentHero from "./AppointmentHero/AppointmentHero";
import AppointmentBody from "./AppointmentBody/AppointmentBody";

const Appointment = () => {
  return (
    <div className="w-full m-auto">
      <div className="shadow-xl fixed top-0 left-0 w-full z-50 bg-white">
        <div className="max-w-[95%] mx-auto">
          <Navbar />
        </div>
      </div>
      <div className="hero">
        <AppointmentHero />
      </div>
      <div className="body">
        <AppointmentBody />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Appointment;
