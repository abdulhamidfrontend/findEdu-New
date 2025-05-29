import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImg from "../../assets/Login.png";
import LoginImgBottom from "../../assets/LoginImgBottom.png";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("https://findcourse.net.uz/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Login successful!");
        console.log("Token:", data.accessToken);
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        navigate("/");
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      setError("Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] overflow-y-hidden w-full bg-[#f1eaf8]">
      <div className="max-w-[95%] m-auto">
        <div className="flex items-center gap-35 justify-center h-[100vh]">
          <div className="left w-105">
            <h1 className="text-[40px] text-center mb-20 font-bold text-blue-950">
              Welcome Back!
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

          <div className="right">
            <form
              onSubmit={handleLogin}
              className="bg-white flex flex-col gap-4 w-170 h-fit p-10 rounded shadow"
            >
              <h1 className="text-center font-bold text-4xl text-blue-950 mb-5">
                Login
              </h1>

              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-600">{success}</p>}

              <input
                className="outline p-3 text-[14px] focus:shadow-[0_0px_1px_3px_rgba(57,57,172,1)] transition duration-300 outline-gray-200 h-10 rounded w-full"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="outline p-3 text-[14px] focus:shadow-[0_0px_1px_3px_rgba(57,57,172,1)] transition duration-300 outline-gray-200 h-10 rounded w-full"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full border bg-blue-950 hover:bg-blue-900 transition duration-300 text-white py-3 rounded-[6px]"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="text-center">
                <h1 className="mb-5">
                  Don't have an account?{" "}
                  <Link className="text-blue-600" to={"/register"}>
                    Register
                  </Link>
                </h1>
                <Link to={"/"}>
                  <h1 className="underline">Forgot Password?</h1>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
