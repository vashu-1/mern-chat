import React, { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = memo(({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  
  // Memoize online status calculation
  const isOnline = useMemo(() => 
    Array.isArray(onlineUsers) && user?._id
      ? onlineUsers.includes(user._id)
      : false,
    [onlineUsers, user?._id]
  );

  // Memoize the click handler
  const selectedUserHandler = useCallback(() => {
    dispatch(setSelectedUser(user));
  }, [dispatch, user]);

  // Memoize styling calculations
  const containerClassName = useMemo(() => 
    `${selectedUser?._id === user?._id ? "bg-white/15" : ""} flex gap-6  items-center hover:bg-white/15 rounded px-6 py-1 cursor-pointer`,
    [selectedUser?._id, user?._id]
  );

  const avatarClassName = useMemo(() => 
    `avatar ${isOnline ? "online" : "offline"}`,
    [isOnline]
  );

  const statusClassName = useMemo(() => 
    isOnline ? "text-green-500 text-sm" : "text-gray-500 text-sm",
    [isOnline]
  );

  return (
    <>
      <div
        onClick={selectedUserHandler}
        className={containerClassName}
      >
        <div className={avatarClassName}>
          <div className="w-12 rounded-full">
            <img src={user?.profilePhoto} alt="" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-center">
            <p>{user?.fullName}</p>
          </div>
          <div className={statusClassName}>
            {isOnline ? "Online" : "Offline"}
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
});

export default OtherUser;
