import Top from "./Top/Top";
import CentersTop from "./Centers/Top/CentersTop";
import CentersBottom from "./Centers/Bottom/CentersBottom";

const Body = () => {
  return (
    <div className="max-w-[80%] m-auto">
      <Top />
      <CentersTop />
      <CentersBottom />
    </div>
  );
};

export default Body;
