import React, { useEffect, useState } from "react";
import { Advertisement } from "../../lib/data";
import { adsAPI } from "../../lib/api";
import { Button } from "../ui/button";
import {
  ArrowRight,
  Shield,
  Globe,
  Zap,
  MessageCircle,
  Lock,
  Smartphone,
  Menu,
  Mail,
  Edit2,
  Users,
  Video,
  Mic,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Phone,
  Camera,
  Laptop,
  Check,
  Search,
  Volume2,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { SEO } from "../SEO";
import { Navbar } from "./shared/Navbar";

export const LandingPage = () => {
  const navigate = useNavigate();
  const [landingAd, setLandingAd] = useState<Advertisement | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const ads = await adsAPI.getActive();
        const ad = ads.find(
          (a: Advertisement) => a.position === "landing_page"
        );
        if (ad) {
          setLandingAd(ad);
          adsAPI.view(ad.id).catch(console.error);
        }
      } catch (err) {
        console.error("Failed to fetch ads:", err);
      }
    };
    fetchAds();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1C1C] selection:bg-[#F48FB1] selection:text-white font-sans overflow-x-hidden">
      <SEO
        title="SUNSAN MESSENGER | Secure & Private Messaging Platform"
        description="Sunsan Messenger is a secure, privacy-first messaging platform offering real-time chat, voice and video calls, and encrypted communication using email-based login."
        url="/"
      />

      {/* Navbar */}
      <Navbar />

      {/* Hero Banner Section */}
      <section className="pt-28 pb-16 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full min-h-[500px] md:min-h-[560px] rounded-[36px] overflow-hidden shadow-2xl flex items-center"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center z-0 scale-105"
            style={{ backgroundImage: "url('/sunsan_hero_banner.png')" }}
          />
          {/* High Contrast Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

          {/* Content */}
          <div className="relative z-20 px-8 sm:px-16 py-12 max-w-2xl text-white">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none mb-6">
              Message privately
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-md font-normal mb-8">
              Simple, reliable, private messaging and calling for free*, available all over the world.
            </p>
            <Button
              size="lg"
              className="bg-[#E91E8C] hover:bg-[#c2185b] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-pink-500/30 transition-transform hover:scale-105 border-none flex items-center gap-2"
              onClick={() => navigate("/signup")}
            >
              Download <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-[11px] text-white/50 mt-12">
              * Data charges may apply. Contact your provider for details.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Ad Section */}
      {landingAd && (
        <section className="py-8 max-w-7xl mx-auto px-6">
          <div
            className="relative overflow-hidden rounded-[28px] bg-white border border-pink-100 p-8 shadow-sm cursor-pointer group hover:shadow-md transition-shadow"
            onClick={() => {
              adsAPI.click(landingAd.id).catch(console.error);
              if (landingAd.link) window.open(landingAd.link, "_blank");
            }}
          >
            <div className="absolute top-0 right-0 p-4">
              <span className="text-[10px] text-gray-400 border border-gray-100 px-2 py-0.5 rounded uppercase tracking-wide">
                Sponsored
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {landingAd.imageUrl && (
                <img
                  src={landingAd.imageUrl}
                  alt={landingAd.title}
                  className="w-full md:w-1/3 rounded-2xl object-cover shadow-sm"
                />
              )}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-800">
                  {landingAd.title}
                </h3>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-4">
                  {landingAd.content}
                </p>
                {landingAd.link && (
                  <Button className="bg-[#E91E8C] hover:bg-[#c2185b] text-white rounded-full px-6 border-none text-xs">
                    Learn More <ArrowRight className="ml-2 w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 1: Voice & Video Calls (Screenshot 2 layout) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1C1C1C] leading-[1.15] tracking-tight">
              Never miss a moment with voice and video calls
            </h2>
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-md">
              From a group call to classmates to a quick call with mom, feel like you're in the same room with voice and video calls.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate("/features")}
                className="inline-flex items-center gap-2 text-lg font-semibold text-[#E91E8C] hover:text-[#c2185b] border-b-2 border-[#E91E8C] pb-0.5 hover:pb-1 transition-all"
              >
                Learn more <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ Basket: true, once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            {/* Premium iPhone 15 Pro Video Call Mockup */}
            <div className="relative mx-auto w-[280px] h-[550px] bg-[#1C1C1C] rounded-[48px] p-2.5 shadow-[0_25px_60px_rgba(233,30,140,0.15)] ring-1 ring-gray-900/10">
              {/* Screen Container */}
              <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-[#0c141a] flex flex-col justify-between p-3.5 text-white border-[3px] border-[#0c0c0c] z-10 select-none">
                
                {/* Dynamic Island */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-5.5 bg-black rounded-full z-30 flex items-center justify-end px-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#111] border border-gray-900/50" />
                </div>

                {/* Status Bar */}
                <div className="h-8 px-2 pt-1 flex justify-between items-center text-[9px] font-bold text-white/80 shrink-0 z-20">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px]">5G</span>
                    <div className="w-4 h-2 border border-white/60 rounded-xs p-0.5 flex items-center">
                      <div className="h-full w-full bg-white/80 rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="pt-2 flex justify-center items-center text-[9px] opacity-75 font-semibold z-10">
                  <span className="flex items-center gap-1 bg-black/35 px-2 py-0.5 rounded-full">
                    <Shield className="w-3 h-3 text-[#F48FB1]" /> E2E Encrypted
                  </span>
                </div>

                {/* 4 Participant Grid */}
                <div className="flex-1 my-3 grid grid-cols-2 gap-2 z-10">
                  <div className="bg-gray-800 rounded-2xl overflow-hidden relative flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#E91E8C] text-white flex items-center justify-center text-lg font-bold">M</div>
                    <span className="absolute bottom-1.5 left-1.5 text-[8px] bg-black/40 px-1.5 py-0.5 rounded-md">Mom</span>
                  </div>
                  <div className="bg-gray-800 rounded-2xl overflow-hidden relative flex items-center justify-center border border-pink-300/40">
                    <div className="w-12 h-12 rounded-full bg-[#9c27b0] text-white flex items-center justify-center text-lg font-bold">S</div>
                    <span className="absolute bottom-1.5 left-1.5 text-[8px] bg-black/40 px-1.5 py-0.5 rounded-md">Sarah</span>
                  </div>
                  <div className="bg-gray-800 rounded-2xl overflow-hidden relative flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#00bcd4] text-white flex items-center justify-center text-lg font-bold">J</div>
                    <span className="absolute bottom-1.5 left-1.5 text-[8px] bg-black/40 px-1.5 py-0.5 rounded-md">John</span>
                  </div>
                  <div className="bg-gray-800 rounded-2xl overflow-hidden relative flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#ff9800] text-white flex items-center justify-center text-lg font-bold">Y</div>
                    <span className="absolute bottom-1.5 left-1.5 text-[8px] bg-black/40 px-1.5 py-0.5 rounded-md">You</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="bg-[#1C1C1C] rounded-2xl p-2.5 flex justify-around items-center shrink-0 shadow-lg border border-white/5 z-10">
                  <button className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"><Mic className="w-3.5 h-3.5" /></button>
                  <button className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"><Volume2 className="w-3.5 h-3.5" /></button>
                  <button className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"><Camera className="w-3.5 h-3.5" /></button>
                  <button className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center shadow-md"><Phone className="w-4 h-4 transform rotate-[135deg]" /></button>
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-1 inset-x-0 flex justify-center z-30">
                  <div className="w-24 h-1 bg-white/30 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Large Screen (Screenshot 3 layout) */}
      <section className="py-20 px-6 bg-pink-50/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1 flex justify-center"
          >
            {/* Desktop Mockup */}
            <div className="bg-[#1e1e1e] rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col w-full max-w-lg h-[340px] md:h-[380px]">
              {/* OS Titlebar */}
              <div className="bg-[#2d2d2d] h-9 px-4 flex items-center justify-between shrink-0 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-[10px] text-gray-500 font-mono">Sunsan Web</span>
                <div className="w-10" />
              </div>
              {/* App Body */}
              <div className="flex-1 flex overflow-hidden text-xs">
                {/* Sidebar */}
                <div className="w-1/3 bg-[#121b22] border-r border-white/5 flex flex-col">
                  <div className="p-3 bg-[#202c33] border-b border-white/5 flex items-center justify-between">
                    <div className="w-6 h-6 rounded-full bg-[#E91E8C]" />
                    <div className="flex gap-2 text-gray-400">
                      <MessageCircle className="w-4 h-4" />
                      <MoreVertical className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    <div className="p-2 rounded bg-white/5 flex items-center gap-2 border-l-2 border-[#E91E8C]">
                      <div className="w-7 h-7 rounded-full bg-pink-300 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white truncate">Sanju</p>
                        <p className="text-[10px] text-gray-400 truncate">Typing...</p>
                      </div>
                    </div>
                    <div className="p-2 rounded flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-300 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white/80 truncate">Alif</p>
                        <p className="text-[10px] text-gray-400 truncate">Voice note (0:15)</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Chat window */}
                <div className="flex-1 bg-[#0b141a] flex flex-col justify-between">
                  <div className="p-3 bg-[#202c33] flex items-center justify-between border-b border-white/5 text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-pink-300" />
                      <span className="font-bold">Sanju Monowara</span>
                    </div>
                  </div>
                  <div className="flex-1 p-3 space-y-2 overflow-y-auto">
                    <div className="flex justify-start">
                      <div className="p-2 bg-[#202c33] text-white/95 rounded-lg rounded-tl-none max-w-[80%]">
                        Did you download the Mac app? It's amazing! 🚀
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="p-2 bg-[#005c4b] text-white rounded-lg rounded-tr-none max-w-[80%]">
                        Yes, downloading now! The pink layout rules! 💕
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-[#202c33] flex items-center gap-2">
                    <div className="flex-1 bg-[#2a3942] rounded-lg h-7 px-3 flex items-center text-gray-400">Type a message</div>
                    <div className="w-7 h-7 rounded-full bg-[#E91E8C] flex items-center justify-center text-white"><ArrowRight className="w-4 h-4" /></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2 space-y-6"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1C1C1C] leading-[1.15] tracking-tight">
              Chat and call on a larger screen
            </h2>
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-md">
              View messages, photos, videos and documents on a larger screen with Sunsan for Web and Desktop.
            </p>
            <div className="pt-2">
              <Button
                onClick={() => navigate("/download")}
                className="bg-[#E91E8C] hover:bg-[#c2185b] text-white rounded-full px-8 py-6 text-sm font-semibold shadow-md transition-transform hover:scale-105 border-none"
              >
                Download Mac app
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Sunsan Business (Screenshot 4 layout) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1C1C1C] leading-[1.15] tracking-tight">
              Transform your business
            </h2>
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-md">
              Sunsan Business helps you reach your customers globally to deliver compelling experiences at scale. Showcase your products and services, increase sales, and build relationships all with Sunsan.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate("/features")}
                className="inline-flex items-center gap-2 text-lg font-semibold text-[#E91E8C] hover:text-[#c2185b] border-b-2 border-[#E91E8C] pb-0.5 hover:pb-1 transition-all"
              >
                Learn more <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            {/* Premium iPhone 15 Pro Business Mockup */}
            <div className="relative mx-auto w-[280px] h-[550px] bg-[#1C1C1C] rounded-[48px] p-2.5 shadow-[0_25px_60px_rgba(233,30,140,0.15)] ring-1 ring-gray-900/10">
              {/* Screen Container */}
              <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-white flex flex-col justify-between text-gray-800 border-[3px] border-[#0c0c0c] z-10 select-none">
                
                {/* Dynamic Island */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-5.5 bg-black rounded-full z-30 flex items-center justify-end px-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#111] border border-gray-900/50" />
                </div>

                {/* Status Bar */}
                <div className="h-8 px-4 pt-1 flex justify-between items-center text-[9px] font-bold text-gray-700 shrink-0 z-20">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px]">5G</span>
                    <div className="w-4 h-2 border border-gray-700 rounded-xs p-0.5 flex items-center">
                      <div className="h-full w-full bg-gray-700 rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* Business Header */}
                <div className="pt-2 px-4 pb-3 bg-[#E91E8C] text-white flex items-center gap-2 shrink-0 shadow-xs z-10">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">J</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs truncate">JioMart Shop</h4>
                    <p className="text-[9px] opacity-80">Catalog • Verified Business</p>
                  </div>
                </div>

                {/* Shop Area */}
                <div className="flex-1 overflow-y-auto p-3 space-y-4 text-left z-10">
                  {/* Categories Row */}
                  <div>
                    <h5 className="font-bold text-[10px] uppercase tracking-wider text-gray-400 mb-2">Categories</h5>
                    <div className="flex gap-1.5 overflow-x-auto pb-1 text-[9px] no-scrollbar">
                      <span className="px-2.5 py-1 bg-pink-100 text-[#E91E8C] rounded-full font-bold shrink-0">Fruits & Veg</span>
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full shrink-0">Bakery</span>
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full shrink-0">Drinks</span>
                    </div>
                  </div>

                  {/* Items Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-2 text-center shadow-2xs">
                      <div className="w-10 h-10 bg-red-100 rounded-lg mx-auto flex items-center justify-center text-lg mb-2">🍎</div>
                      <p className="font-bold text-[10px] text-gray-700 truncate">Apples</p>
                      <p className="text-[#E91E8C] font-extrabold text-[9px]">$2.99 / kg</p>
                      <button className="mt-2 w-full py-1 bg-pink-50 hover:bg-pink-100 text-[#E91E8C] text-[9px] font-bold rounded-lg border border-pink-100">Add</button>
                    </div>
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-2 text-center shadow-2xs">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg mx-auto flex items-center justify-center text-lg mb-2">🍌</div>
                      <p className="font-bold text-[10px] text-gray-700 truncate">Bananas</p>
                      <p className="text-[#E91E8C] font-extrabold text-[9px]">$1.49 / kg</p>
                      <button className="mt-2 w-full py-1 bg-pink-50 hover:bg-pink-100 text-[#E91E8C] text-[9px] font-bold rounded-lg border border-pink-100">Add</button>
                    </div>
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="bg-gray-50 border-t border-gray-100 h-10 px-4 flex items-center justify-between text-gray-400 shrink-0 text-xs z-10">
                  <Search className="w-4 h-4" />
                  <span className="font-semibold text-[10px] text-[#E91E8C]">View Cart (2)</span>
                  <span className="w-4" />
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-1 inset-x-0 flex justify-center z-30">
                  <div className="w-24 h-1 bg-gray-800/20 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 bg-pink-50/10 border-t border-pink-100/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              Why choose{" "}
              <span className="bg-gradient-to-r from-[#F48FB1] to-[#E91E8C] bg-clip-text text-transparent">
                SUNSAN?
              </span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              We didn't just build another chat app. We engineered a secure, standard-compliant communication platform.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Mail,
                title: "No Phone Numbers",
                desc: "Sign up instantly with just your email address. No SIM card or phone number required to connect.",
                demoIndex: 0,
              },
              {
                icon: Video,
                title: "Unlimited Free Calls",
                desc: "Connect with friends and family using free, high-quality audio and video calls, anytime, anywhere.",
                demoIndex: 7,
              },
              {
                icon: Lock,
                title: "End-to-End Encryption",
                desc: "Your conversations are yours alone. Only you and the recipient can read them. Not even Sunsan.",
                demoIndex: 5,
              },
              {
                icon: Mic,
                title: "Voice Messages",
                desc: "Record and send voice notes instantly with high-quality audio. Perfect for when typing isn't an option.",
                demoIndex: 6,
              },
              {
                icon: Edit2,
                title: "Edit Messages",
                desc: "Made a typo? Edit your sent messages instantly. You have full control over your conversation.",
                demoIndex: 1,
              },
              {
                icon: Users,
                title: "Group Creation",
                desc: "Create powerful groups for work, family, or friends with advanced admin controls and features.",
                demoIndex: 4,
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                onClick={() =>
                  navigate("/demo", { state: { demoIndex: feature.demoIndex } })
                }
                className="p-8 rounded-[28px] bg-white border border-pink-100/50 hover:border-pink-200 hover:shadow-lg hover:shadow-pink-100/20 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-[#E91E8C] mb-6 group-hover:bg-pink-100/50 transition-colors">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white border-t border-pink-100/20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-500">
              Everything you need to know about Sunsan Messenger.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                q: "Is Sunsan Messenger really free?",
                a: "Yes, Sunsan Messenger is completely free to use for individual users, including unlimited messaging and audio/video calls.",
              },
              {
                q: "How does the encryption work?",
                a: "We use industry-standard end-to-end encryption. Your messages are encrypted on your device and only decrypted on the recipient's device. We cannot read your messages.",
              },
              {
                q: "Do I need a phone number to sign up?",
                a: "No! Unlike other messaging apps, Sunsan only requires an email address. This protects your privacy and avoids SIM-swapping risks.",
              },
              {
                q: "Can I use Sunsan on multiple devices?",
                a: "Yes, your account seamlessly syncs across your phone, tablet, and desktop so you can continue the conversation anywhere.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-[#FAF8F5]/80 border border-pink-100/50 rounded-2xl px-6 py-1.5 shadow-xs data-[state=open]:bg-white transition-colors"
              >
                <AccordionTrigger className="text-left font-bold text-gray-800 text-base sm:text-lg hover:text-[#E91E8C] hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 text-sm md:text-base leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-pink-50/10 border-t border-pink-100/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
                Get in{" "}
                <span className="text-[#E91E8C]">
                  Touch
                </span>
              </h2>
              <p className="text-base text-gray-500 mb-8 max-w-lg">
                Have questions or need help? Our support team is available to assist you with any inquiries.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-pink-100 flex items-center justify-center text-[#E91E8C] shadow-xs">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">
                      Email Support
                    </h4>
                    <p className="text-gray-500 text-sm">support@sunsanmessenger.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-pink-100 flex items-center justify-center text-[#E91E8C] shadow-xs">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">
                      Live Chat
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Available in-app 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-pink-100 shadow-lg shadow-pink-100/5">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#F48FB1] focus:ring-2 focus:ring-[#F48FB1]/10 transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#F48FB1] focus:ring-2 focus:ring-[#F48FB1]/10 transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#F48FB1] focus:ring-2 focus:ring-[#F48FB1]/10 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-[#FAF8F5] border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#F48FB1] focus:ring-2 focus:ring-[#F48FB1]/10 transition-all resize-none"
                    placeholder="How can we help?"
                  ></textarea>
                </div>
                <button className="w-full bg-[#E91E8C] hover:bg-[#c2185b] text-white rounded-xl py-3.5 font-bold shadow-md shadow-pink-500/10 hover:opacity-95 transition-all active:scale-[0.99]">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#FAF8F5] to-pink-50/30 border-t border-pink-100/20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#F48FB1] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-gray-900 tracking-tight">
            Ready to join the conversation?
          </h2>
          <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
            Join thousands of users who trust Sunsan for their daily secure communication.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="h-14 px-8 text-base bg-[#E91E8C] hover:bg-[#c2185b] text-white rounded-full font-semibold shadow-md shadow-pink-500/15 transition-transform hover:-translate-y-0.5 border-none"
              onClick={() => navigate("/signup")}
            >
              Create Free Account
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-full shadow-xs transition-transform hover:-translate-y-0.5"
              onClick={() => navigate("/download")}
            >
              Download App
            </Button>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="pt-20 pb-10 border-t border-gray-200/40 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex flex-col justify-center items-start mb-6">
              <span className="text-3xl font-black tracking-tight bg-gradient-to-r from-[#F48FB1] to-[#E91E8C] bg-clip-text text-transparent leading-none mb-1">
                SUNSAN
              </span>
              <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase leading-none">
                MESSENGER
              </span>
            </div>
            <p className="text-gray-500 mb-8 max-w-sm leading-relaxed text-sm">
              The next generation secure messaging platform. Fast, private, and beautifully designed for your daily communication needs.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center text-[#F48FB1] hover:bg-[#F48FB1] hover:text-white transition-colors"
              >
                <Twitter className="w-4.5 h-4.5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center text-[#F48FB1] hover:bg-[#F48FB1] hover:text-white transition-colors"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center text-[#F48FB1] hover:bg-[#F48FB1] hover:text-white transition-colors"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center text-[#F48FB1] hover:bg-[#F48FB1] hover:text-white transition-colors"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-6 uppercase text-xs tracking-wider">
              Product
            </h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>
                <button onClick={() => navigate("/features")} className="hover:text-[#E91E8C] transition-colors">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/security")} className="hover:text-[#E91E8C] transition-colors">
                  Security
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/download")} className="hover:text-[#E91E8C] transition-colors">
                  Download
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/demo")} className="hover:text-[#E91E8C] transition-colors">
                  Interactive Demo
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-6 uppercase text-xs tracking-wider">
              Company
            </h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>
                <button onClick={() => navigate("/about")} className="hover:text-[#E91E8C] transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/blog")} className="hover:text-[#E91E8C] transition-colors">
                  Blog
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/careers")} className="hover:text-[#E91E8C] transition-colors">
                  Careers
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/contact")} className="hover:text-[#E91E8C] transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-6 uppercase text-xs tracking-wider">
              Legal
            </h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>
                <button onClick={() => navigate("/privacy")} className="hover:text-[#E91E8C] transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/terms")} className="hover:text-[#E91E8C] transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/cookies")} className="hover:text-[#E91E8C] transition-colors">
                  Cookie Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/guidelines")} className="hover:text-[#E91E8C] transition-colors">
                  Community Guidelines
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-200/40 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs">
          <p>© 2026 Sunsan Messenger. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <span className="text-[#F48FB1] text-sm animate-pulse">♥</span>
            <span>for secure communication</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
