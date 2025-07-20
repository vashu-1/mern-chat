import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useSelector((store) => store.user);

  // console.log("ProtectedRoute - authUser:", authUser); // Debug log

  if (!authUser) {
    // console.log("Redirecting to login page"); // Debug log
    return <Navigate to="/" replace />;
  }

  // console.log("User authenticated, rendering children"); // Debug log
  // If user is authenticated, render the protected component
  return children || null;
};

export default ProtectedRoute;
