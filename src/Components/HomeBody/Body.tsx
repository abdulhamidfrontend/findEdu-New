import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";

// INTERFACES
interface Center {
  id: number;
  name: string;
  phone: string;
  regionId: number;
  address: string;
  seoId: number;
  image: string;
}

interface LikedItem {
  id: number;
  userId: number;
  centerId: number;
}

const HomeBody = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [userId, setUserId] = useState<number | null>(null);
  const [centers, setCenters] = useState<Center[]>([]);
  const [likedCenters, setLikedCenters] = useState<LikedItem[]>([]);

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
          console.error("API format noto'g'ri:", data);
        }
      } catch (error) {
        console.error("Centers olishda xatolik:", error);
      }
    };

    fetchCenters();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchLikedCenters = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://findcourse.net.uz/api/liked", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (Array.isArray(data.data)) {
          const myLikes = data.data.filter(
            (item: LikedItem) => item.userId === userId
          );
          setLikedCenters(myLikes);
        }
      } catch (error) {
        console.error("Likedlarni olishda xatolik:", error);
      }
    };

    fetchLikedCenters();
  }, [userId]);

  const handleLike = async (centerId: number) => {
    try {
      const isAlreadyLiked = likedCenters.some(
        (item) => item.centerId === centerId
      );
      if (isAlreadyLiked) {
        console.log("Siz allaqachon like bosgansiz.");
        return;
      }

      const token = localStorage.getItem("token");
      const response = await fetch("https://findcourse.net.uz/api/liked", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ centerId }),
      });

      const data = await response.json();
      if (response.ok) {
        setLikedCenters((prev) => [...prev, data]);
      } else {
        console.error("Like qilishda xatolik:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUnlike = async (centerId: number) => {
    try {
      const likedItem = likedCenters.find((item) => item.centerId === centerId);
      if (!likedItem) {
        console.error("Like topilmadi");
        return;
      }

      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://findcourse.net.uz/api/liked/${likedItem.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        setLikedCenters((prev) =>
          prev.filter((item) => item.id !== likedItem.id)
        );
      } else {
        const data = await response.json();
        console.error("Unlike qilishda xatolik:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-15  ">
        {filteredCenters.map((center) => {
          const isLiked = likedCenters.some(
            (item) => item.centerId === center.id
          );
          return (
            <div>
              <div
                key={center.id}
                className=" shadow hover:scale-103 w-100 relative rounded-xl duration-300 hover:shadow-2xl transition cursor-pointer"
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
                  <h2 className="text-[14px] text-gray-600">
                    {center.address}
                  </h2>
                  <p className="text-[14px] flex items-center gap-2 text-gray-600">
                    <IoCallOutline className="text-xl" /> {center.phone}
                  </p>
                </div>

                <button
                  className="absolute top-5 right-5 hover:scale-110 active:scale-100 transition duration-300 bg-white p-3 rounded-full z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    isLiked ? handleUnlike(center.id) : handleLike(center.id);
                  }}
                >
                  {isLiked ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-red-500" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeBody;
