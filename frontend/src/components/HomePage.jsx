import React from "react";
import MessageContainer from "./MessageContainer.jsx";
import Sidebar from "./Sidebar.jsx";

function HomePage() {
  return (
    <div className="flex gap-2 sm:h-[450px] md:h-[550px] w-4xl  overflow-hidden  bg-clip-padding backdrop-blur-xl bg-white/3 border border-white/30 rounded-2xl shadow-2xl bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
}

export default HomePage;
