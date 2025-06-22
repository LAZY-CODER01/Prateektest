import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "../../config";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { logoutUser } from "@/store/auth-slice";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import UserCartWrapper from "./cart-wrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
};

// Marquee component
function PromotionalMarquee() {
  return (
    <div className="bg-amber-800 text-white py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <span className="inline-block px-4 text-md font-bold">
          🚚 Free shipping upto Rs. 500 • 🎉 Exclusive sale • 🚚 Free shipping
          upto Rs. 500 • 🎉 Exclusive sale • 🚚 Free shipping upto Rs. 500 • 🎉
          Exclusive sale
        </span>
      </div>
    </div>
  );
}

function MenuItem() {
  return (
    <motion.nav
      className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <motion.div key={menuItem.id} variants={itemVariants}>
          <Link
            className="text-lg font-medium relative group text-white"
            to={menuItem.path}
          >
            {menuItem.label}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-800 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </motion.div>
      ))}
    </motion.nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { cartItems } = useSelector((state) => state.shopCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCartHovered, setIsCartHovered] = useState(false);

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Sheet
          open={openCartSheet}
          onOpenChange={() => setOpenCartSheet(false)}
        >
          <Button
            onClick={() => setOpenCartSheet(true)}
            variant="outline"
            size="icon"
            className="relative"
            onMouseEnter={() => setIsCartHovered(true)}
            onMouseLeave={() => setIsCartHovered(false)}
          >
            <ShoppingCart className="w-6 h-6" />
            <motion.span
              className="absolute -top-2 -right-2 bg-amber-800 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              animate={{
                scale: isCartHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              {cartItems ? cartItems.length : 0}
            </motion.span>
            <span className="sr-only">User Cart</span>
          </Button>
          <UserCartWrapper
            setOpenCartSheet={setOpenCartSheet}
            cartItems={cartItems && cartItems.length > 0 ? cartItems : []}
          />
        </Sheet>
      </motion.div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Avatar className="bg-black cursor-pointer border-3 border-amber-800 hover:border-white transition-colors duration-300">
              <AvatarFallback className="bg-black text-white font-extrabold">
                {user.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-lg overflow-hidden">
          <DropdownMenuLabel className="font-bold text-gray-800">
            Logged in as {user.userName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="focus:bg-amber-50 focus:text-amber-800 cursor-pointer"
          >
            <UserCog className="w-4 h-4 mr-2 text-amber-600" />
            <span className="font-medium">Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigate("/shop/profile")}
            className="focus:bg-amber-50 focus:text-amber-800 cursor-pointer"
          >
            <UserCog className="w-4 h-4 mr-2 text-amber-600" />
            <span className="font-medium">Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem
            onClick={handleLogout}
            className="focus:bg-red-50 focus:text-red-800 cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-2 text-red-600" />
            <span className="font-medium">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full">
      <PromotionalMarquee />
      <motion.header
        className={`w-full border-b shadow-md transition-all duration-300 login-signup-background`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <Link
            to="/shop/home"
            className="flex items-center gap-2 border-none mudrika text-lg text-white md:text-3xl"
          >
            Mudrika International
          </Link>

          <div className="ml-auto flex lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="lg:hidden bg-white/10 hover:bg-white/20 border-white/20"
                  >
                    <Menu className="h-6 w-6 text-white" />
                    <span className="sr-only flex items-center justify-end">
                      Toggle header Menu
                    </span>
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-3/4 max-w-xs p-6 bg-gradient-to-b from-red-400 to-red-950"
              >
                <MenuItem />
                <div className="mt-8">
                  <HeaderRightContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden lg:block">
            <MenuItem />
          </div>

          <div className="hidden lg:block">
            <HeaderRightContent />
          </div>
        </div>
      </motion.header>
    </div>
  );
}

export default ShoppingHeader;

/* import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "../../config";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { logoutUser } from "@/store/auth-slice";

function MenuItem() {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Link
          className="text-lg font-medium hover:underline"
          key={menuItem.id}
          to={menuItem.path}
        >
          {menuItem.label}
        </Link>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Button variant="outline" size="icon">
        <ShoppingCart className="w-6 h-6" />
        <span className="sr-only">User Cart</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Logged in as {user.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="w-4 h-4 mr-2" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-red-950/10 backdrop-blur-lg shadow-md ">
      <div className="flex h-16 items-center   justify-between px-4 md:px-6">
        <Link
          to="/shop/home"
          className="flex items-center gap-2 border-none mt-2"
        >
          <span className="text-2xl font-bold header-heading">
            Mudrika International
          </span>
        </Link>
        <div className="ml-auto flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only flex items-center justify-end">
                  Toggle header Menu
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs p-6">
              <MenuItem />
              <HeaderRightContent/>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:block">
          <MenuItem />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
 */
