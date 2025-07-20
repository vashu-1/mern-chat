import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { SOCKET_URL } from "../utils/constant";
// import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "*",
    element: <Login />,
  },
]);

const App = () => {
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socketio = io(SOCKET_URL, {
        query: {
          userId: authUser._id,
        },
      });
      dispatch(setSocket(socketio));

      socketio?.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => {
        socketio.close();
        dispatch(setSocket(null));
      };
    } else {
      dispatch(setSocket(null));
    }
  }, [authUser, dispatch]);
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
