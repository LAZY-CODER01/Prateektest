import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Sparkles,
  Award,
  Users,
  ShoppingBag,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { SparklesText } from "../magicui/sparkles-text";

function DesktopOnly({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent
        );
      const isSmallScreen = window.innerWidth < 768;

      setIsMobile(isMobileDevice || isSmallScreen);
      setIsLoading(false);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="text-center">
          <motion.div
            className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-600 mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="text-2xl font-bold text-amber-800"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading...
          </motion.p>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen relative overflow-hidden"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Enhanced Background Pattern */}
        <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
          {/* Geometric Pattern */}
          <div className="absolute inset-0 opacity-30">
            {/* Corner borders */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-amber-600"></div>
            <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-amber-600"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-amber-600"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-amber-600"></div>

            {/* Floating circles */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-gradient-to-r from-amber-300 to-orange-300 opacity-40"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-3/4 right-1/4 w-8 h-8 rounded-full bg-gradient-to-r from-orange-300 to-red-300 opacity-40"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/3 w-16 h-16 rounded-full bg-gradient-to-r from-yellow-300 to-amber-300 opacity-40"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.5, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />

            {/* Diagonal lines */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-30"></div>
              <div className="absolute top-1/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-30"></div>
              <div className="absolute top-2/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-30"></div>
            </div>

            {/* Decorative circles */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-amber-300 opacity-20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-orange-300 opacity-30 rounded-full"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 mb-6">
                <Sparkles className="w-5 h-5 mr-2 text-amber-600" />
                <span className="text-amber-800 font-semibold">
                  Desktop Experience Required
                </span>
              </div>
            </motion.div>

            {/* Icons Section */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="flex justify-center items-center gap-8 mb-8">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                    <Monitor className="w-12 h-12 text-white" />
                  </div>
                  {/* <BorderBeam size={120} duration={12} delay={9} /> */}
                </motion.div>

                <motion.div
                  className="text-4xl font-bold text-amber-600"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  →
                </motion.div>

                <motion.div
                  className="relative opacity-50"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
                    <Smartphone className="w-10 h-10 text-white" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Title Section */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1
                className="text-5xl md:text-7xl font-bold mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  background:
                    "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <SparklesText text="Desktop Only" className="block" />
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Experience the full beauty of Mudrika International on a larger
                screen
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-amber-200 shadow-lg"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Enhanced Experience
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    Full-featured navigation and product browsing optimized for
                    desktop
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-amber-200 shadow-lg"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mr-4">
                      <ShoppingBag className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Seamless Shopping
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    Optimized checkout process with better product visualization
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-amber-200 shadow-lg"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mr-4">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Premium Features
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    Access to complete admin panel and advanced functionality
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-amber-200 shadow-lg"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mr-4">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Better Performance
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    Faster loading times and smoother interactions on desktop
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Ready to Experience Premium Shopping?
                </h2>
                <p className="text-amber-100 mb-6">
                  Switch to your desktop or laptop to explore our complete
                  collection of handcrafted treasures
                </p>
                <motion.button
                  className="inline-flex items-center px-8 py-4 bg-white text-amber-800 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Open on Desktop</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-amber-200">
                <Sparkles className="w-4 h-4 mr-2 text-amber-600" />
                <span className="text-gray-700 font-medium">
                  Mudrika International
                </span>
              </div>
              <p className="text-gray-500 mt-4 text-sm">
                Thank you for understanding our commitment to quality experience
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return children;
}

export default DesktopOnly;
