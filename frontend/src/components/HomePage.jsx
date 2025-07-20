import React, { memo } from "react";
import MessageContainer from "./MessageContainer.jsx";
import Sidebar from "./Sidebar.jsx";
import { useSelector } from "react-redux";

const HomePage = memo(() => {
  const { selectedUser } = useSelector((store) => store.user);

  return (
    <div className="flex flex-col md:flex-row gap-1 md:gap-2 h-screen md:h-[450px] lg:h-[550px] w-full max-w-sm md:max-w-4xl lg:max-w-6xl mx-auto p-2 md:p-0 overflow-hidden bg-clip-padding backdrop-blur-xl bg-white/3 border border-white/30 rounded-lg md:rounded-2xl shadow-2xl bg-opacity-0">
      {/* Mobile View: Show Sidebar when no user selected, MessageContainer when user selected */}
      <div className="flex md:hidden flex-1 h-full min-h-0">
        {!selectedUser ? <Sidebar /> : <MessageContainer />}
      </div>

      {/* Desktop View: Show both side by side */}
      <div className="hidden md:flex flex-1 gap-2">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
});

export default HomePage;
