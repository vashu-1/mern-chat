import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice.js";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const { message } = useSelector((store) => store.message);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!socket) return;
    const handleNewMessage = (newMessage) => {
      // console.log("Received real-time message:", newMessage);
      dispatch(setMessages([...message, newMessage]));
    };
    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, message, dispatch]);
};

export default useGetRealTimeMessage;
