import React, { useState } from "react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Shield,
  Phone,
  Mic,
  Edit2,
  Trash2,
  Star,
  Users,
  Mail,
  Video,
  Zap,
  MoreVertical,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate, useLocation } from "react-router-dom";
import { SEO } from "../SEO";
import { Navbar } from "./shared/Navbar";

export const DemoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeFeature, setActiveFeature] = useState(
    (location.state as any)?.demoIndex ?? 0
  );

  const features = [
    {
      title: "No Phone Numbers",
      desc: "Sign up instantly with just your email. No SIM card or phone number required to connect globally.",
      icon: Mail,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      title: "Edit Sent Messages",
      desc: "Made a typo? Edit your messages within 10 minutes after sending them.",
      icon: Edit2,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Delete for Everyone",
      desc: "Sent to the wrong person? Delete messages for everyone in the chat seamlessly.",
      icon: Trash2,
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      title: "Star Messages",
      desc: "Bookmark important messages to quickly access them later in your favorites.",
      icon: Star,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      title: "Group Creation",
      desc: "Create powerful groups for work or friends with advanced admin controls.",
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      title: "End-to-End Encryption",
      desc: "Every message is secured with military-grade encryption. Only you and the recipient can read them.",
      icon: Shield,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Voice Messages",
      desc: "Record and send voice notes instantly with high-quality audio.",
      icon: Mic,
      color: "text-pink-500",
      bg: "bg-pink-50",
    },
    {
      title: "Unlimited Free Calls",
      desc: "Connect with friends and family using free, high-quality audio and video calls.",
      icon: Video,
      color: "text-cyan-500",
      bg: "bg-cyan-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1C1C] font-sans overflow-x-hidden selection:bg-[#F48FB1] selection:text-white">
      <SEO
        title="Live Demo | SUNSAN MESSENGER"
        description="Try the SUNSAN MESSENGER live demo to experience real-time messaging, secure chat, and modern communication features."
        url="/demo"
      />

      {/* Navbar */}
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Feature List */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
                Experience the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F48FB1] to-[#E91E8C]">
                  Sunsan Difference.
                </span>
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed max-w-md">
                Explore the features that make Sunsan the preferred choice for secure, premium communication.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-6 rounded-[24px] border transition-all cursor-pointer ${
                    activeFeature === index
                      ? "bg-white border-[#F48FB1]/55 shadow-md shadow-pink-200/20"
                      : "bg-transparent border-transparent hover:bg-pink-50/20"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${feature.bg} ${feature.color}`}
                    >
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3
                        className={`text-base font-bold mb-1 ${
                          activeFeature === index
                            ? "text-[#E91E8C]"
                            : "text-gray-800"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Interactive Demo Preview */}
          <div className="sticky top-32">
            {/* Highly visible premium glow shadow wrapper around mockup container */}
            {/* Premium iPhone 15 Pro Mockup */}
            <div className="relative mx-auto w-[280px] h-[550px] bg-[#1C1C1C] rounded-[48px] p-2.5 shadow-[0_30px_70px_rgba(233,30,140,0.18)] ring-1 ring-gray-900/10">
              {/* Screen Container */}
              <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-[#FAF8F5] flex flex-col justify-between border-[3px] border-[#0c0c0c] z-10 select-none">
                
                {/* Dynamic Island */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-5.5 bg-black rounded-full z-30 flex items-center justify-end px-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#111] border border-gray-900/50" />
                </div>

                {/* iOS Status Bar */}
                <div className="h-8 px-4 pt-1 flex justify-between items-center text-[9px] font-bold text-gray-700 shrink-0 z-20">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px]">5G</span>
                    <div className="w-4 h-2 border border-gray-700 rounded-xs p-0.5 flex items-center">
                      <div className="h-full w-full bg-gray-700 rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* App Header */}
                <div className="bg-[#FFE8F0] p-3 pt-2.5 flex items-center gap-3 border-b border-pink-100/20 shrink-0 z-10">
                  <ArrowLeft className="w-4 h-4 text-gray-500" />
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/sunsanlogo.png" />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-800 truncate">
                      Sunsan Team
                    </h4>
                    <p className="text-[10px] text-[#E91E8C] font-semibold">Online</p>
                  </div>
                  <Phone className="w-4 h-4 text-[#E91E8C]" />
                  <Video className="w-4 h-4 text-[#E91E8C] ml-1" />
                </div>

                {/* Chat Content */}
                <div className="flex-1 p-3.5 space-y-4 overflow-y-auto relative no-scrollbar">
                  {/* Background Pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{
                      backgroundImage: `url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")`,
                      backgroundRepeat: "repeat",
                    }}
                  />
                  
                  <div className="flex justify-center text-[10px] text-gray-400 my-2 z-10 relative">
                    <span className="bg-pink-50/50 px-2.5 py-0.5 rounded-full border border-pink-100/30">
                      Today
                    </span>
                  </div>

                  {/* Dynamic Messages based on selection */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4 z-10 relative"
                    >
                      {activeFeature === 0 && (
                        <div className="flex flex-col items-center justify-center h-[420px] text-center space-y-5">
                          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center animate-bounce">
                            <Mail className="w-8 h-8 text-orange-500" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">
                              Welcome to Sunsan
                            </h3>
                            <p className="text-gray-500 text-xs mt-1.5 max-w-[180px] mx-auto">
                              Sign up with your email to start chatting.
                            </p>
                          </div>
                          <div className="w-full max-w-[210px] space-y-2.5">
                            <div className="bg-[#FFE8F0] border border-pink-100/40 rounded-xl p-2.5 text-left text-xs text-gray-700">
                              user@example.com
                            </div>
                            <div className="bg-[#E91E8C] rounded-full p-2.5 text-xs font-bold text-white shadow-sm">
                              Continue with Email
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-green-600 font-semibold">
                            <Shield className="w-3.5 h-3.5" /> No phone number needed
                          </div>
                        </div>
                      )}

                      {activeFeature === 1 && (
                        <>
                          <div className="flex justify-end">
                            <div className="bg-[#E91E8C] text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] text-xs shadow-xs">
                              Hey! I'll be there at 5:00 PM.
                              <div className="flex justify-end mt-1">
                                <span className="text-[9px] text-white/70">
                                  10:30 AM
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center my-3">
                            <div className="bg-pink-50/50 px-2 py-0.5 rounded-full text-[9px] text-gray-400 border border-pink-100/30">
                              Editing message...
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <div className="bg-[#E91E8C] text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] text-xs shadow-xs ring-2 ring-pink-300">
                              Hey! I'll be there at 6:00 PM.
                              <div className="flex justify-end items-center gap-1 mt-1">
                                <span className="text-[9px] text-white/70 italic">
                                  (edited)
                                </span>
                                <span className="text-[9px] text-white/70">
                                  10:31 AM
                                </span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {activeFeature === 2 && (
                        <>
                          <div className="flex justify-end">
                            <div className="bg-[#E91E8C] text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] text-xs shadow-xs">
                              Here is the secret code: 1234
                              <div className="flex justify-end mt-1">
                                <span className="text-[9px] text-white/70">
                                  10:30 AM
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center my-3">
                            <div className="bg-red-50 text-red-500 px-2.5 py-0.5 rounded-full text-[9px] border border-red-100 flex items-center gap-1.5 font-medium">
                              <Trash2 className="w-3 h-3" /> Deleting...
                            </div>
                          </div>
                          <div className="flex justify-end w-full">
                            <div className="px-3 py-2 rounded-xl max-w-[85%] text-xs italic flex items-center gap-1.5 text-gray-400 bg-gray-50 border border-gray-100">
                              <Shield className="w-3.5 h-3.5 text-gray-400" /> You deleted this message
                            </div>
                          </div>
                        </>
                      )}

                      {activeFeature === 3 && (
                        <>
                          <div className="flex justify-start">
                            <div className="bg-white text-gray-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-xs border border-pink-100/40 shadow-xs">
                              The meeting code is{" "}
                              <span className="font-mono bg-pink-50 text-[#E91E8C] px-1 rounded font-bold">
                                SUNSAN-2026
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <div className="bg-[#E91E8C] text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] text-xs shadow-xs relative">
                              Got it! Starring this for later.
                              <div className="absolute -left-5 top-1/2 -translate-y-1/2 text-yellow-400 animate-pulse bg-white rounded-full p-0.5 shadow-sm">
                                <Star className="w-3.5 h-3.5 fill-current" />
                              </div>
                              <div className="flex justify-end items-center gap-1 mt-1">
                                <Star className="w-2.5 h-2.5 fill-white/80 text-white/80" />
                                <span className="text-[9px] text-white/70">
                                  10:32 AM
                                </span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {activeFeature === 4 && (
                        <>
                          <div className="flex justify-center mb-4">
                            <div className="bg-white p-3.5 rounded-2xl w-full max-w-[240px] border border-pink-100/40 shadow-xs text-gray-800">
                              <div className="flex items-center gap-2.5 mb-2.5 border-b border-pink-100/20 pb-2.5">
                                <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
                                  <Users className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-xs truncate">
                                    Project Alpha
                                  </div>
                                  <div className="text-[9px] text-gray-400">
                                    3 participants
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between text-[10px] text-gray-600">
                                  <span>You</span>
                                  <span className="text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-bold">
                                    Admin
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-gray-600">
                                  <span>Alice</span>
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-gray-600">
                                  <span>Bob</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-start">
                            <div className="bg-white text-gray-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-xs border border-pink-100/40 shadow-xs">
                              <span className="text-purple-500 text-[10px] font-bold block mb-0.5">
                                Alice
                              </span>
                              Added to the group! 🚀
                            </div>
                          </div>
                        </>
                      )}

                      {activeFeature === 5 && (
                        <>
                          <div className="flex justify-start">
                            <div className="bg-white text-gray-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-xs border border-pink-100/40 shadow-xs">
                              Is this chat secure? I have some confidential files to send.
                            </div>
                          </div>
                          <div className="flex justify-center my-2">
                            <div className="bg-amber-50 text-amber-600 text-[9px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-amber-100">
                              <Shield className="w-3.5 h-3.5" /> Messages are end-to-end encrypted.
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <div className="bg-[#E91E8C] text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] text-xs shadow-xs">
                              Absolutely. Sunsan uses Signal Protocol. No one can read this except us.
                              <div className="flex justify-end mt-1">
                                <span className="text-[9px] text-white/70">
                                  10:42 AM
                                </span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {activeFeature === 6 && (
                        <>
                          <div className="flex justify-end">
                            <div className="bg-[#E91E8C] text-white p-2 rounded-2xl rounded-tr-none max-w-[85%] flex items-center gap-2.5 pr-3.5 shadow-xs">
                              <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                                <Mic className="w-3.5 h-3.5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="h-1 w-20 bg-white/30 rounded-full overflow-hidden">
                                  <div className="h-full bg-white w-1/2" />
                                </div>
                                <div className="flex justify-between text-[8px] mt-0.5 text-white/80">
                                  <span>0:15</span> <span>10:45 AM</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-start">
                            <div className="bg-white text-gray-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-xs border border-pink-100/40 shadow-xs">
                              Loud and clear! I'll handle that right away.
                            </div>
                          </div>
                          <div className="flex justify-start">
                            <div className="bg-white text-gray-800 p-2 rounded-2xl rounded-tl-none max-w-[85%] flex items-center gap-2.5 pr-3.5 border border-pink-100/40 shadow-xs">
                              <div className="w-7 h-7 bg-pink-100 rounded-full flex items-center justify-center">
                                <Mic className="w-3.5 h-3.5 text-[#E91E8C]" />
                              </div>
                              <div className="flex-1">
                                <div className="h-1 w-24 bg-gray-200 rounded-full overflow-hidden">
                                  <div className="h-full bg-[#E91E8C] w-3/4" />
                                </div>
                                <div className="flex justify-between text-[8px] mt-0.5 text-gray-400">
                                  <span>0:42</span> <span>10:46 AM</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {activeFeature === 7 && (
                        <>
                          <div className="flex justify-end">
                            <div className="bg-[#E91E8C] text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] text-xs shadow-xs">
                              Hey, are you free for a quick video call?
                            </div>
                          </div>
                          <div className="flex justify-start">
                            <div className="bg-white text-gray-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-xs border border-pink-100/40 shadow-xs">
                              Always! Calling you now...
                            </div>
                          </div>
                          <div className="flex justify-center">
                            <div className="bg-white border border-pink-100/40 p-3.5 rounded-2xl flex items-center gap-3 w-full max-w-[210px] shadow-xs">
                              <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-[#E91E8C] animate-pulse">
                                <Video className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-gray-800">
                                  Incoming Video Call
                                </p>
                                <p className="text-[10px] text-gray-400">Sunny</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center text-[9px] text-gray-400">
                            Video call ended • 24:12
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Input Area */}
                <div className="bg-[#FFE8F0] p-2.5 flex items-center gap-2 shrink-0 border-t border-pink-100/10 z-10">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-gray-400">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 h-8 bg-white rounded-full border border-pink-100/40 px-3 flex items-center text-[10px] text-gray-400">
                    Type a message...
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#E91E8C] flex items-center justify-center text-white shrink-0">
                    <Mic className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* iOS Home Indicator */}
                <div className="absolute bottom-1 inset-x-0 flex justify-center z-30">
                  <div className="w-24 h-1 bg-gray-800/25 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
