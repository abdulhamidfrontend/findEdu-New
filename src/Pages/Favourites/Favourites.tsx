import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoCallOutline, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface Center {
  id: number;
  name: string;
  phone: string;
  regionId: number;
  address: string;
  seoId: number;
  image: string;
}

const FavouritesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [userId, setUserId] = useState<number | null>(null);
  const [favourites, setFavourites] = useState<Center[]>([]);

  // Avval userId ni olish
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://findcourse.net.uz/api/users/mydata", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          setUserId(data.data[0].id);
        }
      } catch (error) {
        console.error("User ma'lumot olishda xatolik:", error);
      }
    };

    fetchUserData();
  }, []);

  // Likedlarni olish va userId bo'yicha filter qilish
  useEffect(() => {
    if (!userId) return;

    const fetchFavourites = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await fetch("https://findcourse.net.uz/api/liked/query", {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        const data = await res.json();

        if (Array.isArray(data.data)) {
          const myLikes = data.data
            .filter((item: any) => item.userId === userId)
            .map((item: any) => item.center);
          setFavourites(myLikes);
        } else {
          console.error("Backenddan noto'g'ri data keldi:", data);
        }
      } catch (error) {
        console.error("Sevimlilarni olishda xatolik:", error);
      }
    };

    fetchFavourites();
  }, [userId]);

  const filteredCenters = favourites.filter((center) =>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15">
        {filteredCenters.map((center) => (
          <div
            key={center.id}
            className="shadow hover:scale-103 w-100 relative rounded-xl duration-300 hover:shadow-2xl transition cursor-pointer"
            onClick={() => navigate(`/center/${center.id}`)}
          >
            <div className="w-full flex items-center justify-center rounded-lg h-[220px]">
              <img
                src={`https://findcourse.net.uz/api/image/${center.image}`}
                alt={center.name}
                className="rounded-xl rounded-b-none w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h2 className="text-xl font-semibold">{center.name}</h2>
              <h2 className="text-[14px] text-gray-600">{center.address}</h2>
              <p className="text-[14px] flex items-center gap-2 text-gray-600">
                <IoCallOutline className="text-xl" /> {center.phone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouritesPage;
