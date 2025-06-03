import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdLogOut } from "react-icons/io";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("https://findcourse.net.uz/api/users/mydata", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();

        if (!res.ok) {
          if (res.status === 401 || res.status === 404) {
            localStorage.removeItem("token"); // ❗tokenni o‘chirish
            navigate("/login");
          } else {
            setError(result.message || "Xatolik yuz berdi.");
          }
        } else {
          setUser(result.data);
          setFormData(result.data);
        }
      } catch (err) {
        setError("Server bilan ulanishda xatolik.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(
        `https://findcourse.net.uz/api/users/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Xatolik yuz berdi");
      } else {
        setUser(result.data);
        setIsEditing(false);
        toast.success("Profil muvaffaqiyatli yangilandi");
      }
    } catch (err) {
      toast.error("Server bilan ulanishda xatolik.");
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!user?.id) {
      toast.error("Foydalanuvchi topilmadi.");
      return;
    }

    if (!window.confirm("Rostdan ham hisobingizni o‘chirmoqchimisiz?")) return;

    try {
      const res = await fetch(
        `https://findcourse.net.uz/api/users/${user.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        localStorage.removeItem("token");
        toast.success("Hisob muvaffaqiyatli o‘chirildi");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const result = await res.json();
        toast.error(result.message || "O‘chirishda xatolik");
      }
    } catch (err) {
      toast.error("Server bilan ulanishda xatolik.");
    }
  };

  return (
    <div className="w-full">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <div className="max-w-[95%] mx-auto">
          <Navbar />
        </div>
      </div>

      <div className="max-w-4xl relative shadow my-40 p-5 rounded-2xl mx-auto px-5">
        <div className="mb-6">
          <Link to="/">
            <h1 className="flex items-center gap-2 text-blue-950 text-lg font-medium hover:underline">
              <FiArrowLeft /> {t("back_home")}
            </h1>
          </Link>
        </div>

        <div className="bg-white p-5">
          <div className="flex items-center justify-between my-5">
            <h1 className="text-2xl font-semibold mb-6">{t("my_profile")}</h1>
            {isEditing ? (
              <button
                onClick={handleSave}
                className="uppercase bg-green-600 text-white font-bold text-[13px] py-2.5 px-5 rounded-[8px]"
              >
                {t("save")}
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="uppercase bg-blue-950 text-white font-bold text-[13px] py-2.5 px-5 rounded-[8px] flex items-center gap-2"
              >
                <MdEdit className="text-[16px]" />
                {t("edit_account")}
              </button>
            )}
          </div>

          {loading ? (
            <div className="text-center text-blue-950 py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-900 mx-auto"></div>
              <p className="mt-2">{t("loading")}</p>
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
              <div>
                <strong>{t("name")}:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={formData?.firstName || ""}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded px-3 py-2"
                  />
                ) : (
                  <p className="text-gray-700 leading-[30px]">
                    {user?.firstName}
                  </p>
                )}
              </div>

              <div>
                <strong>{t("surname")}:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={formData?.lastName || ""}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded px-3 py-2"
                  />
                ) : (
                  <p className="text-gray-700 leading-[30px]">
                    {user?.lastName}
                  </p>
                )}
              </div>

              <div>
                <div>
                  <strong>{t("email")}:</strong>
                  <p className="text-gray-700 leading-[30px]">{user?.email}</p>
                </div>
              </div>

              <div>
                <strong>{t("phone")}:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData?.phone || ""}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded px-3 py-2"
                  />
                ) : (
                  <p className="text-gray-700 leading-[30px]">{user?.phone}</p>
                )}
              </div>

              <div>
                <strong>{t("role")}:</strong>
                <p className="text-gray-700 leading-[30px]">{user?.role}</p>
              </div>
            </div>
          )}

          <div className="bottom border-t mt-7 flex flex-col gap-4">
            <button
              onClick={handleDeleteAccount}
              className="border mt-7 hover:opacity-70 cursor-pointer uppercase flex items-center justify-center gap-2 border-red-500 rounded-[10px] w-fit py-2.5 px-4 text-red-500 font-bold text-[13px]"
            >
              <RiDeleteBin6Line className="text-[16px]" />
              {t("delete_account")}
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.removeItem("refreshToken");

                navigate("/login");
              }}
              className=" absolute bottom-5 right-5 bg-red-500 hover:opacity-70 cursor-pointer uppercase flex items-center justify-center gap-2  rounded-[10px] py-2.5 px-4 w-fit  text-white font-bold text-[13px]"
            >
              <IoMdLogOut className="text-[16px]" />
              LOG OUT
            </button>
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Profile;
