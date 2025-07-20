import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const isOnline =
    Array.isArray(onlineUsers) && user?._id
      ? onlineUsers.includes(user._id)
      : false;

  const selectedUserHandler = (user) => {
    // console.log(user);

    dispatch(setSelectedUser(user));
  };
  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={`${
          selectedUser?._id === user?._id ? "bg-white/15" : ""
        } flex gap-6  items-center hover:bg-white/15 rounded px-6 py-1 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img src={user?.profilePhoto} alt="" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-center">
            <p>{user?.fullName}</p>
          </div>
          <div
            className={
              isOnline ? "text-green-500 text-sm" : "text-gray-500 text-sm"
            }
          >
            {isOnline ? "Online" : "Offline"}
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default OtherUser;
