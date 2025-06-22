import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // console.log(location.pathname, isAuthenticated);

  // if (location.pathname === "/") {
  //   if (!isAuthenticated) {
  //     return <Navigate to="/auth/login" />;
  //   } else {
  //     if (user?.role === "admin") {
  //       return <Navigate to="/admin/dashboard" />;
  //     } else {
  //       return <Navigate to="/shop/home" />;
  //     }
  //   }
  // }

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  if (
    !isAuthenticated &&
    !(
      (
        location.pathname.includes("/login") ||
        location.pathname.includes("/signup") ||
        location.pathname.includes("/verify-otp")
      )
      //
    ) // pages other than login, signup and verify-otp
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/signup") ||
      location.pathname.includes("/verify-otp"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" && // user is normal user and try to use admin page than redirect to -->
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop") // because admin doesnot allowed to access shop route
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
