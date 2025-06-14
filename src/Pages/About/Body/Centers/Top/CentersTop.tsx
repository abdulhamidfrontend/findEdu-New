import { PiStudentFill } from "react-icons/pi";

const CentersTop = () => {
  return (
    <div>
      <div className="title">
        <h1>Bizning ta'sirimiz</h1>
      </div>
      <div className="cards">
        <div className="card">
          <PiStudentFill />
          <h1>250+</h1>
          <p>
            Ro'yxatdan o'tgan <br /> foydalanuvchilar
          </p>
        </div>
      </div>
    </div>
  );
};

export default CentersTop;
