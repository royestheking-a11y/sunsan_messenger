import React, { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Monitor,
  Smartphone,
  Apple,
  Share,
  PlusSquare,
  MoreVertical,
  Download,
  Check,
  Laptop,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SEO } from "../../SEO";
import { Navbar } from "../shared/Navbar";
export const DownloadPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"ios" | "android" | "desktop">(
    "ios"
  );
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setIsInstalled(true));
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", () => setIsInstalled(true));
    };
  }, []);
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const guides = {
    ios: [
      {
        icon: Share,
        title: "Tap Share",
        desc: "Tap the Share button in Safari's bottom bar.",
      },
      {
        icon: PlusSquare,
        title: "Add to Home Screen",
        desc: "Scroll down and select 'Add to Home Screen'.",
      },
      {
        icon: Check,
        title: "Confirm",
        desc: "Tap 'Add' in the top right corner.",
      },
    ],
    android: [
      {
        icon: Download,
        title: "Download APK",
        desc: "Tap the 'Download APK' button above.",
      },
      {
        icon: MoreVertical,
        title: "Open File",
        desc: "Open the downloaded `voca.apk` file.",
      },
      {
        icon: Check,
        title: "Install",
        desc: "Allow installation from unknown sources if asked.",
      },
    ],
    desktop: [
      {
        icon: Laptop,
        title: "Browser Install",
        desc: "Look for the install icon in your address bar.",
      },
      {
        icon: Download,
        title: "Click Install",
        desc: "Click the icon and confirm installation.",
      },
      {
        icon: Monitor,
        title: "Launch",
        desc: "Voca will launch as a native desktop app.",
      },
    ],
  };
  return (
    <div
      className="min-h-screen bg-[#FAF8F5] text-gray-900 font-sans selection:bg-[#F48FB1] selection:text-white"
      style={{ paddingBottom: "120px" }}
    >
      {" "}
      <SEO
        title="Download Sunsan | Mobile & Desktop App"
        description="Download SUNSAN MESSENGER for iOS, Android, Windows, and Mac. Secure communication on all your devices."
        url="/download"
      />{" "}
      {/* Navbar */}
      <Navbar />{" "}
      {/* Hero */}{" "}
      <section
        style={{ paddingTop: "140px", paddingBottom: "60px" }}
        className="px-6 text-center relative overflow-hidden"
      >
        {" "}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#F48FB1] rounded-full blur-[150px] opacity-10 pointer-events-none" />{" "}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {" "}
          <motion.div
            variants={itemVariants}
            className="inline-block px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-[#F8BBD9] text-sm font-medium mb-6 backdrop-blur-sm"
          >
            {" "}
            Progressive Web App{" "}
          </motion.div>{" "}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            {" "}
            Install Sunsan everywhere.{" "}
          </motion.h1>{" "}
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            {" "}
            Experience near-native performance without the App Store. Install
            Sunsan directly from your browser.{" "}
          </motion.p>{" "}
          <motion.div variants={itemVariants}>
            {" "}
            <a
              href="https://drive.google.com/file/d/1afft8tN8UTjveeOKbp-vr25NiJJhi3ab/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8"
            >
              {" "}
              <Button
                className="rounded-full px-8 py-6 text-lg font-bold shadow-xl transition-transform hover:-translate-y-1"
                style={{
                  backgroundColor: "#3DDC84",
                  color: "#ffffff",
                  boxShadow: "0 20px 25px -5px rgba(61, 220, 132, 0.2)",
                }}
              >
                {" "}
                <Download className="w-6 h-6 mr-2" /> Download Android APK{" "}
              </Button>{" "}
            </a>{" "}
          </motion.div>{" "}
        </motion.div>{" "}
      </section>{" "}
      {/* Interactive Guide */}{" "}
      <section
        style={{ marginTop: "40px", marginBottom: "60px" }}
        className="max-w-5xl mx-auto px-6 w-full"
      >
        {" "}
        <div className="bg-[#FFF0F5]/50 backdrop-blur-xl border border-pink-100 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden relative">
          {" "}
          {/* Tabs */}{" "}
          <div className="flex justify-center mb-16">
            {" "}
            <div className="flex bg-[#ffffff] p-1.5 rounded-full border border-pink-100 relative">
              {" "}
              {(["ios", "android", "desktop"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 z-10 flex items-center gap-2 ${
                    activeTab === tab
                      ? "text-white"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  {" "}
                  {tab === "ios" && <Apple className="w-4 h-4" />}{" "}
                  {tab === "android" && <Smartphone className="w-4 h-4" />}{" "}
                  {tab === "desktop" && <Laptop className="w-4 h-4" />}{" "}
                  <span className="capitalize">
                    {tab === "desktop" ? "Windows / Mac" : tab}
                  </span>{" "}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#F48FB1] rounded-full shadow-lg shadow-[#F48FB1]/25"
                      style={{ zIndex: -1 }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}{" "}
                </button>
              ))}{" "}
            </div>{" "}
          </div>{" "}
          {/* Guide Content */}{" "}
          <AnimatePresence mode="wait">
            {" "}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              {" "}
              {/* Visual Preview */}{" "}
              <div className="relative flex justify-center order-2 md:order-1">
                {" "}
                {/* Phone Mockup Frame */}{" "}
                <div
                  className={`relative border-gray-800 bg-gray-900 border-8 rounded-[2.5rem] shadow-2xl ${
                    activeTab === "desktop"
                      ? "w-[400px] h-[250px] border-b-[12px] rounded-lg"
                      : "h-[500px] w-[260px]"
                  }`}
                >
                  {" "}
                  <div className="w-full h-full bg-[#ffffff] overflow-hidden relative rounded-[2rem]">
                    {" "}
                    {/* Mock UI Header */}{" "}
                    <div className="h-10 bg-[#FFF0F5] flex items-center px-4 justify-between border-b border-pink-100">
                      {" "}
                      <div className="w-12 h-2 rounded bg-pink-100" />{" "}
                      <div className="flex gap-1.5">
                        {" "}
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />{" "}
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />{" "}
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />{" "}
                      </div>{" "}
                    </div>{" "}
                    {/* Mock Page Content */}
                    <div className={`p-4 ${activeTab === "desktop" ? "space-y-2" : "space-y-3"}`}>
                      <div className={`${activeTab === "desktop" ? "w-10 h-10 mb-2" : "w-16 h-16 mb-4"} mx-auto flex items-center justify-center`}>
                        <img src="/sunsanlogo.png" className={`${activeTab === "desktop" ? "w-10 h-10" : "w-16 h-16"} object-contain animate-pulse`} />
                      </div>
                      <div className="h-3 bg-pink-100 rounded w-3/4 mx-auto" />
                      <div className="h-2 bg-pink-50 rounded w-1/2 mx-auto" />
                      {/* Specific Platform Hint */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className={`p-3 bg-[#F48FB1]/20 border border-[#F48FB1]/30 rounded-xl flex items-center gap-3 ${activeTab === "desktop" ? "mt-3" : "mt-8"}`}
                      >
                        <div className="w-8 h-8 bg-[#F48FB1] rounded-lg flex items-center justify-center shrink-0">
                          {" "}
                          {activeTab === "ios" && (
                            <Share className="w-4 h-4 text-white" />
                          )}{" "}
                          {activeTab === "android" && (
                            <Download className="w-4 h-4 text-white" />
                          )}{" "}
                          {activeTab === "desktop" && (
                            <Monitor className="w-4 h-4 text-white" />
                          )}{" "}
                        </div>{" "}
                        <div className="text-xs text-[#E91E8C] font-semibold">
                          {activeTab === "ios" && "Tap 'Share' below"}{" "}
                          {activeTab === "android" && "Tap 'Install' here"}{" "}
                          {activeTab === "desktop" && "Click icon in URL bar"}{" "}
                        </div>{" "}
                      </motion.div>{" "}
                      {/* Render Real Install Button for Desktop/Android if supported */}{" "}
                      {deferredPrompt && activeTab !== "ios" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-4"
                        >
                          {" "}
                          <Button
                            onClick={handleInstallClick}
                            className="w-full bg-white text-[#ffffff] hover:bg-gray-100 font-bold"
                          >
                            {" "}
                            Install Now{" "}
                          </Button>{" "}
                        </motion.div>
                      )}{" "}
                      {/* Direct APK Download (Android Only) */}{" "}
                      {activeTab === "android" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-4"
                        >
                          {" "}
                          <a
                            href="https://drive.google.com/file/d/1afft8tN8UTjveeOKbp-vr25NiJJhi3ab/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full"
                          >
                            {" "}
                            <Button className="w-full bg-[#3DDC84] hover:bg-[#32B36B] text-[#ffffff] font-bold shadow-lg shadow-[#3DDC84]/20">
                              {" "}
                              <Download className="w-4 h-4 mr-2" /> Download APK{" "}
                            </Button>{" "}
                          </a>{" "}
                          <p className="text-center text-xs text-gray-500 mt-2">
                            {" "}
                            Version 2.0 • Direct Download{" "}
                          </p>{" "}
                        </motion.div>
                      )}{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
                {/* Abstract background glow behind phone */}{" "}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#F48FB1] rounded-full blur-[100px] opacity-20 -z-10" />{" "}
              </div>{" "}
              {/* Steps List */}{" "}
              <div className="order-1 md:order-2 space-y-8">
                {" "}
                <div className="space-y-2">
                  {" "}
                  <h3 className="text-3xl font-bold flex items-center gap-3">
                    {" "}
                    {activeTab === "ios" && (
                      <Apple className="w-8 h-8 text-[#E91E8C]" />
                    )}{" "}
                    {activeTab === "android" && (
                      <Smartphone className="w-8 h-8 text-[#E91E8C]" />
                    )}{" "}
                    {activeTab === "desktop" && (
                      <Monitor className="w-8 h-8 text-[#E91E8C]" />
                    )}{" "}
                    <span>
                      Install on{" "}
                      {activeTab === "desktop"
                        ? "PC / Mac"
                        : activeTab === "ios"
                        ? "iOS"
                        : "Android"}
                    </span>{" "}
                  </h3>{" "}
                  <p className="text-gray-500">
                    Follow these simple steps to add Sunsan to your device.
                  </p>{" "}
                </div>{" "}
                <div className="space-y-6">
                  {" "}
                  {guides[activeTab].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 group"
                    >
                      {" "}
                      <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-200 flex items-center justify-center group-hover:bg-[#F48FB1] group-hover:border-[#F48FB1] transition-all duration-300 shadow-lg group-hover:shadow-[#F48FB1]/25 shrink-0">
                        {" "}
                        <step.icon className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />{" "}
                      </div>{" "}
                      <div>
                        {" "}
                        <h4 className="text-lg font-bold text-gray-800 group-hover:text-[#E91E8C] transition-colors">
                          {step.title}
                        </h4>{" "}
                        <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                          {step.desc}
                        </p>{" "}
                      </div>{" "}
                    </motion.div>
                  ))}{" "}
                </div>{" "}
                {/* Desktop Install Button (Outside of mockup) */}{" "}
                {deferredPrompt && activeTab === "desktop" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {" "}
                    <Button
                      onClick={handleInstallClick}
                      size="lg"
                      className="bg-[#F48FB1] hover:bg-[#E91E8C] text-white rounded-full px-8 shadow-xl shadow-[#F48FB1]/30"
                    >
                      {" "}
                      <Download className="w-5 h-5 mr-2" /> Install for Desktop{" "}
                    </Button>{" "}
                  </motion.div>
                )}{" "}
              </div>{" "}
            </motion.div>{" "}
          </AnimatePresence>{" "}
        </div>{" "}
      </section>{" "}
      {/* QR Code Section */}{" "}
      <section style={{ marginTop: "60px" }} className="text-center px-6">
        {" "}
        <div className="inline-block p-8 bg-pink-50 border border-pink-100 rounded-3xl backdrop-blur-md">
          {" "}
          <div className="flex flex-col md:flex-row items-center gap-8">
            {" "}
            <div className="bg-white p-3 rounded-xl shadow-lg">
              {" "}
              {/* Cloudinary QR Code */}{" "}
              <img
                src="https://res.cloudinary.com/dfvc27xla/image/upload/v1767078184/adobe-express-qr-code_aeas3l.svg"
                alt="Scan to download Voca"
                className="w-32 h-32 rounded-lg"
              />{" "}
            </div>{" "}
            <div className="text-left">
              {" "}
              <h4 className="text-xl font-bold mb-2">
                Scan to install on mobile
              </h4>{" "}
              <p className="text-gray-500 text-sm max-w-[200px]">
                Point your camera at this QR code to open Sunsan on your phone
                immediately.
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </div>
  );
};
