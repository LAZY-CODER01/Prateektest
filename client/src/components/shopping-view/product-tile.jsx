import { IndianRupee } from "lucide-react";
import { Badge } from "../ui/badge";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

function ShoppingProductTile({ product, handleAddToCart, cartItems = [] }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/shop/product/${product?._id}`);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  const cartQuantity =
    cartItems.find((item) => item.productId === product._id)?.quantity || 0;
  const isOutOfStock = product.totalStock === 0;
  const isAtStockLimit = cartQuantity >= product.totalStock;

  return (
    <motion.div
      className="md:gap-5 cursor-pointer"
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
    >
      <CardContainer className="inter-var w-full max-w-sm mx-auto">
        <CardBody
          className="relative group/card w-auto sm:w-[25rem] h-auto rounded-xl p-6 border"
          style={{
            background:
              "radial-gradient(circle at top left, #F9F5F0 0%, #E8DFD5 100%)",
            borderColor: "rgba(180, 167, 148, 0.3)",
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Sale Badge with elegant animation */}
          {product?.salePrice > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 500 }}
              className="absolute top-3 left-3 z-10"
            >
              <Badge
                className="text-white shadow-lg pb-1 px-3 rounded-md"
                style={{
                  background:
                    "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                  fontFamily: "'Satisfy', serif",
                  letterSpacing: "1px",
                }}
              >
                {product?.salePrice > 0 ? (
                  <p
                    className="text-extrabold"
                    style={{ fontFamily: "Poppins" }}
                  >
                    Sale
                  </p>
                ) : null}
              </Badge>
            </motion.div>
          )}

          {/* Product Title */}
          <CardItem
            translateZ="50"
            className="text-3xl  font-semibold mt-8 tracking-tight"
            style={{
              fontFamily: "'Satisfy', serif",
              color: "#3A3845",
              textShadow: "0 1px 1px rgba(0,0,0,0.1)",
            }}
          >
            <motion.div
              whileHover={{ x: 5 }}
              className="border-b pb-2 flex flex-wrap border-amber-400"
            >
              {product?.title}
            </motion.div>
          </CardItem>

          {/* Category */}
          <CardItem
            as="p"
            translateZ="60"
            className="text-gray-600 text-sm max-w-sm mt-3 tracking-wider"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "0.5px",
            }}
          >
            <span className="font-light italic">Crafted from </span>
            <span className="font-medium text-gray-700">
              {product?.category.toUpperCase()}
            </span>
          </CardItem>

          {/* Product Image */}
          <CardItem translateZ="100" className="w-full mt-6 relative">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="overflow-hidden rounded-lg"
            >
              <img
                src={product?.image}
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-lg shadow-md"
                style={{
                  border: "1px solid rgba(180, 167, 148, 0.2)",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                }}
                alt={product?.title}
              />
              {/* Sophisticated overlay effect */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-black"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 30%)",
                  mixBlendMode: "multiply",
                }}
                animate={{
                  opacity: isHovered ? 0.8 : 0.4,
                }}
                transition={{ duration: 0.4 }}
              />
              {/* Low Stock Badge */}
              {product?.totalStock > 0 && product?.totalStock < 5 && (
                <div className="absolute top-2 right-2 z-20">
                  <Badge className="bg-red-500 text-white px-3 py-1 rounded-md shadow-md">
                    Low Stock
                  </Badge>
                </div>
              )}
            </motion.div>
          </CardItem>

          {/* Price Section */}
          <div className="flex justify-between items-center mt-8">
            <CardItem
              translateZ={20}
              className={`px-4 py-2 rounded-md text-lg font-normal flex`}
              style={{ fontFamily: "sans-serif" }}
            >
              <motion.div whileHover={{ scale: 1.05 }}>
                <Badge
                  className={`px-3 py-1 rounded-md text-lg font-bold flex items-center text-black ${
                    product?.salePrice > 0
                      ? "line-through text-gray-500"
                      : "px-4 py-2 text-xl font-extrabold rounded-md shadow-md flex items-center no-sale-price"
                  }`}
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(180, 167, 148, 0.3)",
                  }}
                >
                  Rs. {product?.price}
                </Badge>
              </motion.div>
            </CardItem>

            {product?.salePrice > 0 && (
              <CardItem
                translateZ={20}
                className="px-4 rounded-md text-lg font-bold flex"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    y: isHovered ? [0, -5, 0] : 0,
                  }}
                  transition={{
                    repeat: isHovered ? Infinity : 0,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <Badge
                    className="px-4 py-2 text-xl font-bold rounded-md shadow-md flex items-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                      color: "#FFF",
                      fontFamily: "'Fira Sans', serif",
                      fontSize: "1.1rem",
                      letterSpacing: "1px",
                    }}
                  >
                    Rs. {product?.salePrice}
                  </Badge>
                </motion.div>
              </CardItem>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="mt-6 space-y-3">
            {/* Product Details Button */}
            <CardItem
              translateZ={20}
              as={motion.button}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 25px rgba(169, 123, 75, 0.3)",
                y: -2,
              }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-4 rounded-xl text-lg font-semibold w-full tracking-wider relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #E8DFD5 0%, #D4C4B7 100%)",
                color: "#3A3845",
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "1px",
                border: "2px solid rgba(180, 167, 148, 0.4)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onClick={handleProductClick}
            >
              {/* Animated background overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-200/20 to-orange-200/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />

              <motion.span
                animate={{
                  letterSpacing: isHovered ? "1.5px" : "1px",
                }}
                transition={{
                  duration: 0.3,
                }}
                className="flex items-center justify-center relative z-10"
              >
                <span className="mr-3 font-medium">View Details</span>
                <motion.div
                  animate={{
                    x: isHovered ? [0, 8, -3, 0] : 0,
                    rotate: isHovered ? [0, 15, -5, 0] : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  className="text-xl"
                >
                  →
                </motion.div>
              </motion.span>
            </CardItem>

            {/* Add to Cart or Out of Stock Button */}
            {isOutOfStock ? (
              <CardItem
                translateZ={20}
                as={motion.button}
                className="px-6 py-4 rounded-xl text-lg font-bold w-full tracking-wider relative overflow-hidden group bg-gray-400 cursor-not-allowed text-white border-2 border-gray-300"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "1.5px",
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}
                disabled
              >
                OUT OF STOCK
              </CardItem>
            ) : (
              <CardItem
                translateZ={20}
                as={motion.button}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(189, 145, 104, 0.4)",
                  y: -2,
                }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-4 rounded-xl text-lg font-bold w-full tracking-wider relative overflow-hidden group ${
                  isAtStockLimit
                    ? "bg-gray-400 cursor-not-allowed text-white border-2 border-gray-300"
                    : ""
                }`}
                style={{
                  background: isAtStockLimit
                    ? undefined
                    : "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                  color: isAtStockLimit ? undefined : "#FFFFFF",
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "1.5px",
                  border: "2px solid rgba(169, 123, 75, 0.6)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}
                disabled={isAtStockLimit}
                onClick={() => {
                  if (!isAtStockLimit) handleAddToCart(product?._id);
                }}
              >
                {isAtStockLimit ? "Item Out of Stock" : "Add to Cart"}
              </CardItem>
            )}
          </div>

          {/* Premium decorative elements */}
          <motion.div
            className="absolute top-0 right-0 h-full w-1 bg-amber-50 opacity-30"
            animate={{
              height: isHovered ? "100%" : "70%",
              opacity: isHovered ? 0.4 : 0.2,
            }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute bottom-2 left-2 h-4 w-4 border-l border-t border-amber-200 opacity-50" />
          <div className="absolute top-2 right-2 h-4 w-4 border-r border-b border-amber-200 opacity-50" />
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}

