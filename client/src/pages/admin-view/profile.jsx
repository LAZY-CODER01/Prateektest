import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Pencil, Save, X, Phone, CheckCircle2 } from "lucide-react";
import { setUser } from "@/store/auth-slice";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authFirebase } from "@/lib/firebase";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

function AdminProfile() {
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: user?.userName || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize reCAPTCHA when component mounts
    if (typeof window !== "undefined") {
      window.recaptchaVerifier = new RecaptchaVerifier(
        authFirebase,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
        }
      );
    }
  }, []);

  const handleVerifyPhone = async () => {
    try {
      setIsVerifying(true);
      const phoneNumber = user?.phoneNumber;
      if (!phoneNumber) {
        toast.error("Please add a phone number first", {
          style: {
            backgroundColor: "#b91c1c",
            color: "#fff",
            fontWeight: "bolder",
            fontSize: "15px",
          },
        });
        return;
      }

      // Validate phone number format
      if (!/^\d{10}$/.test(phoneNumber)) {
        toast.error("Please enter a valid 10-digit phone number", {
          style: {
            backgroundColor: "#b91c1c",
            color: "#fff",
            fontWeight: "bolder",
            fontSize: "15px",
          },
        });
        return;
      }

      const formattedPhone = `+91${phoneNumber}`; // Assuming Indian numbers

      // Check if reCAPTCHA is initialized
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          authFirebase,
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
            },
          }
        );
      }

      const appVerifier = window.recaptchaVerifier;

      try {
        const confirmation = await signInWithPhoneNumber(
          authFirebase,
          formattedPhone,
          appVerifier
        );
        setConfirmationResult(confirmation);
        setShowOtpInput(true);
        toast.success("OTP sent successfully", {
          style: {
            backgroundColor: "#003300",
            color: "#fff",
            fontWeight: "bolder",
            fontSize: "15px",
          },
        });
      } catch (error) {
        console.error("Firebase error:", error);
        let errorMessage = "Error sending OTP. Please try again.";

        switch (error.code) {
          case "auth/invalid-phone-number":
            errorMessage = "Invalid phone number format";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many attempts. Please try again later";
            break;
          case "auth/quota-exceeded":
            errorMessage = "SMS quota exceeded. Please try again later";
            break;
          case "auth/captcha-check-failed":
            errorMessage =
              "reCAPTCHA verification failed. Please refresh and try again";
            break;
          case "auth/billing-not-enabled":
            errorMessage =
              "Phone authentication is not properly configured. Please contact support.";
            break;
          default:
            errorMessage =
              error.message || "Error sending OTP. Please try again.";
        }

        toast.error(errorMessage, {
          style: {
            backgroundColor: "#b91c1c",
            color: "#fff",
            fontWeight: "bolder",
            fontSize: "15px",
          },
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("An unexpected error occurred. Please try again.", {
        style: {
          backgroundColor: "#b91c1c",
          color: "#fff",
          fontWeight: "bolder",
          fontSize: "15px",
        },
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!confirmationResult) {
      toast.error("Please request OTP first", {
        style: {
          backgroundColor: "#b91c1c",
          color: "#fff",
          fontWeight: "bolder",
          fontSize: "15px",
        },
      });
      return;
    }

    try {
      setIsVerifying(true);
      const result = await confirmationResult.confirm(otp);
      if (result.user) {
        // Update user's phone verification status in your backend
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/auth/verify-phone`,
          { phoneNumber: user.phoneNumber },
          { withCredentials: true }
        );

        if (response.data.success) {
          toast.success("Phone number verified successfully", {
            style: {
              backgroundColor: "#003300",
              color: "#fff",
              fontWeight: "bolder",
              fontSize: "15px",
            },
          });
          dispatch(setUser(response.data.user));

          setShowOtpInput(false);
          setOtp("");
          setConfirmationResult(null);
        }
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      if (error.code === "auth/invalid-verification-code") {
        toast.error("Invalid OTP. Please try again.", {
          style: {
            backgroundColor: "#b91c1c",
            color: "#fff",
            fontWeight: "bolder",
            fontSize: "15px",
          },
        });
      } else {
        toast.error(error.message || "Error verifying OTP", {
          style: {
            backgroundColor: "#b91c1c",
            color: "#fff",
            fontWeight: "bolder",
            fontSize: "15px",
          },
        });
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        "http://localhost:5000/api/auth/update-profile",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message, {
          style: {
            backgroundColor: "#003300", // light red
            color: "#fff",
            fontWeight: "bolder", // dark red text
            fontSize: "15px",
          },
        });
        setIsEditing(false);
        // Update Redux store with new user data
        dispatch(setUser(response.data.user));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile", {
        style: {
          backgroundColor: "#b91c1c", // light red
          color: "#fff",
          fontWeight: "bolder", // dark red text
          fontSize: "15px",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-center text-primary mb-8 profileHeading">
        Welcome to  Mudrika International<Separator className="w-1/4 bg-primary" />
      </h1>

      <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="border-b pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl text-center">Your Profile</CardTitle>
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2"
              >
                <Pencil className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium">
              Username
            </Label>
            <Input
              id="username"
              name="userName"
              value={
                isEditing ? formData.userName : user?.userName || "Not set"
              }
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`text-black ${!isEditing ? "bg-muted" : ""}`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              value={user?.email || "Not set"}
              disabled={true}
              className="bg-muted text-black"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Label htmlFor="phoneNumber" className="text-sm font-medium">
                  Phone Number
                </Label>
                {user?.isPhoneVerified && (
                  <Tooltip>
                    <TooltipTrigger>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Verified</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              {user?.phoneNumber && !user?.isPhoneVerified && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleVerifyPhone}
                  disabled={isVerifying || user?.isPhoneVerified}
                  className="flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  {isVerifying ? "Sending..." : "Verify Phone"}
                </Button>
              )}
            </div>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={user?.phoneNumber || "Not set"}
              disabled={true}
              className="bg-muted text-black"
            />
            {showOtpInput && (
              <div className="mt-2 space-y-2">
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="text-black"
                />
                <Button
                  onClick={handleVerifyOtp}
                  disabled={isVerifying}
                  className="w-full"
                >
                  {isVerifying ? "Verifying..." : "Verify OTP"}
                </Button>
              </div>
            )}
          </div>

          {isEditing && (
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleUpdateProfile}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  "Updating..."
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default AdminProfile;
