import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  Shield,
  Truck,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { filterOptions } from "../../config";

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

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const quickLinks = [
    { label: "About Us", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Shipping Info", href: "#" },
    { label: "Returns", href: "#" },
  ];

  const customerService = [
    { label: "Help Center", href: "#" },
    { label: "Track Order", href: "#" },
    { label: "Size Guide", href: "#" },
    { label: "Gift Cards", href: "#" },
    { label: "Store Locator", href: "#" },
    { label: "Careers", href: "#" },
  ];

  return (
    <footer className="footer-gradient text-white w-full">
      {/* Newsletter Section */}
      {/* <div className="bg-amber-800 py-8 w-full">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-amber-100 mb-6">
              Subscribe to our newsletter for exclusive offers and updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white border-2 border-transparent"
              />
              <button className="bg-white text-amber-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <motion.div
          className="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div>
              <Link
                to="/shop/home"
                className="text-2xl font-bold text-amber-400 hover:text-amber-300 transition-colors"
              >
                Mudrika International
              </Link>
              <p className="text-gray-300 mt-2 leading-relaxed">
                Crafting beautiful furniture and home decor that transforms your
                space into a sanctuary of style and comfort.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
                  info@mudrikainternational.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
                  +91 1234567890
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
                  123 Furniture Street, Design District, Mumbai, Maharashtra
                  400001
                </span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="social-icon-hover w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product Categories */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">
              Product Categories
            </h4>
            <div className="space-y-2">
              {filterOptions.category.map((category) => (
                <Link
                  key={category.id}
                  to={`/shop/listing?category=${category.id}`}
                  className="footer-link-hover flex items-center justify-between text-gray-300 hover:text-amber-400 transition-colors duration-300 group py-1"
                >
                  <span className="capitalize text-sm">{category.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">
              Quick Links
            </h4>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="footer-link-hover flex items-center justify-between text-gray-300 hover:text-amber-400 transition-colors duration-300 group py-1"
                >
                  <span className="text-sm">{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Customer Service */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">
              Customer Service
            </h4>
            <div className="space-y-2">
              {customerService.map((service, index) => (
                <Link
                  key={index}
                  to={service.href}
                  className="footer-link-hover flex items-center justify-between text-gray-300 hover:text-amber-400 transition-colors duration-300 group py-1"
                >
                  <span className="text-sm">{service.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="footer-features grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="feature-card flex items-center space-x-3 p-4 rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h5 className="font-semibold text-white text-sm">
                Free Shipping
              </h5>
              <p className="text-xs text-gray-400">On orders above ₹500</p>
            </div>
          </motion.div>

          <motion.div
            className="feature-card flex items-center space-x-3 p-4 rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h5 className="font-semibold text-white text-sm">
                Secure Payment
              </h5>
              <p className="text-xs text-gray-400">100% secure checkout</p>
            </div>
          </motion.div>

          <motion.div
            className="feature-card flex items-center space-x-3 p-4 rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h5 className="font-semibold text-white text-sm">
                Quality Guarantee
              </h5>
              <p className="text-xs text-gray-400">Premium craftsmanship</p>
            </div>
          </motion.div>

          <motion.div
            className="feature-card flex items-center space-x-3 p-4 rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h5 className="font-semibold text-white text-sm">24/7 Support</h5>
              <p className="text-xs text-gray-400">Always here to help</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 py-6 w-full">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Regalo. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link
                to="#"
                className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
