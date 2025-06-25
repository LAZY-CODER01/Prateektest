// register.jsx
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { signupFormControls } from "@/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "@/store/auth-slice";
// import { useSonner } from "sonner";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthSignUp() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const toast = useSonner();

  function onSubmit(event) {
    event.preventDefault();
    console.log("Submitting signup form with data:", formData);
    dispatch(signupUser(formData)).then((data) => {
      console.log("Signup response:", data);
      if (data?.payload?.success) {
        console.log("Navigating to verify-otp with email:", formData.email);
        navigate("/auth/verify-otp", {
          state: {
            email: formData.email,
          },
          replace: true, // Add replace to prevent back navigation
        });
        toast.success(data?.payload?.message, {
          style: {
            backgroundColor: "#003300", // light red
            color: "#fff",
            fontWeight: "bolder", // dark red text
            fontSize: "15px",
          },
        });
      } else {
        toast.error(data?.payload?.message, {
          style: {
            backgroundColor: "#b91c1c", // light red
            color: "#fff",
            fontWeight: "bolder", // dark red text
            fontSize: "15px",
          },
        });
      }
    });
  }

  // console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6 z-50">
      <div className="text-center">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-shadow-lg/20 text-white">
          Create new account
          <Separator className="mt-2" />
        </h1>
        <p className="mt-2 italic font-bold text-lg  ">
          Already have an account ?
          <Tooltip>
            <TooltipTrigger>
              <Link
                className="font-medium ml-2 underline text-white text-black-900 text-lg hover:text-black"
                to="/auth/login"
              >
                Login
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Login your account!</p>
            </TooltipContent>
          </Tooltip>
        </p>
      </div>
      <CommonForm
        formControls={signupFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthSignUp;
