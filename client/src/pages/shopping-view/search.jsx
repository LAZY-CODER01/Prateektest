import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  getSearchResults,
  resetSearchResults,
  setCurrentKeyword,
} from "@/store/shop/search-slice";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { Badge } from "@/components/ui/badge";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const debouncedSearch = useRef(
    debounce((kw) => {
      setSearchParams(new URLSearchParams(`?keyword=${kw}`));
      dispatch(getSearchResults(kw));
    }, 1000)
  ).current;

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      dispatch(setCurrentKeyword(keyword));
      debouncedSearch(keyword);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  function handleAddToCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product Added to Cart!", {
          style: {
            backgroundColor: "#003300", // light red
            color: "#fff",
            fontWeight: "bolder", // dark red text
            fontSize: "15px",
          },
        });
      }
    });
  }

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen relative overflow-x-hidden"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Animated Background Gradient & Geometric Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 -z-10">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
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
        {/* Flickering grid effect for subtle animation */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <FlickeringGrid color="#C9A66B" maxOpacity={0.15} />
        </div>
      </div>

      {/* Search Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="mb-4 flex justify-center"
          >
            <Badge
              className="px-4 py-2 text-sm font-medium"
              style={{
                background: "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                color: "#FFF",
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "1px",
              }}
            >
              Search our Collection
            </Badge>
          </motion.div>
          <motion.div variants={itemVariants}>
            <SparklesText
              className="block mb-4 text-4xl md:text-6xl font-bold playfair-font"
              colors={{ first: "#C9A66B", second: "#A67C52" }}
            >
              Find Your Perfect Piece
            </SparklesText>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-8"
          >
            <Input
              value={keyword}
              name="keyword"
              onChange={(event) => setKeyword(event.target.value)}
              className="py-6 px-6 text-xl rounded-xl shadow-lg border-2 border-amber-200 bg-white/80 focus:border-amber-400 focus:ring-amber-200 transition-all duration-300 max-w-2xl mx-auto placeholder:text-amber-400 font-medium"
              placeholder="Search Products..."
              style={{ fontFamily: "'Poppins', sans-serif" }}
              autoFocus
            />
          </motion.div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8"
        >
          {searchResults && searchResults.length ? (
            searchResults.map((item, idx) => (
              <motion.div key={item._id || idx} variants={itemVariants}>
                <ShoppingProductTile
                  handleAddToCart={handleAddToCart}
                  product={item}
                  cartItems={cartItems}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              variants={itemVariants}
              className="col-span-full flex flex-col items-center justify-center py-24"
            >
              <SparklesText
                className="text-4xl md:text-5xl font-bold mb-4 playfair-font text-center"
                colors={{ first: "#C9A66B", second: "#A67C52" }}
              >
                No result found!
              </SparklesText>
              <p className="text-lg text-amber-700 font-medium mt-2 text-center">
                Try a different keyword or explore our featured collections.
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>
    </motion.div>
  );
}

export default SearchProducts;
