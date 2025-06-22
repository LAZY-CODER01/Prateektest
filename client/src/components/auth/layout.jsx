import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import Social from "../ui/social";
import { Separator } from "../ui/separator";

const images = [
  "https://res.cloudinary.com/dszoqau04/image/upload/v1748885255/bg-image_crtp8p.png",
  "https://res.cloudinary.com/dszoqau04/image/upload/v1749193522/planter_q0nsym.png",
  "https://res.cloudinary.com/dszoqau04/image/upload/v1749193522/cutlery_jzvtwm.png",
  "https://res.cloudinary.com/dszoqau04/image/upload/v1749193522/lamps_kxk5v5.png",
  "https://res.cloudinary.com/dszoqau04/image/upload/v1749193522/premium_furniture_h67ojx.png",
];

function FlickeringGridDemo() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <FlickeringGrid
        className="size-full z-[-1]"
        squareSize={4}
        gridGap={6}
        color="#44200D"
        maxOpacity={0.5}
        flickerChance={0.1}
        height={undefined}
        width={undefined}
      />
    </div>
  );
}

function AuthLayout() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // 5s interval

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen w-full">
      <div className="relative hidden lg:flex justify-center w-1/2 px-12 overflow-hidden transition-all duration-5000 ease-in-out z-50">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              current === idx ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="absolute z-10 max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="font-extrabold tracking-tight text-white text-shadow-lg/50 text-shadow-zinc-800 heading-1">
            <span className="heading lg:flex justify-center mt-28 ">
              Welcome to
            </span>
          </h1>
          <Separator className="w-1/2" />
          <h1 className="font-extrabold tracking-tight text-shadow-lg/50 text-shadow-zinc-700 heading-2">
            <span className="heading lg:flex justify-center mudrika-login">
              Mudrika International
            </span>
          </h1>
          <p className="text-lg text-white italic">
            " From Utensils to Art – All Things Handcrafted "
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 login-signup-background">
        <FlickeringGridDemo />
        <Outlet />
        <Social />
      </div>
    </div>
  );
}

export default AuthLayout;
