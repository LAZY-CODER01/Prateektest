import { addressFormControls } from "@/config";
import { CommonForm_3 } from "../common/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesText } from "../magicui/sparkles-text";
import { BorderBeam } from "../magicui/border-beam";
import {
  Sparkles,
  MapPin,
  Plus,
  Edit3,
  Trash2,
  Home,
  Building,
  Phone,
  FileText,
} from "lucide-react";
import { Badge } from "../ui/badge";

function Address({ setCurrentSelectedAddress }) {
  const intialAddressFormData = {
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    notes: "",
  };

  const [formData, setFormData] = useState(intialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

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

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(intialAddressFormData);
      toast.success("You can add max 3 addresses.", {
        style: {
          backgroundColor: "#b91c1c",
          color: "#fff",
          fontWeight: "bolder",
          fontSize: "15px",
        },
      });
      return;
    }
    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(intialAddressFormData);
            setIsFormVisible(false);
            toast.success("Address updated Successfully!", {
              style: {
                backgroundColor: "#003300",
                color: "#fff",
                fontWeight: "bolder",
                fontSize: "15px",
              },
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            toast.success("New Address added Successfully!", {
              style: {
                backgroundColor: "#003300",
                color: "#fff",
                fontWeight: "bolder",
                fontSize: "15px",
              },
            });
            setFormData(intialAddressFormData);
            setIsFormVisible(false);
          }
        });
  }

  function handleDeleteAddress(getCurrentAddress) {
    console.log(getCurrentAddress, "Delete Address");

    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast.success("Address is deleted!", {
          style: {
            backgroundColor: "#b91c1c",
            color: "#fff",
            fontWeight: "bolder",
            fontSize: "15px",
          },
        });
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      fullName: getCurrentAddress?.fullName,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      state: getCurrentAddress?.state,
      pincode: getCurrentAddress?.pincode,
      phone: getCurrentAddress?.phone,
      notes: getCurrentAddress?.notes,
    });
    setIsFormVisible(true);
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen relative overflow-x-hidden"
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Enhanced Background Pattern */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 ">
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <Badge
              className="px-4 py-2 text-sm font-medium mb-4"
              style={{
                background: "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                color: "#FFF",
              }}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Manage Your Addresses
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <SparklesText text="Your Addresses" />
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Keep your delivery addresses organized and up to date for seamless
            shopping experience
          </motion.p>
        </motion.div>

        {/* Address Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-6 mb-8">
            <AnimatePresence>
              {addressList && addressList.length > 0 ? (
                addressList.map((singleAddressInfo, index) => (
                  <motion.div
                    key={singleAddressInfo._id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AddressCard
                      handleDeleteAddress={handleDeleteAddress}
                      addressInfo={singleAddressInfo}
                      handleEditAddress={handleEditAddress}
                      setCurrentSelectedAddress={setCurrentSelectedAddress}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="col-span-full text-center py-12"
                >
                  <div className="text-gray-400 mb-4">
                    <MapPin className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg">No addresses found</p>
                    <p className="text-sm">
                      Add your first address to get started
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Add New Address Button */}
          {addressList.length < 3 && (
            <motion.div variants={itemVariants} className="text-center">
              <Button
                onClick={() => {
                  setIsFormVisible(!isFormVisible);
                  setCurrentEditedId(null);
                  setFormData(intialAddressFormData);
                }}
                className="px-8 py-3 text-lg font-medium"
                style={{
                  background:
                    "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                  color: "#FFF",
                  border: "none",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Address
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Form Section */}
        <AnimatePresence>
          {isFormVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <Card className="relative overflow-hidden">
                <BorderBeam size={250} duration={12} delay={9} />
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">
                    {currentEditedId !== null ? (
                      <span className="flex items-center justify-center">
                        <Edit3 className="w-6 h-6 mr-2" />
                        Edit Address
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Plus className="w-6 h-6 mr-2" />
                        Add New Address
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CommonForm_3
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={
                      currentEditedId !== null
                        ? "Update Address"
                        : "Add Address"
                    }
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              variants={itemVariants}
              className="text-center p-6 rounded-lg bg-white/80 backdrop-blur-sm border border-amber-200"
            >
              <Home className="w-8 h-8 mx-auto mb-2 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Total Addresses
              </h3>
              <p className="text-2xl font-bold text-amber-600">
                {addressList?.length || 0}/3
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="text-center p-6 rounded-lg bg-white/80 backdrop-blur-sm border border-amber-200"
            >
              <Building className="w-8 h-8 mx-auto mb-2 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-800">Cities</h3>
              <p className="text-2xl font-bold text-amber-600">
                {new Set(addressList?.map((addr) => addr.city)).size || 0}
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="text-center p-6 rounded-lg bg-white/80 backdrop-blur-sm border border-amber-200"
            >
              <Phone className="w-8 h-8 mx-auto mb-2 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Phone Numbers
              </h3>
              <p className="text-2xl font-bold text-amber-600">
                {addressList?.length || 0}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Address;
