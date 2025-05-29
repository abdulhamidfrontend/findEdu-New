import { IoSearch } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa6";
import studycenterimg from "../../assets/studycenter.png";

const HomeBody = () => {
  const { t } = useTranslation();
  const [centers, setCenters] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const res = await fetch("https://findcourse.net.uz/api/centers");
        const data = await res.json();

        if (Array.isArray(data)) {
          setCenters(data);
        } else if (Array.isArray(data.centers)) {
          setCenters(data.centers);
        } else if (Array.isArray(data.data)) {
          setCenters(data.data);
        } else {
          console.error("API format noto‘g‘ri:", data);
        }
      } catch (error) {
        console.error("API dan ma'lumot olishda xatolik:", error);
      }
    };

    fetchCenters();
  }, []);

  const filteredCenters = centers.filter((center) =>
    center.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-center mb-10">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center gap-2 border p-3 rounded-[25px] border-blue-950 w-[700px]"
        >
          <IoSearch />
          <input
            type="search"
            placeholder={t("search_placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:outline-none w-full"
          />
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCenters.map((center) => (
          <div
            key={center.id}
            className="border  hover:scale-105 rounded-xl duration-300 hover:shadow  transition"
          >
            <div className="w-full flex items-center justify-center rounded-lg h-[220px] ">
              <img
                src={studycenterimg}
                alt="center image"
                className="rounded-xl rounded-tl-xl rounded-br-[0] rounded-tr-xl w-full h-full rounded-bl-none"
              />
            </div>
            <div className="p-4 flex  flex-col gap-2">
              <h2 className="text-xl font-semibold">{center.name}</h2>
              <h2 className="text-[14px] text-gray-600">{center.address}</h2>

              <p className="text-[14px] flex items-center gap-2 text-gray-600">
                <FaPhone /> {center.phone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeBody;
