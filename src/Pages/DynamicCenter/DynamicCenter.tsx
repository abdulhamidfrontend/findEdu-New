import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/Components/Navbar/Navbar";
import { FaArrowLeftLong } from "react-icons/fa6";
import Footer from "@/Components/Footer/Footer";
import { PiStudentBold } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa6";
import { LuClock4 } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { BiComment } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { CiCalendar } from "react-icons/ci";
import { Rate } from "antd";
import { FaRegHeart } from "react-icons/fa";
import ReceptionModal from "./Modal/Modal";

interface Region {
  id: number;
  name: string;
}

interface Filial {
  id: number;
  name: string;
  phone: string;
  regionId: number;
  centerId: number;
  address: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  region: Region;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CommentUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  id: number;
  text: string;
  star: number;
  userId: number;
  centerId: number;
  createdAt: string;
  updatedAt: string;
  user: CommentUser;
}

interface Center {
  id: number;
  name: string;
  address: string;
  phone: string;
  image: string;
  user: User;
  comments: Comment[];
  filials: Filial[];
}

const DynamicCenter = () => {
  const { id } = useParams<{ id: string }>();
  const [center, setCenter] = useState<Center | null>(null);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token topilmadi. Iltimos login qiling.");
      return;
    }

    try {
      const response = await fetch("https://findcourse.net.uz/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: commentText,
          star: rating,
          centerId: center?.id,
        }),
      });

      if (response.ok) {
        setCommentText("");
        setRating(0);
        const updatedRes = await fetch(
          `https://findcourse.net.uz/api/centers/${id}`
        );
        const updatedData = await updatedRes.json();
        setCenter(updatedData.data);
      } else {
        const errorData = await response.json();
        console.error("Sharh qo'shishda xatolik:", errorData);
      }
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  useEffect(() => {
    const fetchCenter = async () => {
      try {
        const res = await fetch(`https://findcourse.net.uz/api/centers/${id}`);
        const data = await res.json();
        setCenter(data.data);
        console.log("LocalStorage User ID:", localStorage.getItem("userId"));
        console.log("Token:", localStorage.getItem("token"));
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };

    fetchCenter();
  }, [id]);

  return (
    <div className="w-full bg-gray-100 m-auto">
      <div className="shadow-xl">
        <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
          <div className="max-w-[95%] mx-auto">
            <Navbar />
          </div>
        </div>
      </div>

      <div className="w-[97%] pt-30 m-auto">
        <Link to={"/"}>
          <h1 className="flex items-center gap-2 text-blue-900 text-xl">
            <FaArrowLeftLong />
            Markazlarga qaytish
          </h1>
        </Link>
      </div>

      <div className="w-[97%] m-auto py-10">
        {center ? (
          <div className="bg-white shadow flex items-start rounded-lg">
            <div className="left relative ">
              <button className="shadow-xl bg-white right-3 hover:scale-110 transition duration-300 active:scale-100 top-3 absolute flex items-center justify-center p-3  rounded-full">
                <FaRegHeart className="text-red-500 text-2xl" />
              </button>
              <div className="w-[550px] border-b flex items-center justify-center  h-fit ">
                <img
                  src={`https://findcourse.net.uz/api/image/${center.image}`}
                  alt={center.name}
                  className="rounded-xl rounded-tl-xl rounded-br-[0] rounded-tr-[0] rounded-bl-none w-full h-full"
                />
              </div>
              <div className="p-5 ">
                <div className="my-3">
                  <h1 className="text-xl font-medium my-2">
                    Bizning filiallar
                  </h1>

                  <div className="w-[500px] rounded-[8px] bg-violet-100 border-violet-400 border p-3 flex flex-col gap-2">
                    {center.filials.length === 0 ? (
                      <p>Filiallar mavjud emas</p>
                    ) : (
                      center.filials.map((filial) => (
                        <Link to={`/branches/${filial.id}`} key={filial.id}>
                          <div className="cursor-pointer hover:bg-violet-200 p-2 rounded-[8px]">
                            <div className="text-[16px] font-medium">
                              {filial.name}
                            </div>
                            <div className="text-gray-500 text-[14px] font-normal">
                              {filial.address}
                            </div>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <h1 className="flex items-center gap-2 text-xl font-medium">
                    <PiStudentBold />
                    Mavjud kurslar
                  </h1>
                  <div className="flex items-center gap-1.5 border-[#a855f7] py-2 px-3 rounded-xl w-fit border-2 ">
                    <div className="bg-violet-100 p-1.5 flex items-center justify-center rounded-[8px] ">
                      <FaRegBookmark className="text-[14px] text-[#a855f7]" />
                    </div>
                    <h1 className="font-medium text-xl">optional</h1>
                  </div>
                  <button
                    className="w-fit flex items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white px-5 py-3 transition duration-200 rounded-[8px]"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <LuClock4 />
                    Darsga yozilish
                  </button>
                </div>
              </div>
            </div>
            <div className="right flex flex-col gap-5 p-10 w-full">
              <div className="title">
                <h1 className="text-3xl font-bold">{center.name}</h1>
              </div>
              <div className="location">
                <h3 className="flex items-center gap-2 text-[18px] text-gray-600">
                  <IoLocationOutline className="text-xl" />
                  {center.address}
                </h3>
              </div>
              <div className="number">
                <h1 className="font-semibold text-gray-500 text-[14px]">
                  Phone
                </h1>
                <div className="flex items-center gap-2">
                  <FaPhone />
                  <a
                    className="text-[18px] hover:text-blue-900 font-medium "
                    href={`tel:${center.phone}`}
                  >
                    {center.phone}
                  </a>
                </div>
              </div>

              <div className="comment mt-5">
                <div className="flex items-center gap-2 mb-3">
                  <BiComment className="text-xl" />
                  <h3 className="text-xl">Sharhlar</h3>
                </div>
                <form onSubmit={handleSubmitComment}>
                  <textarea
                    placeholder="Bu markaz haqida fikringizni bildiring..."
                    className="w-full outline rounded-xl p-3"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  ></textarea>
                  <div className="flex items-center gap-2">
                    <p>Baholash:</p>
                    <Rate
                      value={rating}
                      onChange={(value) => setRating(value)}
                    />
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      type="submit"
                      className="text-white w-fit px-4 py-2 rounded-[8px] bg-blue-900"
                    >
                      Sharh qoldirish
                    </button>
                  </div>
                </form>

                <div className="mt-5 flex flex-col gap-3">
                  {center.comments.length == 0 ? (
                    <p>Hozircha sharhlar mavjud emas.</p>
                  ) : (
                    center.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="p-4 rounded-xl bg-gray-50"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-gray-400">
                            <AiOutlineUser />
                          </h3>

                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">
                                {comment.user.firstName} {comment.user.lastName}
                              </h4>
                              <Rate disabled defaultValue={comment.star} />
                            </div>

                            <h3 className="flex items-center text-gray-600 gap-2">
                              <CiCalendar className="text-xl" />
                              {new Date(
                                comment.user.createdAt
                              ).toLocaleDateString("en-US")}
                            </h3>
                          </div>
                        </div>
                        <div>
                          <p>{comment.text}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Yuklanmoqda...</p>
        )}
      </div>

      <Footer />
      <ReceptionModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        center={center}
      />
    </div>
  );
};

export default DynamicCenter;
