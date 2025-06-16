import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoLocationOutline, IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaRegCalendar } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";

interface Center {
  id: number;
  name: string;
  address: string;
  image: string;
  phone: string;
}

interface Filial {
  id: number;
  name: string;
  address: string;
  phone: string;
  image: string;
}

interface Major {
  id: number;
  name: string;
}

interface Reception {
  id: number;
  center: Center;
  filial: Filial;
  major: Major;
  visitDate: string;
  status: string;
}

const AppointmentBody = () => {
  const [receptions, setReceptions] = useState<Reception[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null); // delete qilish uchun id saqlaymiz
  const navigate = useNavigate();

  useEffect(() => {
    fetchReceptions();
  }, []);

  const fetchReceptions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://findcourse.net.uz/api/users/mydata",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = res.data?.data?.receptions || [];
      setReceptions(data);
    } catch (error) {
      console.error("Error fetching receptions:", error);
    }
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://findcourse.net.uz/api/reseption/${deleteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setReceptions((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting reception:", error);
    }
  };

  return (
    <div className="relative">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {receptions.map((reception) => (
          <div
            key={reception.id}
            className="shadow hover:scale-103 w-100 relative rounded-xl duration-300 hover:shadow-2xl transition cursor-pointer"
            onClick={() => navigate(`/center/${reception.center.id}`)}
          >
            <div className="w-full flex items-center justify-center rounded-lg h-[220px]">
              <img
                src={`https://findcourse.net.uz/api/image/${reception.center.image}`}
                alt={reception.center.name}
                className="rounded-xl rounded-b-none w-full h-full object-cover object-center"
              />
            </div>

            <div className="p-4 flex flex-col gap-2">
              <h2 className="text-xl font-bold text-blue-900">
                {reception.center.name}
              </h2>

              <div className="text-[14px] flex items-start gap-2 text-gray-600">
                <p className="font-bold flex items-start gap-1">
                  <IoLocationOutline className="text-2xl text-red-500" />{" "}
                  Manzil:
                </p>
                <span className="font-normal">{reception.center.address}</span>
              </div>

              <div className="text-[14px] flex items-center gap-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <FaRegCalendar className="text-blue-900 text-xl" />
                  <h3 className="font-bold">Tashrif Sanasi: </h3>
                </div>
                {new Date(reception.visitDate).toLocaleDateString()}
              </div>

              <div className="text-[14px] flex items-center gap-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <PiStudentBold className="text-xl" />
                  <h3 className="font-bold">Yonalish:</h3>
                </div>
                {reception.major?.name}
              </div>

              <p className="text-[14px] flex items-center gap-2 text-gray-600">
                <IoCheckmarkDoneOutline className="text-xl" />{" "}
                {reception.status}
              </p>
            </div>

            <button
              className="absolute top-5 right-5 hover:scale-110 active:scale-100 transition duration-300 bg-white p-3 rounded-full z-10"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteId(reception.id);
              }}
            >
              <MdDelete className="text-red-500 text-xl" />
            </button>
          </div>
        ))}

        {receptions.length === 0 && (
          <p className="text-center my-50 text-gray-500 col-span-3">
            Sizda hali uchrashuvlar yo'q
          </p>
        )}
      </div>

      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">
              O‘chirishni tasdiqlaysizmi?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                O‘chirish
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setDeleteId(null)}
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentBody;
