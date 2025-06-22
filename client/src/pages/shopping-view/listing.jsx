import { motion, AnimatePresence } from "framer-motion";
import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { ArrowUpDownIcon } from "lucide-react";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import Pagination from "@/components/ui/pagination";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllFilteredProducts } from "@/store/shop/product-slice";
import { useSelector } from "react-redux";
import { useSearchParams, useLocation } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";

// Add this to your main CSS file
// @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

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

function ShoppingListing() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { productsList, pagination } = useSelector(
    (state) => state.shoppingProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when filters or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sort]);

  function handleSort(value) {
    setSort(value);
    setIsSortOpen(false);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };

    if (!getSectionId && !getCurrentOption) {
      cpyFilters = {};
    } else {
      const indexOfCurrentSection =
        Object.keys(cpyFilters).indexOf(getSectionId);
      if (indexOfCurrentSection === -1) {
        cpyFilters = { ...cpyFilters, [getSectionId]: [getCurrentOption] };
      } else {
        const indexOfCurrentOption =
          cpyFilters[getSectionId].indexOf(getCurrentOption);
        if (indexOfCurrentOption === -1) {
          cpyFilters[getSectionId].push(getCurrentOption);
        } else {
          cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
          if (cpyFilters[getSectionId].length === 0) {
            delete cpyFilters[getSectionId];
          }
        }
      }
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

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

  function handlePageChange(page) {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchAllFilteredProducts({
          filterParams: filters,
          sortParams: sort,
          page: currentPage,
          limit: 12,
        })
      );
    }
  }, [dispatch, filters, sort, currentPage]);

  // Scroll to top on route change and after products load
  useEffect(() => {
    if (productsList && productsList.length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.search, productsList]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6"
      style={{
        width: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
        backgroundImage:
          "url(https://res.cloudinary.com/dszoqau04/image/upload/v1750145800/bg_ukt5e4.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Filter Sidebar */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <ProductFilter filters={filters} handleFilter={handleFilter} />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="bg-white w-full rounded-lg shadow-xl overflow-hidden"
        style={{
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header with Sort */}
        <div
          className="p-4 border-b flex items-center justify-between"
          style={{
            background: "linear-gradient(to right, #f8f4e9, #ffffff)",
            borderColor: "#e5e0d5",
          }}
        >
          <motion.h2
            className="text-2xl font-bold"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#5e4b3c",
            }}
          >
            All Products
          </motion.h2>

          <div className="flex items-center gap-3">
            <motion.span
              className="text-muted-foreground font-medium"
              style={{ color: "#8d7b68" }}
            >
              {pagination?.totalProducts || 0} Products
            </motion.span>

            <DropdownMenu onOpenChange={setIsSortOpen}>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    style={{
                      borderColor: "#d4a373",
                      color: "#5e4b3c",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    <ArrowUpDownIcon className="w-4 h-4" />
                    <span>Sort by</span>
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[200px]"
                style={{
                  background: "#fff9f0",
                  borderColor: "#d4a373",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                      style={{
                        color: "#5e4b3c",
                        fontWeight: 600,
                        "&:hover": {
                          background: "#f0e6d2",
                        },
                      }}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {productsList && productsList.length > 0 ? (
              productsList.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ShoppingProductTile
                    handleAddToCart={handleAddToCart}
                    product={product}
                    cartItems={cartItems}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-lg text-gray-500">No products found</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border-t"
            style={{ borderColor: "#e5e0d5" }}
          >
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default ShoppingListing;
