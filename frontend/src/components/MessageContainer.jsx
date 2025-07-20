import React, { memo, useMemo, useCallback } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { IoArrowBack } from "react-icons/io5";

const MessageContainer = memo(() => {
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();

  const handleBackToUsers = useCallback(() => {
    dispatch(setSelectedUser(null));
  }, [dispatch]);

  const isOnline = useMemo(
    () => onlineUsers?.includes(selectedUser?._id),
    [onlineUsers, selectedUser?._id]
  );

  // Memoize user header content
  const userHeader = useMemo(() => {
    if (!selectedUser) return null;

    return (
      <div className="flex gap-3 md:gap-6 items-center bg-gray-600 text-white rounded px-2 md:px-4 py-2 mb-2 cursor-pointer">
        {/* Back button for mobile */}
        <button
          onClick={handleBackToUsers}
          className="md:hidden btn btn-sm btn-ghost text-white hover:bg-gray-700 p-1"
        >
          <IoArrowBack className="w-5 h-5" />
        </button>
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-8 md:w-12 rounded-full">
            <img src={selectedUser.profilePhoto} alt="" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-center">
            <p className="text-sm md:text-base font-medium truncate">
              {selectedUser.fullName}
            </p>
          </div>
        </div>
      </div>
    );
  }, [selectedUser, isOnline, handleBackToUsers]);

  const welcomeMessage = useMemo(
    () => (
      <div className="flex flex-col items-center justify-center h-full w-full px-4">
        <h1 className="text-xl md:text-3xl font-bold text-white text-center mb-2">
          Hi, {authUser?.fullName}
        </h1>
        <h1 className="text-lg md:text-2xl font-bold text-white text-center">
          Let's start a conversation
        </h1>
      </div>
    ),
    [authUser?.fullName]
  );

  return (
    <>
      {selectedUser !== null ? (
        <div className="w-full md:w-3/5 flex flex-col h-full bg-transparent">
          {/* Fixed Header - Always visible */}
          <div className="flex-shrink-0 bg-inherit">{userHeader}</div>

          {/* Scrollable Messages Area */}
          <div className="flex-1 overflow-hidden min-h-0 messages-scroll-container">
            <Messages />
          </div>

          {/* Fixed Send Input - Always visible at bottom */}
          <div className="flex-shrink-0 bg-inherit">
            <SendInput />
          </div>
        </div>
      ) : (
        welcomeMessage
      )}
    </>
  );
});

export default MessageContainer;
