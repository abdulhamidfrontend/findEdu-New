import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { FaBook, FaDownload, FaSearch } from "react-icons/fa";
import ForStudentsImg from "@/assets/forstudents.png";
import Health from "@/assets/health.png";
import Teaching from "@/assets/teaching.png";
import Technology from "@/assets/technology.png";

const Body = () => {
  const { t } = useTranslation();
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState<
    string | null
  >(null);

  useEffect(() => {
    fetch("https://findcourse.net.uz/api/resources")
      .then((res) => res.json())
      .then((data) => {
        setResources(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching resources:", error);
        setLoading(false);
      });
  }, []);

  const filteredResources = resources.filter((res) => {
    const matchesSearch = res.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategoryName
      ? res.category.name === selectedCategoryName
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="px-4 mt-20">
      <form className="border rounded-[6px] p-2.5 flex items-center gap-2 mb-10">
        <IoSearchOutline className="text-[22px]" />
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="focus:outline-none w-full"
          placeholder={t("find-resources")}
        />
      </form>

      <h1 className="text-lg font-semibold mb-4">{t("filter-by-category")}</h1>
      <div className="flex items-center gap-3 my-5 flex-wrap">
        {/* All resources button */}
        <div
          onClick={() => setSelectedCategoryName(null)}
          className="border w-40 h-40 rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
        >
          <div className="w-full h-28 flex items-center justify-center bg-gray-50 rounded-t-xl">
            <FaSearch className="text-4xl" />
          </div>
          <h3 className="text-center mt-3 text-[14px]">{t("all-resources")}</h3>
        </div>

        <div
          onClick={() => setSelectedCategoryName("For students")}
          className="border w-40 h-40 rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
        >
          <div className="w-full h-28 bg-gray-50 rounded-t-xl">
            <img
              src={ForStudentsImg}
              className="w-full h-full object-cover rounded-t-xl"
              alt=""
            />
          </div>
          <h3 className="text-center mt-3 text-[14px]">{t("For-students")}</h3>
        </div>

        <div
          onClick={() => setSelectedCategoryName("Health")}
          className="border w-40 h-40 rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
        >
          <div className="w-full h-28 bg-gray-50 rounded-t-xl">
            <img
              src={Health}
              className="w-full h-full object-cover rounded-t-xl"
              alt=""
            />
          </div>
          <h3 className="text-center mt-3 text-[14px]">{t("Health")}</h3>
        </div>

        <div
          onClick={() => setSelectedCategoryName("Teaching")}
          className="border w-40 h-40 rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
        >
          <div className="w-full h-28 bg-gray-50 rounded-t-xl">
            <img
              src={Teaching}
              className="w-full h-full object-cover rounded-t-xl"
              alt=""
            />
          </div>
          <h3 className="text-center mt-3 text-[14px]">{t("Teaching")}</h3>
        </div>

        <div
          onClick={() => setSelectedCategoryName("Technology")}
          className="border w-40 h-40 rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
        >
          <div className="w-full h-28 bg-gray-50 rounded-t-xl">
            <img
              src={Technology}
              className="w-full h-full object-cover rounded-t-xl"
              alt=""
            />
          </div>
          <h3 className="text-center mt-3 text-[14px]">{t("Technology")}</h3>
        </div>
      </div>

      {/* LOADING */}
      {loading && <p className="text-center">{t("loading")}...</p>}

      {/* RESOURCES */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-xl hover:shadow border transition duration-300 flex flex-col gap-3"
          >
            <div className="flex items-center justify-center rounded-lg h-[220px]">
              <img
                src={res.image}
                alt={res.name}
                className="rounded-xl h-full w-full object-cover"
              />
            </div>
            <div className="p-5">
              <p className="text-gray-500 flex items-center gap-3">
                <FaBook className="text-2xl" /> Resource
              </p>
              <h2 className="text-xl font-bold mt-7">{res.name}</h2>
              <p className="text-gray-500 py-3 text-[14px]">
                by {res.user.firstName}
              </p>
              <p className="text-sm text-gray-700 line-clamp-3">
                {res.description}
              </p>
              <p className="text-xs text-end py-5 text-gray-500">
                {new Date(res.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="actions bg-gray-50 rounded-b-xl">
              <div className="p-5 flex items-center justify-between">
                <button
                  onClick={() => window.open(res.media, "_blank")}
                  className="text-blue-900 font-medium text-[14px]"
                >
                  {t("preview")}
                </button>
                <a
                  href={res.media}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center gap-1 text-[12px] bg-blue-900 hover:bg-blue-950 transition text-white py-2 px-4 rounded-3xl"
                >
                  <FaDownload />
                  {t("download")}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && filteredResources.length === 0 && (
        <p className="text-center text-gray-500">{t("no-results-found")}</p>
      )}
    </div>
  );
};

export default Body;
