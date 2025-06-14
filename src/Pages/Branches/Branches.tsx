import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import { CiMap } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlinePhone } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";

interface Region {
  id: number;
  name: string;
}

interface Center {
  id: number;
  name: string;
  phone: string;
  address: string;
  image: string;
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
  center: Center;
  region: Region;
}

const Branches = () => {
  const { id } = useParams<{ id: string }>();
  const [filial, setFilial] = useState<Filial | null>(null);

  useEffect(() => {
    const fetchFilial = async () => {
      try {
        const res = await fetch(`https://findcourse.net.uz/api/filials/${id}`);
        const data = await res.json();
        setFilial(data.data);
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };

    fetchFilial();
  }, [id]);

  if (!filial) {
    return <p>Yuklanmoqda...</p>;
  }

  return (
    <div className="w-full m-auto">
      <div className="shadow-xl fixed top-0 left-0 w-full z-50 bg-white">
        <div className="max-w-[95%] mx-auto">
          <Navbar />
        </div>
      </div>

      <div className="mt-32 mb-5 flex items-center justify-center">
        <div className="shadow-xl w-203 rounded-[8px] p-5">
          <Link
            className="flex gap-2 text-violet-500 items-center"
            to={`/center/${filial.centerId}`}
          >
            <FaArrowLeft />
            Markazga qaytish
          </Link>

          <div className="w-full flex items-center justify-center my-3">
            <img
              src={`https://findcourse.net.uz/api/image/${filial.image}`}
              alt={filial.name}
              className="rounded-lg w-[400px]"
            />
          </div>

          <h1 className="text-2xl font-bold my-5">{filial.name}</h1>

          <div className="flex flex-col gap-3">
            <p className="flex gap-2 items-center">
              <CiMap className="text-2xl text-violet-600" />
              <span className="text-[16px]">{filial.region.name}</span>
            </p>

            <div className="flex items-start gap-2">
              <IoLocationOutline className="text-2xl text-violet-600" />
              <div>
                <p className="text-[16px] font-normal">Manzil</p>
                <h3 className="text-[16px] font-normal">{filial.address}</h3>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <HiOutlinePhone className="text-2xl text-violet-600" />
              <div>
                <p className="text-[16px] font-normal">Telefon</p>
                <a
                  href={`tel:${filial.phone}`}
                  className="text-[16px] font-normal text-violet-600 hover:underline"
                >
                  {filial.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Branches;
