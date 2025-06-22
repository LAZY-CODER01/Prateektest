import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "@/store/shop/product-slice";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StarIcon, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import StarRatingComponent from "@/components/common/star-rating";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsPage() {
  // All hooks at the top
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { productDetails, isloading } = useSelector(
    (state) => state.shoppingProducts
  );
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const cartQuantity =
    cartItems?.find((item) => item.productId === productDetails?._id)
      ?.quantity || 0;
  const isOutOfStock = productDetails?.totalStock === 0;
  const isAtStockLimit = cartQuantity >= productDetails?.totalStock;

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setReviewMsg("");
        setRating(0);
        dispatch(getReviews(productDetails?._id));
        toast.success("Review Added Successfully!", {
          style: {
            backgroundColor: "#003300", // light red
            color: "#fff",
            fontWeight: "bolder", // dark red text
            fontSize: "15px",
            zIndex: "9999",
          },
        });
      }
    });
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
            zIndex: "9999",
          },
        });
      }
    });
  }

  // All useEffect hooks here
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (productDetails) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [productDetails]);

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getReviews(productDetails?._id));
    }
  }, [productDetails]);

  // Only after all hooks, do early returns:
  if (isloading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button onClick={() => navigate("/shop/listing")}>
          Back to Products
        </Button>
      </div>
    );
  }

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-0"
      style={{
        width: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
        backgroundImage:
          "url(https://res.cloudinary.com/dszoqau04/image/upload/v1750145800/bg_ukt5e4.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto mt-8">
        {/* Back Button */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Button
            onClick={() => navigate("/shop/listing")}
            variant="outline"
            className="flex items-center gap-2 hover:bg-white/50 rounded-full border-l-2 border-r-2 border-t-2 border-b-2 border-gray-200"
          >
            <ArrowLeft className="w-8 h-8" />
          </Button>
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="overflow-hidden rounded-xl shadow-xl h-[600px] w-full"
            >
              <img
                src={productDetails?.image}
                alt={productDetails?.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            {/* Product Information */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col justify-center space-y-6"
            >
              {/* Title */}
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                  {productDetails?.title}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Description : {productDetails?.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <p
                    className={`text-3xl font-bold text-primary ${
                      productDetails?.salePrice
                        ? "line-through text-gray-400"
                        : ""
                    }`}
                  >
                    Rs. {productDetails?.price}
                  </p>
                  {productDetails?.salePrice > 0 && (
                    <p className="text-3xl font-bold text-green-600">
                      Rs. {productDetails?.salePrice}
                    </p>
                  )}
                </div>
                {productDetails?.salePrice > 0 && (
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                    SALE
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  <StarRatingComponent rating={averageReview} />
                </div>
                <span className="text-gray-600">
                  ({averageReview.toFixed(1)})
                </span>
              </div>

              {/* Add to Cart Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className={`w-full py-4 text-lg font-bold ${
                    isAtStockLimit || isOutOfStock
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                  }`}
                  onClick={() => {
                    if (!isAtStockLimit && !isOutOfStock)
                      handleAddToCart(productDetails?._id);
                  }}
                  disabled={isAtStockLimit || isOutOfStock}
                >
                  {isOutOfStock
                    ? "Out of Stock"
                    : isAtStockLimit
                    ? "Max Stock in Cart"
                    : "Add to Cart"}
                </Button>
              </motion.div>

              {/* Separator */}
              <Separator className="bg-gray-200" />

              {/* Reviews Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Customer Reviews
                </h2>

                <div className="max-h-64 overflow-y-auto space-y-4 pr-2">
                  {reviews && reviews.length > 0 ? (
                    reviews.map((reviewItem) => (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex gap-4">
                          <Avatar className="w-12 h-12 border-2 border-amber-200">
                            <AvatarFallback className="bg-amber-100 text-amber-800">
                              {reviewItem?.userName[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold text-gray-800">
                                {reviewItem?.userName}
                              </h3>
                              <span className="text-sm text-gray-500">
                                {new Date(
                                  reviewItem?.createdAt
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <StarRatingComponent
                                rating={reviewItem?.reviewValue}
                              />
                            </div>
                            <p className="text-gray-600">
                              {reviewItem?.reviewMessage}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h1>No reviews</h1>
                  )}
                </div>

                {/* Add Review Form */}
                <div className="space-y-3 flex flex-col">
                  <Label>Write a review</Label>
                  <div className="flex gap-1">
                    <StarRatingComponent
                      rating={rating}
                      handleRatingChange={handleRatingChange}
                    />
                  </div>
                  <Input
                    name="reviewMsg"
                    value={reviewMsg}
                    onChange={(e) => setReviewMsg(e.target.value)}
                    placeholder="Write a review..."
                    className="bg-white border-2 border-gray-200 focus:border-amber-500"
                  />
                  <Button
                    onClick={handleAddReview}
                    disabled={reviewMsg.trim() === ""}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Add Review
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProductDetailsPage;
