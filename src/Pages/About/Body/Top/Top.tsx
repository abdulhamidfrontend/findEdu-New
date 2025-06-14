import { FaBookmark } from "react-icons/fa";
import AboutTop from "@/assets/aboutimg.png";

const Top = () => {
  return (
    <div className="">
      <div className="title flex items-center py-15 flex-col justify-center">
        <h1 className="text-5xl font-semibold text-blue-950">
          Talabalarni muvaffaqiyatga tayyorlash
        </h1>
        <div className="h-1 w-15 bg-yellow-500 mt-3"></div>
      </div>
      <div className="body flex items-center justify-center gap-[200px]">
        <div className="left flex flex-col gap-5">
          <h1 className="text-[24px] font-semibold">
            Ishonchli va muvaffaqiyatli o'quvchilarni <br /> shakllantirish
          </h1>
          <p className="font-normal text-gray-500">
            Bizning platformamiz talabalarga qiziqishlari, byudjeti <br /> va
            hududiga mos keladigan ta'lim markazlarini topishda yordam <br />
            beradi, eng yaxshi ta'lim tajribasini ta'minlaydi.
          </p>
          <button className="btn">Ko`proq ko`rish</button>
          <div className="p-5 shadow-2xl rounded-[8px] w-fit flex items-start gap-4">
            <div className="icon mt-1">
              <FaBookmark className="text-blue-900" />
            </div>
            <i className="text-blue-900">
              Ushbu platforma mening uchun mukammal o'quv <br /> markazini
              topishni osonlashtirdi. Juda tavsiya etaman!
            </i>
          </div>
        </div>
        <div className="right">
          <img src={AboutTop} className="w-[400px] rounded-xl" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Top;
