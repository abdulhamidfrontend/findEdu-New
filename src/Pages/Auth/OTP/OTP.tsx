import { Form, Input, Button, message, Typography } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Title } = Typography;

type OTPFormValues = {
  otp: string;
};

const Verifyotp = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  const onFinish = async (values: OTPFormValues) => {
    if (!email) {
      message.error("Email topilmadi qayta royxatdan oting.");
      toast.error("Email topilmadi qayta royxatdan oting.");
      return;
    }

    try {
      const response = await axios.post(
        "https://findcourse.net.uz/api/users/verify-otp",
        {
          email: email,
          otp: values.otp,
        }
      );

      const serverMessage = response.data?.message;

      if (serverMessage === "Your account has been successfully verified.") {
        toast.success("Kod tasdiqlandi!");
        localStorage.removeItem("userEmail");
        navigate("/login");
      } else {
        toast.error("OTP noto‘g‘ri yoki boshqa xatolik");
      }
    } catch (error) {
      console.error("Xato:", error);
      message.error("Tasdiqlashda xatolik yuz berdi");
      toast.error("Tasdiqlashda xatolik yuz berdi");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        style={{
          maxWidth: 400,
          width: "100%",
          padding: 20,
          background: "#fff",
          borderRadius: 8,
        }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          OTP ni tasdiqlang
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="otp"
            rules={[{ required: true, message: "Iltimos, OTP kiriting!" }]}
          >
            <Input placeholder="123456" maxLength={6} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Tasdiqlash
            </Button>
          </Form.Item>
        </Form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Verifyotp;
