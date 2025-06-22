import { motion } from "framer-motion";
import { Sparkles, Gift, Star, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Confetti } from "../../components/magicui/confetti";

function RegaloPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      <Confetti className="absolute left-0 top-0 z-0 size-full"/>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-amber-200/30 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 bg-orange-200/20 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-red-200/25 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Premium Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Crown className="w-8 h-8 text-amber-600" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Regalo
            </h1>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Crown className="w-8 h-8 text-amber-600" />
            </motion.div>
          </div>
          <p className="text-lg md:text-xl text-gray-600 font-medium">
            Premium Gift Collection
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          {/* Gift Icon with Sparkles */}
          <div className="relative mb-8">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <Gift className="w-24 h-24 mx-auto text-amber-600" />

              {/* Animated sparkles around the gift */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: `${Math.sin((i * 60 * Math.PI) / 180) * 60}px`,
                    left: `${Math.cos((i * 60 * Math.PI) / 180) * 60}px`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Coming Soon Text */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Coming Soon
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                >
                  <Star className="w-5 h-5 text-amber-500 fill-current" />
                </motion.div>
              ))}
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              We're crafting something truly extraordinary for you.
              <br />
              <span className="font-semibold text-amber-600">
                A premium collection of handcrafted gifts that will take your
                breath away.
              </span>
            </p>
          </motion.div>

          {/* Features Preview */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {[
              {
                title: "Exclusive Designs",
                description: "Unique pieces crafted by master artisans",
                icon: "✨",
              },
              {
                title: "Premium Materials",
                description: "Only the finest materials and finishes",
                icon: "💎",
              },
              {
                title: "Limited Edition",
                description: "Each piece tells a unique story",
                icon: "🎁",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-amber-200/50 shadow-lg"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="space-y-4"
          >
            <p className="text-gray-600 font-medium">
              Be the first to know when we launch
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link to="/shop/home">Back to Home</Link>
              </Button>
              <Button
                variant="outline"
                className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300"
              >
                Notify Me
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-1/4 right-10 text-amber-400/30"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-10 text-orange-400/30"
          animate={{
            y: [0, 20, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Star className="w-5 h-5" />
        </motion.div>
      </div>
    </div>
  );
}

export default RegaloPage;
