// register.jsx
import { Link, useNavigate } from "react-router-dom";
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
        if (data?.payload?.success) {
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
      })
      .catch((err) => {});
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 z-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-shadow-lg/20 text-white">
          Login to your account
          <Separator className="mt-2" />
        </h1>
        <p className="mt-2 italic font-bold text-lg">
          Don't have an account ?
          <Tooltip>
            <TooltipTrigger>
              <Link
                className="font-medium ml-2 underline text-white text-black-900 text-lg hover:text-black"
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
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
