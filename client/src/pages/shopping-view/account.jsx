import { motion, AnimatePresence } from "framer-motion";
import Address from "@/components/shopping-view/address";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import Orders from "@/components/shopping-view/order";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  MapPin,
  Sparkles,
  User,
  Settings,
  ShoppingBag,
  Home,
} from "lucide-react";

function ShoppingAccount() {
  // Carousel images for the new image carousel
  const carouselImages = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop",
      title: "Vintage Brass Collection",
      subtitle: "Timeless elegance for your home",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&h=600&fit=crop",
      title: "Handcrafted Wooden Furniture",
      subtitle: "Natural beauty meets craftsmanship",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop",
      title: "Artisanal Ceramic Pieces",
      subtitle: "Unique creations for every space",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=1200&h=600&fit=crop",
      title: "Copper & Metal Accents",
      subtitle: "Sophisticated metallic finishes",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1200&h=600&fit=crop",
      title: "Premium Cutlery & Tableware",
      subtitle: "Elevate your dining experience",
    },
  ];

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col min-h-screen"
      style={{
        width: "100vw",
        overflowX: "hidden",
        backgroundImage:
          "url(https://res.cloudinary.com/dszoqau04/image/upload/v1750145800/bg_ukt5e4.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Hero Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative h-[450px] w-full overflow-hidden"
      >
        {carouselImages.map((item, index) => (
          <img
            key={item.id}
            src={item.image}
            className="h-full w-full object-cover object-center"
          />
        ))}

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            variants={itemVariants}
            className="text-center text-white"
          >
            <Badge
              className="px-4 py-2 text-sm font-medium mb-4"
              style={{
                background: "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                color: "#FFF",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <User className="w-4 h-4 mr-2" />
              My Account
            </Badge>
            <h1
              className="text-4xl md:text-6xl font-bold mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              }}
            >
              <SparklesText
                text="Account Dashboard"
                className="text-4xl md:text-6xl"
              />
            </h1>
            <p
              className="text-xl md:text-2xl max-w-3xl mx-auto"
              style={{
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              Manage your orders, addresses, and account preferences
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-8"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col rounded-2xl border bg-background shadow-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden"
        >
          {/* Enhanced Tabs Header */}
          <div className="relative overflow-hidden">
            <BorderBeam size={300} duration={12} delay={3} />
            <div className="p-6 bg-gradient-to-r from-amber-100 to-orange-100 border-b border-amber-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                <Settings className="w-6 h-6 mr-3 text-amber-600" />
                Account Management
              </h2>
              <p className="text-gray-600">
                Toggle between your orders and address management
              </p>
            </div>
          </div>

          <Tabs defaultValue="orders" className="w-full">
            {/* Enhanced Tabs List */}
            <div className="p-6 pb-0">
              <TabsList className="grid w-full grid-cols-2 h-16 bg-white/80 backdrop-blur-sm border border-amber-200 rounded-xl shadow-lg">
                <TabsTrigger
                  value="orders"
                  className="flex items-center space-x-2 text-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>My Orders</span>
                </TabsTrigger>
                <TabsTrigger
                  value="address"
                  className="flex items-center space-x-2 text-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Home className="w-5 h-5" />
                  <span>My Addresses</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tabs Content with Animations */}
            <div className="p-6 pt-4">
              <AnimatePresence mode="wait">
                <TabsContent value="orders" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <BorderBeam size={250} duration={12} delay={6} />
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-amber-200">
                      <Orders />
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="address" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <BorderBeam size={250} duration={12} delay={9} />
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-amber-200">
                      <Address />
                    </div>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </div>
          </Tabs>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ShoppingAccount;
