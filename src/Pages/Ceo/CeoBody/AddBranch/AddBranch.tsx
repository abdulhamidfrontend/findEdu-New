import React, { useEffect, useState } from "react";
import { Input, Select, Upload, InputNumber } from "antd";
import { IoImageOutline } from "react-icons/io5";
import type { UploadProps } from "antd";
import type { RcFile } from "antd/es/upload/interface";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Option } = Select;
const { Dragger } = Upload;

interface Center {
  id: number;
  name: string;
}

interface Region {
  id: number;
  name: string;
}

const AddBranch: React.FC = () => {
  const [centers, setCenters] = useState<Center[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);

  const [selectedCenterId, setSelectedCenterId] = useState<number | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [customName, setCustomName] = useState<string>("");
  const [useCustomName, setUseCustomName] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [imageFileName, setImageFileName] = useState<string>("");

  useEffect(() => {
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
        setCenters(data.data);
      } catch {
        toast.error("Markazlarni olishda xatolik");
      }
    };

    const fetchRegions = async () => {
      try {
        const res = await fetch("https://findcourse.net.uz/api/regions/search");
        const data = await res.json();
        setRegions(data.data);
      } catch {
        toast.error("Hududlarni olishda xatolik");
      }
    };

    fetchCenters();
    fetchRegions();
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
        const fileName: string = data.file || data.filename || data.data || "";

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

  const handleSubmitBranch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !selectedCenterId ||
      !selectedRegion ||
      !address ||
      !phone ||
      !imageFileName
    ) {
      toast.error("Iltimos barcha maydonlarni to'ldiring!");
      return;
    }

    const token = localStorage.getItem("token");
    const cleanedPhone = phone.startsWith("0") ? phone.slice(1) : phone;

    const centerName =
      centers.find((c) => c.id === selectedCenterId)?.name || "";
    const regionName = regions.find((r) => r.id === selectedRegion)?.name || "";

    const autoBranchName = `${centerName} - ${regionName} branch`;
    const branchName = useCustomName ? customName : autoBranchName;

    const payload = {
      name: branchName,
      regionId: selectedRegion,
      address,
      image: imageFileName,

      phone: "+998" + cleanedPhone,
      centerId: selectedCenterId,
    };

    try {
      const res = await fetch("https://findcourse.net.uz/api/filials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Filial muvaffaqiyatli qo'shildi!");
        resetForm();
      } else {
        const data = await res.json();
        toast.error(data.message || "Xatolik yuz berdi");
      }
    } catch {
      toast.error("Server bilan ulanishda xatolik");
    }
  };

  const resetForm = () => {
    setSelectedCenterId(null);
    setSelectedRegion(null);
    setCustomName("");
    setUseCustomName(false);
    setAddress("");
    setPhone("");
    setImageFileName("");
  };

  return (
    <div>
      <ToastContainer />
      <form className="w-200 shadow-xl p-5" onSubmit={handleSubmitBranch}>
        <h1 className="text-center text-4xl text-blue-900 font-bold mb-5">
          Branch
        </h1>

        <div className="mb-5">
          <h3 className="text-[17px]">Markazni tanlang</h3>
          <Select
            placeholder="Markaz tanlang"
            style={{ width: "100%" }}
            onChange={(val: number) => setSelectedCenterId(val)}
            value={selectedCenterId ?? undefined}
          >
            {centers.map((center) => (
              <Option key={center.id} value={center.id}>
                {center.name}
              </Option>
            ))}
          </Select>
        </div>

        <div className="mb-5">
          <h3 className="text-[17px]">Filial nomi</h3>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={useCustomName}
              onChange={(e) => setUseCustomName(e.target.checked)}
              className="mr-2"
            />
            <span>Filial nomini qo'lda kiritish</span>
          </div>
          <Input
            placeholder="Filial nomi"
            value={
              useCustomName
                ? customName
                : selectedCenterId && selectedRegion
                ? `${centers.find((c) => c.id === selectedCenterId)?.name} - ${
                    regions.find((r) => r.id === selectedRegion)?.name
                  } branch`
                : ""
            }
            onChange={(e) => setCustomName(e.target.value)}
            disabled={!useCustomName}
          />
        </div>

        <div className="mb-5">
          <h3 className="text-[17px]">Hudud</h3>
          <Select
            placeholder="Select Region"
            style={{ width: "100%" }}
            onChange={(val: number) => setSelectedRegion(val)}
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
          <h3 className="text-[17px]">Telefon raqami</h3>
          <InputNumber
            style={{ width: "100%" }}
            addonBefore="+998"
            value={phone}
            onChange={(val) => setPhone(val?.toString() || "")}
          />
        </div>

        <div className="mb-5">
          <h3 className="text-[17px]">Filial rasmi</h3>
          <Dragger {...uploadProps}>
            <p className="text-3xl text-gray-400 flex items-center justify-center py-5">
              <IoImageOutline />
            </p>
            <p className="ant-upload-text">
              Rasmni yuklash uchun bosing yoki sudrab keling
            </p>
            <p className="text-gray-500 text-xs">PNG, JPG 5MB gacha</p>
          </Dragger>
          {imageFileName && (
            <p className="text-green-600 mt-2">
              Yuklangan rasm: {imageFileName}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 text-white rounded-[6px] py-2"
        >
          Branch qo'shish
        </button>
        <div>
          <h1>Sizning filiallariz</h1>
        </div>
      </form>
    </div>
  );
};

export default AddBranch;
