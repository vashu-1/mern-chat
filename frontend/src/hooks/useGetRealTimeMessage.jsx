import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice.js";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const { message } = useSelector((store) => store.message);
  const dispatch = useDispatch();

  // Memoized message handler to prevent recreating on each render
  const handleNewMessage = useCallback(
    (newMessage) => {
      // console.log("Received real-time message:", newMessage);
      const currentMessages = Array.isArray(message) ? message : [];
      dispatch(setMessages([...currentMessages, newMessage]));
    },
    [dispatch, message]
  );

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, handleNewMessage]);
};

export default useGetRealTimeMessage;
