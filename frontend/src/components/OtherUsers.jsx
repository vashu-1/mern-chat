import React, { memo, useMemo } from "react";
import OtherUser from "./OtherUser.jsx";
import useGetOtherUsers from "../hooks/useGetOtherUsers.jsx";
import { useSelector } from "react-redux";

const OtherUsers = memo(() => {
  // Custom hook to fetch other users
  useGetOtherUsers();
  const { otherUsers } = useSelector((store) => store.user);

  // Memoize the user list to prevent unnecessary re-renders
  const userList = useMemo(() => {
    if (!Array.isArray(otherUsers) || otherUsers.length === 0) return null;

    return otherUsers.map((user) => <OtherUser key={user._id} user={user} />);
  }, [otherUsers]);

  // Early return if no users
  if (!Array.isArray(otherUsers) || otherUsers.length === 0) return null;

  return <div className="overflow-auto flex-1">{userList}</div>;
});

export default OtherUsers;
