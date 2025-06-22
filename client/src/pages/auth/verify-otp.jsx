import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import CommonForm from "@/components/common/form";
import { Separator } from "@/components/ui/separator";

const otpFormControls = [
  {
    id: "otp",
    name: "otp",
    label: "Enter OTP",
    type: "text",
    placeholder: "Enter the OTP sent to your email",
    required: true,
  },
];

function VerifyOTP() {
  const [formData, setFormData] = useState({ otp: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  // Add debug log for email
  console.log("Email from location state:", email);

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting OTP verification with email:", email);
    console.log("OTP entered:", formData.otp);

    if (!email) {
      toast.error("Email not found. Please sign up again.", {
        style: {
          backgroundColor: "#b91c1c",
          color: "#fff",
          fontWeight: "bolder",
          fontSize: "15px",
        },
      });
      navigate("/auth/signup");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp: formData.otp,
          }),
        }
      );

      const data = await response.json();
      console.log("OTP verification response:", data);

      if (data.success) {
        toast.success(data.message, {
          style: {
            backgroundColor: "#003300",
            color: "#fff",
            fontWeight: "bolder",
            fontSize: "15px",
          },
        });
        console.log("OTP verification successful, navigating to login");
        navigate("/auth/login");
      } else {
        toast.error(data.message, {
          style: {
            backgroundColor: "#b91c1c",
            color: "#fff",
            fontWeight: "bolder",
            fontSize: "15px",
          },
        });
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Something went wrong", {
        style: {
          backgroundColor: "#b91c1c",
          color: "#fff",
          fontWeight: "bolder",
          fontSize: "15px",
        },
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6 z-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-shadow-lg/20 text-white ">
          Verify Your Email
          <Separator className="mt-2" />
        </h1>
        <p className="mt-2 italic font-semibold text-white text-lg">
          Please enter the OTP sent to your email address
        </p>
      </div>
      <CommonForm
        formControls={otpFormControls}
        buttonText={"Verify OTP"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default VerifyOTP;
