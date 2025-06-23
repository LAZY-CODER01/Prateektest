import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Users,
  Award,
  Heart,
  Star,
  Send,
  CheckCircle,
  Sparkles,
  Building2,
  Target,
  Eye,
  HandHeart,
} from "lucide-react";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import emailjs from "@emailjs/browser";

function AboutUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [cooldownTime, setCooldownTime] = useState(0);

  // Rate limiting: Max 3 submissions per hour
  const MAX_SUBMISSIONS_PER_HOUR = 3;
  const COOLDOWN_MINUTES = 60;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const checkRateLimit = () => {
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000; // 1 hour in milliseconds

    // Reset count if more than 1 hour has passed
    if (lastSubmissionTime < oneHourAgo) {
      setSubmissionCount(0);
      setLastSubmissionTime(0);
    }

    // Check if user has exceeded limit
    if (submissionCount >= MAX_SUBMISSIONS_PER_HOUR) {
      const timeRemaining =
        COOLDOWN_MINUTES - Math.floor((now - lastSubmissionTime) / (60 * 1000));
      if (timeRemaining > 0) {
        setCooldownTime(timeRemaining);
        return false;
      } else {
        setSubmissionCount(0);
        setCooldownTime(0);
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check rate limit
    if (!checkRateLimit()) {
      setError(
        `Too many submissions. Please wait ${cooldownTime} minutes before trying again.`
      );
      return;
    }

    setIsSubmitting(true);
    setError("");

    emailjs
      .send(
        import.meta.env.EMAIL_SERVICE_ID, // Your Service ID
        import.meta.env.EMAIL_TEMPLATE_ID, // Replace with your actual Template ID from Email Templates
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        import.meta.env.EMAIL_PUBLIC_KEY // Your Public Key
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Update rate limiting
        setSubmissionCount((prev) => prev + 1);
        setLastSubmissionTime(Date.now());

        setTimeout(() => setIsSubmitted(false), 5000);
      })
      .catch((err) => {
        console.log("FAILED...", err);
        setIsSubmitting(false);
        setError("Failed to send message. Please try again later.");
      });
  };

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

  const stats = [
    { number: "500+", label: "Happy Customers", icon: Users },
    { number: "1000+", label: "Products Sold", icon: Award },
    { number: "50+", label: "Artisan Partners", icon: Heart },
    { number: "98%", label: "Satisfaction Rate", icon: Star },
  ];

  const values = [
    {
      icon: Building2,
      title: "Craftsmanship",
      description:
        "We believe in preserving traditional artisanal techniques while embracing modern design principles.",
      color: "from-amber-100 to-orange-100",
    },
    {
      icon: Target,
      title: "Quality",
      description:
        "Every piece is carefully selected and crafted to meet the highest standards of quality and durability.",
      color: "from-emerald-100 to-teal-100",
    },
    {
      icon: Eye,
      title: "Aesthetics",
      description:
        "We curate collections that blend timeless elegance with contemporary style for modern homes.",
      color: "from-purple-100 to-pink-100",
    },
    {
      icon: HandHeart,
      title: "Sustainability",
      description:
        "Committed to eco-friendly practices and supporting local artisans and communities.",
      color: "from-green-100 to-emerald-100",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen relative overflow-x-hidden"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-amber-600"></div>
          <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-amber-600"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-amber-600"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-amber-600"></div>

          <motion.div
            className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-gradient-to-r from-amber-300 to-orange-300 opacity-40"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <FlickeringGrid />
        </div>

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
        </video>

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
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Our Story
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 text-white"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            <SparklesText text="About" className="block mb-2" />
            <span className="block">Our Heritage</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
          >
            Discover the passion, craftsmanship, and dedication behind every
            piece in our curated collection of handcrafted furniture and
            artisanal treasures.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              size="lg"
              className="px-8 py-3 text-lg font-semibold"
              style={{
                background: "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                color: "#FFF",
                border: "none",
              }}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("our-story");
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              Learn More
            </Button>
        <Button
          size="lg"
          onClick={() => (window.location.href = "/shop/terms")}
          className="px-8 py-3 text-lg font-semibold"
          style={{
            background: "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
            color: "#FFF",
            border: "none",
          }}
        >
          Terms and Conditions
        </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#1F2937",
              }}
            >
              Our Story
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Founded with a vision to bridge the gap between traditional
              craftsmanship and modern living, we've been curating exceptional
              pieces that tell stories of heritage, skill, and passion.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center mb-20"
          >
            <motion.div variants={itemVariants}>
              <BorderBeam size={250} duration={12} delay={9} />
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop"
                alt="Our Workshop"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-3xl font-bold" style={{ color: "#1F2937" }}>
                A Legacy of Craftsmanship
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our journey began in the heart of India's artisanal communities,
                where generations of skilled craftsmen have been creating
                beautiful pieces using traditional techniques passed down
                through families.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we work closely with over 50 master artisans across the
                country, bringing their exceptional skills and unique designs to
                homes worldwide.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-gradient-to-r from-amber-100 to-orange-100">
                    <stat.icon className="w-8 h-8 text-amber-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#1F2937",
              }}
            >
              Our Values
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              The principles that guide our work and shape our relationships
              with artisans and customers.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants} className="group">
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center`}
                    >
                      <value.icon className="w-8 h-8 text-gray-700" />
                    </div>
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: "#1F2937" }}
                    >
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section
        id="contact"
        className="relative py-20 px-4 bg-gradient-to-r from-amber-50 to-orange-50"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#1F2937",
              }}
            >
              Get In Touch
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Have questions about our products or want to learn more about our
              craftsmanship? We'd love to hear from you.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12"
          >
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <h3
                    className="text-2xl font-bold mb-6"
                    style={{ color: "#1F2937" }}
                  >
                    Send us a Message
                  </h3>

                  {/* Rate Limit Status */}
                  <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-800">
                        Submissions remaining:{" "}
                        {Math.max(
                          0,
                          MAX_SUBMISSIONS_PER_HOUR - submissionCount
                        )}
                        /3
                      </span>
                      {cooldownTime > 0 && (
                        <span className="text-orange-600 font-medium">
                          Cooldown: {cooldownTime} min
                        </span>
                      )}
                    </div>
                  </div>

                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-800 font-medium">
                          Thank you! Your message has been sent successfully.
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 font-medium">
                          {error}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="name"
                          className="text-sm font-medium text-gray-700"
                        >
                          Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium text-gray-700"
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="subject"
                        className="text-sm font-medium text-gray-700"
                      >
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="message"
                        className="text-sm font-medium text-gray-700"
                      >
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="mt-1 min-h-[120px]"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 text-lg font-semibold"
                      style={{
                        background:
                          "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                        color: "#FFF",
                        border: "none",
                      }}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3
                  className="text-2xl font-bold mb-6"
                  style={{ color: "#1F2937" }}
                >
                  Contact Information
                </h3>
                <p className="text-gray-600 mb-8">
                  Reach out to us through any of these channels. We're here to
                  help you find the perfect piece for your home.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-amber-100 to-orange-100">
                    <Mail className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                    <p className="text-gray-600">hello@artisanhome.com</p>
                    <p className="text-gray-600">support@artisanhome.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-amber-100 to-orange-100">
                    <Phone className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                    <p className="text-gray-600">+91 98765 43210</p>
                    <p className="text-gray-600">+91 98765 43211</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-amber-100 to-orange-100">
                    <MapPin className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Address
                    </h4>
                    <p className="text-gray-600">
                      123 Artisan Street
                      <br />
                      Craft District, Mumbai
                      <br />
                      Maharashtra 400001, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-amber-100 to-orange-100">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Business Hours
                    </h4>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-gray-600">
                      Saturday: 10:00 AM - 4:00 PM
                    </p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Terms and Conditions Button */}
      
    </motion.div>
  );
}

export default AboutUs;
