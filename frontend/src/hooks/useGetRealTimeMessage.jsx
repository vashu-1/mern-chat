import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice.js";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  // Memoized message handler to prevent recreating on each render
  const handleNewMessage = useCallback(
    (newMessage) => {
      // console.log("Received real-time message:", newMessage);
      dispatch((currentState) => {
        const currentMessages = currentState.message.message;
        return setMessages([...currentMessages, newMessage]);
      });
    },
    [dispatch]
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
