import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "./utils/socket";
import { useSelector } from "react-redux";
import { CHAT } from "./utils/constant";
import axios from 'axios'

function Chat() {
  const { targetUserid } = useParams();
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChat=async()=>{
     try {

       const chat=await axios.get(CHAT+targetUserid,{
        withCredentials:true,
       });

       console.log("chat",chat);
       const chatMessage=chat?.data?.message.map((msg)=>{
        return {
          firstName:msg?.senderId?.firstName,
          LastName:msg?.senderId?.LastName,
          text:msg?.text}
       })
       setMessage(chatMessage)

      
     } catch (error) {
        console.log(error)
     }
  }

  useEffect(()=>{
     fetchChat()
  })

  useEffect(() => {
    if (!user) return;

    // Create a single socket connection
    const socket = createSocketConnection();

    // Join the chat
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserid,
    });

    // Handle incoming messages
    socket.on("messageReceived", ({ firstName, text }) => {
      setMessage((prevMessages) => [...prevMessages, { firstName, text }]);
    });

    // Cleanup the socket connection
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserid, user]);

  const sendMessage = () => {
    if (!newMessage.trim()) return; 

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserid,
      text: newMessage,
    });

    setNewMessage(""); 
  };

  return (
    <>
      <div className="w-3/4 md:w-1/2 mx-auto border-4 border-gray-600 m-5 h-[70vh] flex flex-col rounded-lg shadow-lg bg-gradient-to-r  from-black to bg-zinc-50 text-white">
        <h1 className="p-5 border-b-2 border-gray-600 text-center text-xl font-bold bg-gradient-to-r from-black to-bg-zinc-50 text-white rounded-t-lg">
          Chat With Your Connection ✅
        </h1>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {message.map((msg, index) => (
            <div key={index} className="chat chat-start">
              <div className="chat-heade">
                {`${msg.firstName}`}
                <time className="text-xs opacity-50"> 12:45</time>
              </div>
              <div className="chat-bubble bg-white text-black">{msg.text}</div>
              <div className="chat-footer opacity-50">Delivered ✅✅</div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-600 flex gap-3 items-center bg-gradient-to-r from-black to bg-zinc-50 rounded-b-lg">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border border-gray-500 rounded-lg p-3 bg-black text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="message..."
          ></input>

          <button
            onClick={sendMessage}
            className="px-5 py-3 border-2 font-medium text-white bg-gradient bg-black text-red hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-cyan-300 rounded-lg shadow-md"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
