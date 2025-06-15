import React, { useEffect, useState } from "react";
import Ceoimg from "@/assets/ceoimg.png";
import { Input, Select, Upload, InputNumber } from "antd";
import { IoImageOutline } from "react-icons/io5";
import type { UploadProps } from "antd";
import type { RcFile } from "antd/es/upload/interface";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddBranch from "./AddBranch/AddBranch";

const { Option } = Select;
const { Dragger } = Upload;

interface Region {
  id: number;
  name: string;
}

interface Center {
  id: number;
  name: string;
}

const CeoBody: React.FC = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [myCenters, setMyCenters] = useState<Center[]>([]);

  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [imageFileName, setImageFileName] = useState("");

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await fetch("https://findcourse.net.uz/api/regions/search");
        const data = await res.json();
        setRegions(data.data);
      } catch {
        toast.error("Hududlarni olishda xatolik");
      }
    };

    const fetchCenters = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://findcourse.net.uz/api/users/mycenters",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setMyCenters(data.data);
      } catch {
        toast.error("Markazlarni olishda xatolik");
      }
    };

    fetchRegions();
    fetchCenters();
  }, []);

  const uploadProps: UploadProps = {
    name: "image",
    multiple: false,
    customRequest: async (options) => {
      const { file, onSuccess, onError } = options;
      const formData = new FormData();
      formData.append("image", file as RcFile);

      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://findcourse.net.uz/api/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        const data = await res.json();
        const fileName = data.file || data.filename || data.data || "";

        if (fileName) {
          setImageFileName(fileName);
          toast.success("Rasm muvaffaqiyatli yuklandi");
          onSuccess?.(data, {} as any);
        } else {
          throw new Error("Server file nomini qaytarmadi");
        }
      } catch (err) {
        toast.error("Rasm yuklashda xatolik");
        onError?.(err as any);
      }
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !selectedRegion || !address || !phone || !imageFileName) {
      toast.error("Iltimos barcha maydonlarni to'ldiring!");
      return;
    }

    const token = localStorage.getItem("token");
    const cleanedPhone = phone.startsWith("0") ? phone.slice(1) : phone;

    const payload = {
      name,
      regionId: selectedRegion,
      address,
      image: imageFileName,
      majorsId: [1],
      phone: "+998" + cleanedPhone,
    };

    try {
      const res = await fetch("https://findcourse.net.uz/api/centers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Markaz muvaffaqiyatli qo'shildi!");
        setName("");
        setAddress("");
        setPhone("");
        setSelectedRegion(null);
        setImageFileName("");
      } else {
        const data = await res.json();
        toast.error(data.message || "Xatolik yuz berdi");
      }
    } catch {
      toast.error("Server bilan ulanishda xatolik");
    }
  };

  return (
    <div className="my-30 px-20">
      <ToastContainer />
      <div className="flex items-center justify-between">
        <div className="left">
          <img
            src={Ceoimg}
            className="w-110 hover:scale-105 transition duration-2000"
            alt="CEO"
          />
        </div>
        <div className="right">
          <form className="w-200 shadow-xl p-5" onSubmit={handleSubmit}>
            <h1 className="text-center text-4xl text-blue-900 font-bold mb-5">
              O'quv Markaz Yaratish
            </h1>

            <div className="mb-5">
              <h3 className="text-[17px]">Markaz nomi</h3>
              <Input
                placeholder="Markaz nomi"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <h3 className="text-[17px]">Hudud</h3>
              <Select
                placeholder="Hudud tanlang"
                style={{ width: "100%" }}
                onChange={setSelectedRegion}
                value={selectedRegion ?? undefined}
              >
                {regions.map((region) => (
                  <Option key={region.id} value={region.id}>
                    {region.name}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="mb-5">
              <h3 className="text-[17px]">Manzil</h3>
              <Input
                placeholder="Manzil"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <h3 className="text-[17px]">Markaz rasmi</h3>
              <Dragger {...uploadProps}>
                <p className="text-3xl text-gray-400 flex items-center justify-center py-5">
                  <IoImageOutline />
                </p>
                <p className="ant-upload-text">Rasm yuklash uchun bosing</p>
              </Dragger>
              {imageFileName && (
                <p className="text-green-600 mt-2">
                  Yuklangan rasm: {imageFileName}
                </p>
              )}
            </div>

            <div className="mb-5">
              <h3 className="text-[17px]">Telefon raqami</h3>
              <InputNumber
                style={{ width: "100%" }}
                addonBefore="+998"
                value={phone}
                onChange={(val) => setPhone(val?.toString() || "")}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 text-white rounded-[6px] py-2"
            >
              Markaz qo'shish
            </button>
          </form>
          <AddBranch />
        </div>
      </div>
    </div>
  );
};

export default CeoBody;
