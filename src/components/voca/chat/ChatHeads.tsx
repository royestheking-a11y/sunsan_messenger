import React, { useState, useRef, useEffect } from "react";
import { useVoca } from "../VocaContext";
import { useSocket } from "../SocketContext";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Maximize2, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";

export const ChatHeads = () => {
  const navigate = useNavigate();
  const {
    chatHeads,
    setChatHeads,
    activeMiniChatId,
    setActiveMiniChatId,
    chats,
    currentUser,
    sendMessage,
  } = useVoca();

  const { onlineUsers, typingUsers } = useSocket();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages in mini chat box
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeMiniChatId, chats]);

  if (!currentUser || chatHeads.length === 0) return null;

  const activeChat = chats.find((c) => c.id === activeMiniChatId);
  const activeChatHead = chatHeads.find((h) => h.chatId === activeMiniChatId);
  const activeMessages = activeChat ? activeChat.messages : [];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeMiniChatId) return;

    try {
      const textToSend = inputText;
      setInputText("");
      await sendMessage(activeMiniChatId, textToSend, "text");
    } catch (error) {
      console.error("Failed to send message in mini chat:", error);
    }
  };

  const handleDismiss = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    setChatHeads((prev) => prev.filter((ch) => ch.chatId !== chatId));
    if (activeMiniChatId === chatId) {
      setActiveMiniChatId(null);
    }
  };

  const handleOpenMiniChat = (chatId: string) => {
    if (activeMiniChatId === chatId) {
      setActiveMiniChatId(null);
    } else {
      setActiveMiniChatId(chatId);
      // Mark as read
      const chat = chats.find((c) => c.id === chatId);
      if (chat && chat.unreadCount > 0) {
        setChatHeads((prev) =>
          prev.map((ch) => (ch.chatId === chatId ? { ...ch, unreadCount: 0 } : ch))
        );
      }
    }
  };

  const handleExpandToFull = () => {
    if (!activeMiniChatId) return;
    const chatId = activeMiniChatId;
    setActiveMiniChatId(null);
    setChatHeads((prev) => prev.filter((ch) => ch.chatId !== chatId));
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 select-none">
      {/* Floating Chat Heads Stack (Draggable & Clickable) */}
      <div className="absolute right-6 bottom-24 flex flex-col gap-4 items-end pointer-events-auto">
        <AnimatePresence>
          {chatHeads.map((head, index) => {
            const isOnline = onlineUsers.has(head.participant.id);
            const isTyping = typingUsers.get(head.chatId) === head.participant.id;
            const isActive = activeMiniChatId === head.chatId;

            return (
              <motion.div
                key={head.chatId}
                initial={{ opacity: 0, scale: 0.5, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.5, x: 50 }}
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer"
                onClick={() => handleOpenMiniChat(head.chatId)}
              >
                {/* Chat Head Avatar Container */}
                <div className={`p-1.5 rounded-full bg-white shadow-xl border-2 transition-all duration-300 ${
                  isActive ? "border-[#E91E8C] scale-110" : "border-pink-100 hover:border-pink-300"
                }`}>
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={head.participant.avatar} />
                    <AvatarFallback className="bg-pink-100 text-[#E91E8C] font-bold">
                      {head.participant.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Presence Indicator */}
                  {isOnline && (
                    <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>

                {/* Unread Count Badge */}
                {head.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                    {head.unreadCount}
                  </span>
                )}

                {/* Typing Indicator Overlay */}
                {isTyping && (
                  <span className="absolute -bottom-1 -left-1 bg-pink-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-xs">
                    typing...
                  </span>
                )}

                {/* Hover Close Button */}
                <button
                  onClick={(e) => handleDismiss(e, head.chatId)}
                  className="absolute -top-2 -left-2 bg-gray-900/80 hover:bg-gray-900 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {/* Hover Tooltip (Participant Name) */}
                <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-md">
                  {head.participant.name}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Mini Chat Box Popup Window */}
      <AnimatePresence>
        {activeMiniChatId && activeChatHead && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="absolute right-24 bottom-24 w-[340px] h-[450px] bg-white rounded-[32px] border border-pink-100 shadow-2xl flex flex-col pointer-events-auto overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-pink-50 to-white border-b border-pink-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-9 h-9">
                  <AvatarImage src={activeChatHead.participant.avatar} />
                  <AvatarFallback className="bg-pink-100 text-[#E91E8C] font-bold">
                    {activeChatHead.participant.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800 line-clamp-1">
                    {activeChatHead.participant.name}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {onlineUsers.has(activeChatHead.participant.id) ? (
                      <span className="text-green-500 font-semibold">Online</span>
                    ) : (
                      "Offline"
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleExpandToFull}
                  title="Expand to Full Chat"
                  className="p-1.5 hover:bg-pink-50 rounded-full text-gray-400 hover:text-[#E91E8C] transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveMiniChatId(null)}
                  className="p-1.5 hover:bg-pink-50 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF8F5]/30">
              {activeMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-[#E91E8C] mb-2">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-gray-400 font-medium">
                    No messages yet. Send a wave!
                  </p>
                </div>
              ) : (
                activeMessages.map((msg) => {
                  const isOwn = msg.senderId === currentUser.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-xs shadow-xs ${
                        isOwn
                          ? "bg-[#E91E8C] text-white rounded-br-none"
                          : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-pink-50 bg-white flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-100 rounded-full px-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-pink-300 focus:bg-white transition-all"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputText.trim()}
                className="bg-[#E91E8C] hover:bg-[#c2185b] text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md shadow-pink-500/10 border-none transition-transform active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
