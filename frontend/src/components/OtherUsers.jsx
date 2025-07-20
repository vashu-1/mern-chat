import React, { memo, useMemo } from "react";
import OtherUser from "./OtherUser.jsx";
import useGetOtherUsers from "../hooks/useGetOtherUsers.jsx";
import { useSelector } from "react-redux";

const OtherUsers = memo(({ filteredUsers }) => {
  // Custom hook to fetch other users
  useGetOtherUsers();
  const { otherUsers } = useSelector((store) => store.user);

  // Use filtered users if provided, otherwise use all otherUsers
  const usersToDisplay = filteredUsers || otherUsers;

  // Memoize the user list to prevent unnecessary re-renders
  const userList = useMemo(() => {
    if (!Array.isArray(usersToDisplay) || usersToDisplay.length === 0) {
      return (
        <div className="text-center text-gray-500 py-4 text-sm">
          No users found
        </div>
      );
    }

    return usersToDisplay.map((user) => (
      <OtherUser key={user._id} user={user} />
    ));
  }, [usersToDisplay]);

  return <div className="overflow-auto flex-1">{userList}</div>;
});

export default OtherUsers;
