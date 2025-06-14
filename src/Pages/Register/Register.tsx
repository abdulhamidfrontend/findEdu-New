"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import LoginImg from "../../assets/Login.png";
import LoginImgBottom from "../../assets/LoginImgBottom.png";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Components/ui/select";

export default function CreateAccountForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "USER",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phoneNumber,
      password: formData.password,
      role: formData.role,
      image: "image.jpg",
    };

    try {
      const res = await fetch("https://findcourse.net.uz/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log("Registration response:", result);

      if (res.ok) {
        try {
          console.log("Sending OTP to email:", formData.email);
          const otpRes = await fetch(
            "https://findcourse.net.uz/api/users/send-otp",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
              },
              body: JSON.stringify({
                email: formData.email,
                phone: formData.phoneNumber,
              }),
            }
          );

          const otpResult = await otpRes.json();
          console.log("OTP send response:", otpResult);

          if (otpRes.ok) {
            localStorage.setItem("userEmail", formData.email);
            alert("Ro'yxatdan o'tish muvaffaqiyatli! OTP kodini tekshiring.");
            navigate("/otp");
          } else {
            alert(otpResult.message || "OTP yuborishda xatolik yuz berdi");
            console.error("OTP send error:", otpResult);
          }
        } catch (otpErr) {
          console.error("OTP send error:", otpErr);
          alert(
            "OTP yuborishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring."
          );
        }
      } else {
        alert(result.message || "Xatolik yuz berdi");
        console.error("Registration error:", result);
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Tarmoq xatosi yoki server bilan aloqa yo'q");
    }
  };

  return (
    <div className="h-[100vh] relative  w-full bg-[#f1eaf8] flex items-center  justify-evenly">
      <Link className="inline" to={"/"}>
        <h1 className="absolute top-5 left-10 font-bold text-4xl text-blue-950">
          LOGO
        </h1>
      </Link>
      <div className="w-150 rounded shadow max-w-2xl  p-6 bg-white">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">
          Create Account
        </h1>
        <div className="right">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
              <Input
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
            </div>

            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />

            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <Input
              name="phoneNumber"
              type="tel"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />

            <Select value={formData.role} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">USER</SelectItem>
                <SelectItem value="CEO">CEO</SelectItem>
              </SelectContent>
            </Select>

            <input
              type="file"
              disabled
              className="cursor-not-allowed w-full px-4 py-3 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700"
            />

            <Button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-md font-medium text-lg"
            >
              Create Account
            </Button>

            <div className="text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="left w-105">
        <h1 className="text-[40px] text-center mb-20 font-bold text-blue-950">
          Welcome to the page!
        </h1>
        <div className="flex flex-col items-center justify-center">
          <img
            className="mb-[-40px] hover:-translate-y-2 transition duration-500 z-50"
            src={LoginImg}
            alt="login"
          />
          <img className="w-90" src={LoginImgBottom} alt="background" />
        </div>
      </div>
    </div>
  );
}
