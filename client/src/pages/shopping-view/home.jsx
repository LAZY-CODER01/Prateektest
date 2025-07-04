import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
 import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import ShoppingHeader from "../../components/shopping-view/header";
import Footer from "../../components/shopping-view/footer";
import {
  ArrowRight,
  Star,
  ShoppingBag,
  Heart,
  Shield,
  Truck,
  Sparkles,
  Award,
  Users,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  IndianRupee,
} from "lucide-react";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { MorphingText } from "@/components/magicui/morphing-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

function ShoppingHome() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
 
const loginStatus = useSelector((state) => state.auth.loginStatus);
 console.log("Login Status:", loginStatus);

  // Sample products for carousel
  const featuredProducts = [
    {
      id: 1,
      title: "Vintage Brass Coffee Table",
      price: 12500,
      salePrice: 9999,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      category: "brass",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Handcrafted Wooden Dining Chair",
      price: 8500,
      salePrice: 0,
      image:
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop",
      category: "wood",
      rating: 4.9,
    },
    {
      id: 3,
      title: "Artisanal Ceramic Vase",
      price: 3200,
      salePrice: 2499,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      category: "handicraft",
      rating: 4.7,
    },
    {
      id: 4,
      title: "Copper Wall Mirror",
      price: 6800,
      salePrice: 0,
      image:
        "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=400&h=300&fit=crop",
      category: "copper",
      rating: 4.6,
    },
    {
      id: 5,
      title: "Stainless Steel Cutlery Set",
      price: 4500,
      salePrice: 3599,
      image:
        "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop",
      category: "stainlessSteel",
      rating: 4.8,
    },
    {
      id: 6,
      title: "Glass Decorative Bowl",
      price: 2800,
      salePrice: 0,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      category: "glass",
      rating: 4.5,
    },
    {
      id: 7,
      title: "Metal Floor Lamp",
      price: 9200,
      salePrice: 7499,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
      category: "metal",
      rating: 4.7,
    },
    {
      id: 8,
      title: "Wooden Side Table",
      price: 7500,
      salePrice: 0,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      category: "furniture",
      rating: 4.9,
    },
  ];

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

  const featuredCategories = [
    {
      id: "furniture",
      title: "Furniture",
      description: "Elegant pieces for your home",
      icon: "🪑",
      color: "from-amber-100 to-orange-100",
      borderColor: "border-amber-200",
    },
    {
      id: "handicraft",
      title: "Handicrafts",
      description: "Artisanal creations",
      icon: "🎨",
      color: "from-emerald-100 to-teal-100",
      borderColor: "border-emerald-200",
    },
    {
      id: "brass",
      title: "Brass",
      description: "Timeless brass collections",
      icon: "✨",
      color: "from-yellow-100 to-amber-100",
      borderColor: "border-yellow-200",
    },
    {
      id: "wood",
      title: "Wood",
      description: "Natural wooden treasures",
      icon: "🌳",
      color: "from-orange-100 to-red-100",
      borderColor: "border-orange-200",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Interior Designer",
      content:
        "The quality of these products is exceptional. Each piece tells a story of craftsmanship.",
      rating: 5,
      avatar: "👩‍🎨",
    },
    {
      name: "Michael Chen",
      role: "Home Owner",
      content:
        "Found the perfect furniture for my living room. The delivery was seamless!",
      rating: 5,
      avatar: "👨‍💼",
    },
    {
      name: "Emma Davis",
      role: "Collector",
      content:
        "Beautiful handicrafts that add character to any space. Highly recommended!",
      rating: 5,
      avatar: "👩‍🦰",
    },
  ];

  const stats = [
    { number: "500+", label: "Happy Customers", icon: Users },
    { number: "1000+", label: "Products Sold", icon: ShoppingBag },
    { number: "50+", label: "Artisan Partners", icon: Award },
    { number: "98%", label: "Satisfaction Rate", icon: TrendingUp },
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

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <div>
      <ShoppingHeader/>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen relative overflow-x-hidden"
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Enhanced Attractive Pattern Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-30">
          {/* Corner borders */}
          <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-amber-600"></div>
          <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-amber-600"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-amber-600"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-amber-600"></div>
          <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-amber-600"></div>
          <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-amber-600"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-amber-600"></div>
          <div className="absolute bottom-100 right-50 w-32 h-32 border-r-4 border-b-4 border-amber-600"></div>

          {/* Floating circles with enhanced visibility */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-gradient-to-r from-amber-300 to-orange-300 opacity-40"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
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
          ></motion.div>
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
          ></motion.div>

          {/* Enhanced diagonal lines */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-30"></div>
            <div className="absolute top-1/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-30"></div>
            <div className="absolute top-2/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-30"></div>
          </div>

          {/* Additional decorative elements */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-amber-300 opacity-20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-orange-300 opacity-30 rounded-full"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">{/* <FlickeringGrid /> */}</div>

        {/* Video Background for Hero Section */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dszoqau04/video/upload/v1750232491/7121436-hd_1920_1080_25fps_jhpldw.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        <motion.div
          className="relative z-20 text-center px-4 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <Badge
              className="px-4 py-2 text-sm font-medium mb-4"
              style={{
                background: "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                color: "#FFF",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Premium Handcrafted Collection
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#ffffff",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            <SparklesText text="Discover Timeless" className="block mb-2" />
            <MorphingText
              texts={["Elegance", "Beauty", "Craftsmanship", "Heritage"]}
              className="block"
            />
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            style={{
              color: "#ffffff",
              textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            }}
          >
            Curated collection of handcrafted furniture and artisanal pieces
            that transform your space into a sanctuary of style and comfort.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={() => navigate("/shop/listing")}
              className="px-8 py-4 text-lg font-semibold"
              style={{
                background: "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                color: "#FFF",
                border: "none",
                boxShadow: "0 8px 25px rgba(169, 123, 75, 0.3)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 35px rgba(169, 123, 75, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Collection
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                navigate("/shop/regalo");
                setTimeout(
                  () => window.scrollTo({ top: 0, behavior: "smooth" }),
                  0
                );
              }}
              className="px-8 py-4 text-lg font-semibold"
              style={{
                borderColor: "#d4a373",
                color: "#5e4b3c",
                background: "rgba(255,255,255,0.8)",
              }}
              whileHover={{
                scale: 1.05,
                background: "rgba(255,255,255,0.9)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="mr-2 w-5 h-5" />
              Gift Collection
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-100">
                  <stat.icon
                    className="w-8 h-8 mx-auto mb-3"
                    style={{ color: "#C9A66B" }}
                  />
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{ color: "#5e4b3c" }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "#8d7b68" }}
                  >
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2
              className="text-4xl font-bold mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#5e4b3c",
              }}
            >
              Featured Categories
            </h2>
            <p className="text-lg" style={{ color: "#8d7b68" }}>
              Explore our curated collections
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  navigate(`/shop/listing?category=${category.id}`)
                }
                className="cursor-pointer"
              >
                <Card
                  className="h-full border-2 hover:shadow-xl transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    borderColor: "#d4a373",
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: "#5e4b3c" }}
                    >
                      {category.title}
                    </h3>
                    <p className="text-sm" style={{ color: "#8d7b68" }}>
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-16 px-4 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2
              className="text-4xl font-bold mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#5e4b3c",
              }}
            >
              Featured Collections
            </h2>
            <p className="text-lg" style={{ color: "#8d7b68" }}>
              Discover our handpicked treasures
            </p>
          </motion.div>

          <div className="relative">
            {/* Image Carousel Container */}
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <motion.div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {carouselImages.map((item, index) => (
                  <div
                    key={item.id}
                    className="min-w-full relative h-96 md:h-[500px]"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay with text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <motion.h3
                          className="text-3xl md:text-4xl font-bold mb-2"
                          style={{
                            fontFamily: "'Playfair Display', serif",
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {item.title}
                        </motion.h3>
                        <motion.p
                          className="text-lg md:text-xl opacity-90"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          {item.subtitle}
                        </motion.p>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <Button
                            onClick={() => navigate("/shop/listing")}
                            className="mt-4 px-6 py-3 text-lg font-semibold"
                            style={{
                              background:
                                "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                              color: "#FFF",
                              border: "none",
                              boxShadow: "0 8px 25px rgba(169, 123, 75, 0.3)",
                            }}
                            whileHover={{
                              scale: 1.05,
                              boxShadow: "0 12px 35px rgba(169, 123, 75, 0.4)",
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Explore Collection
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Buttons */}

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-3">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-gradient-to-r from-amber-600 to-orange-600 scale-125 shadow-lg"
                      : "bg-amber-300 hover:bg-amber-400 hover:scale-110"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2
              className="text-4xl font-bold mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#5e4b3c",
              }}
            >
              What Our Customers Say
            </h2>
            {/* <Separator className="bg-amber-300 w-1/2 mx-auto"/> */}
            <p className="text-lg" style={{ color: "#8d7b68" }}>
              Real experiences from satisfied customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <Card
                  className="h-full p-6"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    borderColor: "#d4a373",
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{testimonial.avatar}</div>
                    <div>
                      <div
                        className="font-semibold"
                        style={{ color: "#5e4b3c" }}
                      >
                        {testimonial.name}
                      </div>
                      <div className="text-sm" style={{ color: "#8d7b68" }}>
                        {testimonial.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-sm italic" style={{ color: "#8d7b68" }}>
                    "{testimonial.content}"
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border-2 border-amber-300">
                <Truck className="w-8 h-8" style={{ color: "#C9A66B" }} />
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "#5e4b3c" }}
              >
                Free Shipping
              </h3>
              <p className="text-sm font-bold " style={{ color: "#8d7b68" }}>
                On orders over ₹5000
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border-2 border-amber-300">
                <Shield className="w-8 h-8" style={{ color: "#C9A66B" }} />
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "#5e4b3c" }}
              >
                Quality Guarantee
              </h3>
              <p className="text-sm font-bold" style={{ color: "#8d7b68" }}>
                30-day return policy
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border-2 border-amber-300">
                <Award className="w-8 h-8" style={{ color: "#C9A66B" }} />
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "#5e4b3c" }}
              >
                Handcrafted
              </h3>
              <p className="text-sm font-bold" style={{ color: "#8d7b68" }}>
                By skilled artisans
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-12 border border-amber-200"
          >
            <h2
              className="text-4xl font-bold mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#5e4b3c",
              }}
            >
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg mb-8" style={{ color: "#8d7b68" }}>
              Discover our handcrafted collection and create the home of your
              dreams
            </p>
            <Button
              onClick={() => navigate("/shop/listing")}
              className="px-8 py-4 text-lg font-semibold"
              style={{
                background: "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                color: "#FFF",
                border: "none",
                boxShadow: "0 8px 25px rgba(169, 123, 75, 0.3)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 35px rgba(169, 123, 75, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start Shopping Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
     <Footer />
  </div>
  );
}

export default ShoppingHome;
