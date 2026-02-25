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
  const messagesEndRef = useRef(null);

  const fetchChat = async () => {
    try {
      const chat = await axios.get(CHAT + targetUserid, {
        withCredentials: true,
      });

      const chatMessage = chat?.data?.message.map((msg) => ({
        firstName: msg?.senderId?.firstName,
        text: msg?.text,
      }));

      setMessage(chatMessage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChat();
  }, [targetUserid]);

  useEffect(() => {
    if (!user) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserid,
    });

    socket.on("messageReceived", ({ firstName, text }) => {
      setMessage((prev) => [...prev, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserid, user]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserid,
      text: newMessage,
    });

    setMessage((prev) => [
      ...prev,
      { firstName: user.firstName, text: newMessage },
    ]);

    setNewMessage("");
  };

  return (
    <div className="w-full sm:w-11/12 md:w-3/4 lg:w-1/2 mx-auto mt-4 sm:mt-6 h-[85vh] flex flex-col rounded-2xl shadow-xl bg-gradient-to-br from-black to-zinc-900 text-white border border-gray-700">

      {/* Header */}
      <div className="p-4 border-b border-gray-200 text-center text-lg sm:text-xl font-semibold">
        Chat With Your Connection 💬
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 border-8">
        {message.map((msg, index) => {
          const isOwn = msg.firstName === user?.firstName;

          return (
            <div
              key={index}
              className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] sm:max-w-[60%] px-4 py-2 rounded-2xl text-sm sm:text-base shadow-md ${
                  isOwn
                    ? "bg-cyan-600 text-white rounded-br-none"
                    : "bg-white text-black rounded-bl-none"
                }`}
              >
                {!isOwn && (
                  <div className="text-xs font-semibold mb-1">
                    {msg.firstName}
                  </div>
                )}
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 sm:p-4 border-t border-gray-700 flex gap-2 sm:gap-3 items-center bg-black rounded-b-2xl">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-600 rounded-xl p-2 sm:p-3 bg-black text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Type a message..."
        />

        <button
          onClick={sendMessage}
          className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-xl shadow-md transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;