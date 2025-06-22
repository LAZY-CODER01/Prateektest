import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import Footer from "./footer";
import { FlickeringGrid } from "../magicui/flickering-grid";

function ShoppingLayout() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full flex-1">
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ShoppingLayout;
