import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import {
  MapPin,
  Edit3,
  Trash2,
  Home,
  Building,
  Phone,
  FileText,
  User,
} from "lucide-react";
import { Badge } from "../ui/badge";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
}) {
  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <Card
        onClick={
          setCurrentSelectedAddress
            ? () => setCurrentSelectedAddress(addressInfo)
            : null
        }
        className="relative overflow-hidden group bg-white/90 backdrop-blur-sm border border-amber-200 hover:border-amber-300 transition-all duration-300"
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-amber-400 opacity-60"></div>

        <CardContent className="relative z-10 p-6">
          {/* Header with icon */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100">
                <MapPin className="w-5 h-5 text-amber-600" />
              </div>
              <Badge
                className="px-2 py-1 text-xs"
                style={{
                  background:
                    "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                  color: "#FFF",
                }}
              >
                Address
              </Badge>
            </div>
          </div>

          {/* Address Details */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <User className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Full Name
                </Label>
                <p className="text-gray-800 font-medium">
                  {addressInfo?.fullName}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Home className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Address
                </Label>
                <p className="text-gray-800 font-medium">
                  {addressInfo?.address}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Building className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <Label className="text-sm font-medium text-gray-600">
                  City & State
                </Label>
                <p className="text-gray-800 font-medium">
                  {addressInfo?.city}, {addressInfo?.state}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Pincode
                </Label>
                <p className="text-gray-800 font-medium">
                  {addressInfo?.pincode}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Phone className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Phone
                </Label>
                <p className="text-gray-800 font-medium">
                  {addressInfo?.phone}
                </p>
              </div>
            </div>

            {addressInfo?.notes && (
              <div className="flex items-start space-x-3">
                <FileText className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Notes
                  </Label>
                  <p className="text-gray-800 font-medium">
                    {addressInfo?.notes}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="relative z-10 flex justify-between p-4 pt-0">
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              onClick={() => handleEditAddress(addressInfo)}
              className="px-4 py-2 text-sm font-medium"
              style={{
                background: "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                color: "#FFF",
                border: "none",
              }}
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              onClick={() => handleDeleteAddress(addressInfo)}
              variant="outline"
              className="px-4 py-2 text-sm font-medium border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default AddressCard;
