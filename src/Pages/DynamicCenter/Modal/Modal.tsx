import React, { useState } from "react";
import { Modal, Select, DatePicker, TimePicker, message } from "antd";
import { Dayjs } from "dayjs";

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

interface Center {
  id: number;
  name: string;
  address: string;
  phone: string;
  image: string;
  filials: Filial[];
}

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  center: Center | null;
}

const ReceptionModal: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  center,
}) => {
  const [selectedFilial, setSelectedFilial] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleSubmitReception = async () => {
    if (!selectedFilial || !selectedCourse || !selectedDate || !selectedTime) {
      message.error("Barcha maydonlarni to'ldiring");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Token topilmadi. Iltimos, qayta login qiling.");
        return;
      }

      const visitDate = `${selectedDate} ${selectedTime}`;

      const response = await fetch("https://findcourse.net.uz/api/reseption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          filialId: selectedFilial,
          centerId: center?.id,
          majorId: selectedCourse,
          visitDate: visitDate,
        }),
      });

      if (response.ok) {
        message.success("Muvaffaqiyatli ro'yxatdan o'tdingiz");
        setIsModalOpen(false);
        setSelectedFilial("");
        setSelectedCourse("");
        setSelectedDate("");
        setSelectedTime("");
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "Xatolik yuz berdi");
      }
    } catch (error) {
      console.error(error);
      message.error("Server bilan muammo");
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      closable={false}
      centered
      className="custom-modal"
    >
      <div className="bg-purple-800  rounded-t-2xl px-6 py-4 relative">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-purple-300"
        >
          &times;
        </button>
        <h2 className="text-white text-xl font-bold">Darsga yozilish</h2>
        <p className="text-purple-100 text-sm">
          O'zingizga qulay sana va vaqtni tanlang
        </p>
      </div>

      <div className="flex flex-col rounded-b-2xl bg-white gap-4 px-6 py-6">
        <div>
          <label className="block text-gray-700 mb-1">Filialni tanlang</label>
          <Select
            className="w-full rounded-lg"
            placeholder="Filialni tanlang"
            onChange={(value: string) => setSelectedFilial(value)}
            value={selectedFilial || undefined}
          >
            {center?.filials.map((filial) => (
              <Select.Option key={filial.id} value={filial.id.toString()}>
                {filial.name}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">
            Yo'nalishni tanlang
          </label>
          <Select
            className="w-full rounded-lg"
            placeholder="Kursni tanlang"
            onChange={(value: string) => setSelectedCourse(value)}
            value={selectedCourse || undefined}
          >
            <Select.Option value="1">optional</Select.Option>
          </Select>
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-gray-700 mb-1">Sanani tanlang</label>
            <DatePicker
              className="w-full rounded-lg"
              format="YYYY-MM-DD"
              onChange={(date, dateString) => {
                if (typeof dateString === "string") setSelectedDate(dateString);
              }}
              value={
                selectedDate ? (window as any).dayjs?.(selectedDate) : undefined
              }
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 mb-1">Vaqtni tanlang</label>
            <TimePicker
              className="w-full rounded-lg"
              format="HH:mm"
              onChange={(time, timeString) => {
                if (typeof timeString === "string") setSelectedTime(timeString);
              }}
              value={
                selectedTime
                  ? (window as any).dayjs?.(selectedTime, "HH:mm")
                  : undefined
              }
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3.5 mt-6">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 bg-white hover:bg-purple-50"
          >
            Bekor qilish
          </button>
          <button
            type="button"
            onClick={handleSubmitReception}
            className="px-4 py-2 rounded-lg bg-purple-800 text-white hover:bg-purple-900"
          >
            Confirm Registration
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReceptionModal;
