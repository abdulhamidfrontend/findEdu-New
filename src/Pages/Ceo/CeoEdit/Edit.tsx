import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Spin } from "antd";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import { FaArrowLeft } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Center {
  id: number;
  name: string;
  address: string;
  phone: string;
  image: string;
}

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [center, setCenter] = useState<Center | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [currentImage, setCurrentImage] = useState<string>("");

  useEffect(() => {
    fetchCenter();
  }, []);

  const fetchCenter = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `https://findcourse.net.uz/api/centers/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data?.data;
      setCenter(data);
      setCurrentImage(`https://findcourse.net.uz/api/image/${data.image}`);
      setFormData({
        name: data.name,
        address: data.address,
        phone: data.phone,
      });
    } catch (error) {
      console.error("Error fetching center:", error);
      toast.error("Ma'lumotlarni olishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const updatedFields: any = {};

      if (formData.name !== center?.name) {
        updatedFields.name = formData.name;
      }
      if (formData.address !== center?.address) {
        updatedFields.address = formData.address;
      }
      if (formData.phone !== center?.phone) {
        updatedFields.phone = formData.phone;
      }

      if (Object.keys(updatedFields).length === 0) {
        toast.info("Hech qanday ozgarish kiritilmadi.");
        return;
      }

      await axios.patch(
        `https://findcourse.net.uz/api/centers/${id}`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Ma'lumotlar muvaffaqiyatli yangilandi");
      fetchCenter();
    } catch (error) {
      console.error("Error updating center:", error);
      toast.error("Yangilashda xatolik yuz berdi");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!center) {
    return (
      <div className="text-center mt-10 text-red-500">Markaz topilmadi</div>
    );
  }

  return (
    <div className="w-full m-auto bg-gray-50 ">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="shadow-xl fixed top-0 left-0 w-full z-50 bg-white">
        <div className="max-w-[95%] mx-auto">
          <Navbar />
        </div>
      </div>
      <div className="py-20">
        <Link
          className="m-10 hover:underline text-blue-900 flex items-center gap-2"
          to={`/centers/${id}`}
        >
          <FaArrowLeft />
          Markaz tafsilotlariga qaytish
        </Link>
        <div className="body flex items-center bg-white w-[95%] m-auto rounded-xl shadow-2xl">
          <div className="left w-[50%]">
            <div className="rounded-lg bg-white">
              <div className="flex justify-center">
                <img
                  src={currentImage}
                  alt="Center"
                  className="w-full h-full object-cover rounded-xl rounded-br-none rounded-tr-none"
                />
              </div>
            </div>
          </div>

          <div className="right mx-auto p-10 w-[50%]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <h1 className="text-2xl font-bold mb-4">
                Markaz ma'lumotlarini tahrirlash
              </h1>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-950 text-white py-2 rounded hover:bg-blue-800 duration-200 transition"
              >
                O'zgarishlarni saqlash
              </button>
            </form>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Edit;
