import React from "react";
import SendInput from "./sendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user
  );

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <>
      {selectedUser !== null ? (
        <div className="w-3/5 flex flex-col h-full">
          <div className="flex gap-6 items-center bg-gray-600 text-white rounded px-4 py-2 mb-2 cursor-pointer">
            <div className={`avatar ${isOnline ? "online" : "offline"}`}>
              <div className="w-12 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center justify-center">
                <p>{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Messages />
          </div>
          <div className="mt-auto">
            <SendInput />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <h1 className="text-3xl font-bold text-white">
            Hi, {authUser?.fullName}
          </h1>
          <h1 className="text-2xl font-bold text-white">
            Let's start a conversation
          </h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
