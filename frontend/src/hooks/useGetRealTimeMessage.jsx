import { useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice.js";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const { message } = useSelector((store) => store.message);
  const dispatch = useDispatch();
  const messagesRef = useRef(message);

  // Update ref when messages change
  useEffect(() => {
    messagesRef.current = message;
  }, [message]);

  // Memoized message handler to prevent recreating on each render
  const handleNewMessage = useCallback(
    (newMessage) => {
      // console.log("Received real-time message:", newMessage);
      const currentMessages = Array.isArray(messagesRef.current)
        ? messagesRef.current
        : [];
      dispatch(setMessages([...currentMessages, newMessage]));
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
