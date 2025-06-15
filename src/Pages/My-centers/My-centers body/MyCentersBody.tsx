import React, { useEffect, useState } from "react";
import { message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { IoCallOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Center {
  id: number;
  name: string;
  address: string;
  phone: string;
  image: string;
}

const MyCentersBody: React.FC = () => {
  const [centers, setCenters] = useState<Center[]>([]);
  const [likedCenters, setLikedCenters] = useState<number[]>([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyCenters = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://findcourse.net.uz/api/users/mycenters",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Ma'lumotlarni olishda xatolik");
        }

        const data = await res.json();
        setCenters(data.data);
      } catch (error) {
        console.error("Error:", error);
        message.error("Markazlar ro'yxatini olishda xatolik yuz berdi");
      }
    };

    fetchMyCenters();
  }, []);

  const handleLike = (id: number) => {
    setLikedCenters([...likedCenters, id]);
  };

  const handleUnlike = (id: number) => {
    setLikedCenters(likedCenters.filter((centerId) => centerId !== id));
  };

  const handleDelete = async () => {
    if (selectedDeleteId === null) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://findcourse.net.uz/api/centers/${selectedDeleteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("O'chirishda xatolik yuz berdi");
      }

      setCenters((prev) =>
        prev.filter((center) => center.id !== selectedDeleteId)
      );
      setDeleteModalVisible(false);
      toast.success("Markaz o'chirildi");
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Markaz o'chirishda xatolik yuz berdi");
    }
  };

  return (
    <>
      {centers.length === 0 ? (
        <div className="p-10 text-center">
          <h2 className="text-2xl font-semibold my-30 text-gray-500">
            Markaz Yaratilmagan
          </h2>
        </div>
      ) : (
        <div className="p-10 grid grid-cols-3 gap-5">
          {centers.map((center) => {
            const isLiked = likedCenters.includes(center.id);
            return (
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
                  <h2 className="text-[14px] text-gray-600">
                    {center.address}
                  </h2>
                  <p className="text-[14px] flex items-center gap-2 text-gray-600">
                    <IoCallOutline className="text-xl" /> {center.phone}
                  </p>
                </div>

                <button
                  className="absolute top-5 right-16 hover:scale-110 active:scale-100 transition duration-300 bg-white p-3 rounded-full z-10"
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

                <button
                  className="absolute top-5 right-5 hover:scale-110 active:scale-100 transition duration-300 bg-white p-3 rounded-full z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDeleteId(center.id);
                    setDeleteModalVisible(true);
                  }}
                >
                  <FaTrash className="text-red-500" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        width={400}
        centered
        closable={false}
        title={
          <h1 className="text-xl font-bold text-center text-blue-900">
            O'chirishni tasdiqlash
          </h1>
        }
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        footer={[
          <div className="flex items-center mt-4 gap-2 justify-end">
            <button
              key="cancel"
              className="bg-gray-300 font-medium text-gray-800 text-[15px] px-4 py-2 rounded"
              onClick={() => setDeleteModalVisible(false)}
            >
              Bekor qilish
            </button>
            <button
              key="delete"
              className="bg-red-600 font-medium text-white text-[15px] px-4 py-2 rounded"
              onClick={handleDelete}
            >
              O'chirish
            </button>
            ,
          </div>,
        ]}
      >
        <p className="text-center text-[16px]">
          Ushbu markazni o'chirishni istaysizmi? Bu <br /> amalni bekor qilib
          bo'lmaydi.
        </p>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default MyCentersBody;
