import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";

const OTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Verifying OTP:", otp);
      const res = await fetch(
        "https://findcourse.net.uz/api/users/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          body: JSON.stringify({
            otp,
            email: localStorage.getItem("userEmail"), // Get email from localStorage
          }),
        }
      );

      const data = await res.json();
      console.log("OTP verification response:", data);

      if (res.ok) {
        if (data.accessToken) {
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
        }
        alert("OTP tasdiqlandi! Muvaffaqiyatli ro'yxatdan o'tdingiz.");
        navigate("/"); // Redirect to home page after successful verification
      } else {
        setError(data.message || "OTP tasdiqlashda xatolik yuz berdi");
        console.error("OTP verification error:", data);
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setError("Server xatosi yuz berdi. Iltimos, qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] relative w-full bg-[#f1eaf8] flex items-center justify-center">
      <div className="w-150 rounded shadow max-w-md p-6 bg-white">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">
          OTP Tasdiqlash
        </h1>
        <form onSubmit={handleVerifyOTP} className="space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div>
            <Input
              type="text"
              placeholder="OTP kodini kiriting"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              maxLength={6}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-md font-medium text-lg"
          >
            {loading ? "Tekshirilmoqda..." : "Tasdiqlash"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OTP;
