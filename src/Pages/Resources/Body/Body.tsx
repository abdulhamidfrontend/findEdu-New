import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaBook, FaDownload, FaSearch } from "react-icons/fa";
import axios from "axios";

const Body = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState<
    string | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://findcourse.net.uz/api/resources");
        setResources(res.data.data);
        const cat = await axios.get("https://findcourse.net.uz/api/categories");
        setCategories(cat.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  const resetForm = () => {
    setCategoryId("");
    setName("");
    setDescription("");
    setMedia("");
    setImage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://findcourse.net.uz/api/resources",
        {
          categoryId: categoryId,
          name: name,
          description: description,
          media: media,
          image: image,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsModalOpen(false);
      resetForm();

      const res = await axios.get("https://findcourse.net.uz/api/resources");
      setResources(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="px-4 mt-20">
      <form className="border rounded p-2.5 flex items-center gap-2 mb-10">
        <IoSearchOutline className="text-[22px]" />
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="focus:outline-none w-full"
          placeholder="Resurslarni qidirish"
        />
      </form>

      <h1 className="text-lg font-semibold mb-4">Category bo‘yicha filter</h1>
      <div className="flex items-center gap-3 my-5 flex-wrap">
        <div
          onClick={() => setSelectedCategoryName(null)}
          className="border w-40 h-40 rounded-xl shadow-md hover:shadow-lg cursor-pointer flex flex-col justify-center items-center"
        >
          <FaSearch className="text-4xl" />
          <h3 className="mt-3 text-[14px]">Barchasi</h3>
        </div>

        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedCategoryName(cat.name)}
            className="border w-40 h-40 rounded-xl shadow-md hover:shadow-lg cursor-pointer flex flex-col justify-center items-center"
          >
            <h3 className="mt-3 text-[14px]">{cat.name}</h3>
          </div>
        ))}
      </div>

      {loading && <p className="text-center">Yuklanmoqda...</p>}
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-900 text-white py-2 px-4 rounded-[8px] mb-4"
          onClick={() => setIsModalOpen(true)}
        >
          Resource Qo'shish
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-xl shadow border flex flex-col gap-3"
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
                by {res.user?.firstName}
              </p>
              <p className="text-sm text-gray-700 line-clamp-3">
                {res.description}
              </p>
              <p className="text-xs text-end py-5 text-gray-500">
                {new Date(res.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-gray-50 rounded-b-xl">
              <div className="p-5 flex items-center justify-between">
                <button
                  onClick={() => window.open(res.media, "_blank")}
                  className="text-blue-900 font-medium text-[14px]"
                >
                  Preview
                </button>
                <a
                  href={res.media}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center gap-1 text-[12px] bg-blue-900 hover:bg-blue-950 text-white py-2 px-4 rounded-3xl"
                >
                  <FaDownload /> Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && filteredResources.length === 0 && (
        <p className="text-center text-gray-500">Hech narsa topilmadi</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0  z-50 flex justify-center items-center  backdrop-blur-xl   ">
          <div className="bg-white p-6  shadow-xl border rounded-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Resurs qo‘shish</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="border p-2 rounded"
              >
                <option value="">Kategoriya tanlang</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Resurs nomi"
                required
                className="border p-2 rounded"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
                className="border p-2 rounded"
              ></textarea>
              <input
                type="text"
                value={media}
                onChange={(e) => setMedia(e.target.value)}
                placeholder="Media URL"
                required
                className="border p-2 rounded"
              />
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL"
                required
                className="border p-2 rounded"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Saqlash
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="bg-gray-400 text-white py-2 px-4 rounded"
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
