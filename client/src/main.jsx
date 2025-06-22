import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { Toaster } from "sonner";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

// Custom scroll restoration to prevent automatic scroll to top
const scrollRestoration = {
  getScrollPosition: () => {
    return window.scrollY;
  },
  setScrollPosition: (position) => {
    // Only scroll if we're not already at the top
    if (position > 0) {
      window.scrollTo(0, position);
    }
  },
};

createRoot(document.getElementById("root")).render(
  <BrowserRouter scrollRestoration="manual">
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </BrowserRouter>
);
