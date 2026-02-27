import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "./utils/socket";
import { useSelector } from "react-redux";
import { CHAT } from "./utils/constant";
import axios from "axios";

function Chat() {
  const { targetUserid } = useParams();
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // 1. Purani Chat History load karna
  const fetchChat = async () => {
    try {
      const res = await axios.get(CHAT + "/" + targetUserid, {
        withCredentials: true,
      });

      const chatMessage = res?.data?.message.map((msg) => ({
        // Backend se agar senderId populate hoke aa rahi hai toh uska naam lo
        firstName: msg?.senderId?.firstName || (msg?.senderId === userId ? user?.firstName : "User"), 
        text: msg?.text,
      }));

      setMessage(chatMessage);
    } catch (error) {
      console.log("Chat fetch error:", error);
    }
  };

  useEffect(() => {
    fetchChat();
  }, [targetUserid]);

  // 2. Real-time Socket Logic (Duplicate Fix ke saath)
  useEffect(() => {
    if (!user) return;

    socketRef.current = createSocketConnection();

    socketRef.current.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserid,
    });

    // Pehle listener hatao taaki multiple triggers na ho
    socketRef.current.off("messageReceived");

    socketRef.current.on("messageReceived", ({ firstName, text }) => {
      // DUPLICATE FIX: Agar message maine bhej hai, toh use dobara state mein mat daalo
      // Kyunki sendMessage function ne ise pehle hi local state mein add kar diya hai
      setMessage((prev) => {
        const isDuplicate = prev.length > 0 && 
                            prev[prev.length - 1].text === text && 
                            prev[prev.length - 1].firstName === firstName;
        
        if (isDuplicate || firstName === user?.firstName) {
          return prev;
        }
        return [...prev, { firstName, text }];
      });
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userId, targetUserid, user]);

  // 3. Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socketRef.current) return;

    // Server ko message bhejo
    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserid,
      text: newMessage,
    });

    // UI ko turant update karo (Self message)
    setMessage((prev) => [
      ...prev,
      { firstName: user.firstName, text: newMessage },
    ]);

    setNewMessage("");
  };

  return (
    <div className="w-full sm:w-11/12 md:w-3/4 lg:w-1/2 mx-auto mt-4 sm:mt-6 h-[85vh] flex flex-col rounded-2xl shadow-xl bg-gradient-to-br  text-white border border-gray-700">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-700 text-center text-lg sm:text-xl font-semibold bg-zinc-900 rounded-t-2xl">
        Chat With Your Connection 💬
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 custom-scrollbar">
        {message.map((msg, index) => {
          const isOwn = msg.firstName === user?.firstName;

          return (
            <div key={index} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
              <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"}`}>
                
                {/* Name Display */}
                <span className="text-[10px] font-bold mb-1 px-1 uppercase opacity-60">
                  {isOwn ? "You" : msg.firstName}
                </span>

                {/* Message Bubble */}
                <div
                  className={`max-w-[65%] sm:max-w-[70%] px-10 py-2 rounded-2xl text-sm sm:text-base shadow-lg ${
                    isOwn 
                      ? "bg-cyan-600 text-white rounded-br-none" 
                      : "bg-zinc-800 text-gray-100 rounded-bl-none border border-gray-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-10 sm:p-4 border-t border-gray-700 bg-zinc-950 rounded-b-2xl">
        <div className="flex gap-2 items-center bg-zinc-900 rounded-xl px-3 py-1 border border-gray-800 focus-within:border-cyan-500 transition-all">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 bg-transparent py-3 text-white focus:outline-none text-sm sm:text-base"
            placeholder="Write something...!!"
          />
          <button
            onClick={sendMessage}
            className="p-2 text-cyan-500 hover:text-cyan-400 font-bold transition-colors"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;