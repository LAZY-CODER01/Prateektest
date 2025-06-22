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
import { motion } from "framer-motion";

function UserProfile() {
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
    if (typeof window !== "undefined") {
      window.recaptchaVerifier = new RecaptchaVerifier(
        authFirebase,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {},
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
      const formattedPhone = `+91${phoneNumber}`;
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          authFirebase,
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {},
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
        `${import.meta.env.VITE_API_URL}/api/auth/update-profile`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message, {
          style: {
            backgroundColor: "#003300",
            color: "#fff",
            fontWeight: "bolder",
            fontSize: "15px",
          },
        });
        setIsEditing(false);
        dispatch(setUser(response.data.user));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile", {
        style: {
          backgroundColor: "#b91c1c",
          color: "#fff",
          fontWeight: "bolder",
          fontSize: "15px",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen relative overflow-x-hidden"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Background Gradient and Geometric Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 -z-10">
        <div className="absolute inset-0 opacity-30">
          {/* Corner borders */}
          <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-amber-600"></div>
          <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-amber-600"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-amber-600"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-amber-600"></div>
          {/* Floating circles */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-gradient-to-r from-amber-300 to-orange-300 opacity-40"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className="absolute top-3/4 right-1/4 w-8 h-8 rounded-full bg-gradient-to-r from-orange-300 to-red-300 opacity-40"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          ></motion.div>
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-16 h-16 rounded-full bg-gradient-to-r from-yellow-300 to-amber-300 opacity-40"
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.5, 0.4] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          ></motion.div>
        </div>
      </div>
      <div className="container mx-auto py-16 max-w-2xl relative z-10">
        <h1
          className="text-4xl md:text-5xl font-bold text-center mb-8"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#5e4b3c",
            textShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          Welcome to Mudrika International
          <Separator className="w-1/4 bg-amber-400 mx-auto mt-2" />
        </h1>
        <Card
          className="w-full shadow-2xl hover:shadow-amber-200 transition-shadow duration-300 border-2"
          style={{
            background: "rgba(255,255,255,0.95)",
            borderColor: "#d4a373",
          }}
        >
          <CardHeader className="border-b pb-4">
            <div className="flex justify-between items-center">
              <CardTitle
                className="text-2xl text-center"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#5e4b3c",
                }}
              >
                Your Profile
              </CardTitle>
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 border-amber-400 text-[#5e4b3c] hover:bg-amber-50"
                  style={{ borderColor: "#d4a373" }}
                >
                  <Pencil className="h-4 w-4" />
                  Edit Profile
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 text-[#b91c1c] hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium"
                style={{ color: "#5e4b3c" }}
              >
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
                style={{
                  background: !isEditing ? "#f8f5f2" : "#fff",
                  borderColor: "#d4a373",
                }}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium"
                style={{ color: "#5e4b3c" }}
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={user?.email || "Not set"}
                disabled={true}
                className="bg-muted text-black"
                style={{ background: "#f8f5f2", borderColor: "#d4a373" }}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="phoneNumber"
                    className="text-sm font-medium"
                    style={{ color: "#5e4b3c" }}
                  >
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
                    className="flex items-center gap-2 border-amber-400 text-[#5e4b3c] hover:bg-amber-50"
                    style={{ borderColor: "#d4a373" }}
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
                style={{ background: "#f8f5f2", borderColor: "#d4a373" }}
              />
              {showOtpInput && (
                <div className="mt-2 space-y-2">
                  <Input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="text-black"
                    style={{ borderColor: "#d4a373" }}
                  />
                  <Button
                    onClick={handleVerifyOtp}
                    disabled={isVerifying}
                    className="w-full bg-gradient-to-r from-amber-400 to-orange-400 text-white font-semibold shadow-md hover:scale-105 transition-transform"
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
                  className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-semibold shadow-md hover:scale-105 transition-transform"
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
    </motion.div>
  );
}

export default UserProfile;