export default ShoppingProductTile;

/* import { IndianRupee } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

function ShoppingProductTile({ product, handleGetProductDetails }) {
  return (
    <div
      onClick={() => handleGetProductDetails(product?._id)}
      className="md:gap-5"
    >
      <CardContainer className="inter-var w-full max-w-sm mx-auto shadow-2xl">
        <CardBody className="bg-amber-800 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[25rem] h-auto rounded-xl p-6 border">
          <CardItem translateZ="50" className="text-3xl font-bold text-white">
            {product?.title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-100 text-sm max-w-sm mt-2"
          >
            Material : {product?.category.toUpperCase()}
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <img
              src={product?.image}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl shadow-2xl group-hover/card:shadow-xl"
              alt={product?.title}
            />
            {product?.salePrice > 0 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 pb-1">
                Sale
              </Badge>
            ) : null}
          </CardItem>
          <div className="flex justify-between items-center mt-10">
            <CardItem
              translateZ={20}
              className={`px-4 rounded-xl text-lg font-normal text-white flex ${
                product?.salePrice > 0 ? "line-through text-black" : ""
              }`}
            >
              <Badge className="px-2 py-1 text-lg bg-white text-black hover:bg-gray-200 rounded-xl">
                Rs. {product?.price}
              </Badge>
            </CardItem>
            {product?.salePrice > 0 ? (
              <CardItem
                translateZ={20}
                className="px-4 rounded-xl text-lg font-bold text-white flex"
              >
                <Badge className="px-2 py-1 text-lg bg-white text-black hover:bg-gray-200 rounded-xl">
                  Rs. {product?.salePrice}
                </Badge>
              </CardItem>
            ) : null}
          </div>
          <div className="mt-5">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-1 rounded-xl bg-yellow-600 hover:bg-yellow-400 dark:bg-white text-white text-lg font-bold w-full"
            >
              Add to Cart
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}

export default ShoppingProductTile;
 */
