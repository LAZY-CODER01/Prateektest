import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { logoutUser } from "@/store/auth-slice";
import { toast } from "sonner";

function Greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning, ";
  else if (hour < 18) return "Good afternoon, ";
  else return "Good evening, ";
}

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logoutUser());
    toast.success("Logged out successfully", {
      style: {
        backgroundColor: "#003300", // light red
        color: "#fff",
        fontWeight: "bolder", // dark red text
        fontSize: "15px",
      },
    });
  }

  const auth = useSelector((state) => state.auth);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b">
      {/* Left: Greeting + Username */}
      <div className="flex items-center gap-2">
        <Button
          className="lg:hidden sm:block p-2"
          onClick={() => setOpen(true)}
        >
          <AlignJustify />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <h1 className="text-base sm:text-lg">
          <Greeting />
          <span className="font-bold">
            {auth.user.userName}
          </span>
        </h1>
      </div>

      {/* Center: Live Clock */}
      <div className="hidden md:block text-sm sm:text-base font-medium text-center flex-1">
        {formattedTime}
      </div>

      {/* Right: Logout */}
      <div className="flex justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;

// import { AlignJustify, LogOut } from "lucide-react";
// import { Button } from "../ui/button";
// import { useSelector } from "react-redux";

// function Greeting() {
//   const hour = new Date().getHours();
//   let greeting = "";

//   if (hour < 12) {
//     greeting = "Good morning, ";
//   } else if (hour < 18) {
//     greeting = "Good afternoon, ";
//   } else {
//     greeting = "Good evening, ";
//   }
//   return <span>{greeting}</span>;
// }

// function AdminHeader() {
//   const auth = useSelector((state) => state.auth);
//   // console.log(auth.user);

//   return (
//     <header className="flex items-center justify-between px-4 py-3 border-3">
//       <Button className="lg:hidden sm:block">
//         <AlignJustify />
//         <span className="sr-only">Toggle Menu</span>
//       </Button>
//       <h1 className="ml-2 ">
//         {Greeting()}
//         <span className="font-bold">{auth.user.userName} </span>
//       </h1>
//       <div className="flex flex-1 justify-end">
//         <Button className="inline-flex gap-2 items-center rounded-md px-4 text-sm font-medium shadow">
//           <LogOut />
//           Logout
//         </Button>
//       </div>
//     </header>
//   );
// }

// export default AdminHeader;
