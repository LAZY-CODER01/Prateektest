 // register.jsx
import { Link } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
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

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData))
      .then((data) => {
        const isSuccess = data?.payload?.success;
        const msg = data?.payload?.message;

        toast[isSuccess ? "success" : "error"](msg, {
          style: {
            backgroundColor: isSuccess ? "#003300" : "#b91c1c",
            color: "#fff",
            fontWeight: "bolder",
            fontSize: "15px",
          },
        });
      })
      .catch(() => {});
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-8 sm:px-6 md:px-8 lg:px-10 z-50">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Login to your account
        </h1>
        <Separator className="mt-2" />
        <p className="mt-2 italic font-bold text-base sm:text-lg text-white">
          Don't have an account?
          <Tooltip>
            <TooltipTrigger>
              <Link
                className="font-medium ml-2 underline text-white hover:text-black"
                to="/auth/signup"
              >
                Sign up
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>SignUp your account!</p>
            </TooltipContent>
          </Tooltip>
        </p>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Login"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default AuthLogin;
