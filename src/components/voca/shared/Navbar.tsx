import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../ui/button";
import {
  Menu,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Home,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "../../ui/sheet";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isFeatures = location.pathname === "/features";
  const isPrivacy = location.pathname === "/security";
  const isDemo = location.pathname === "/demo";
  const isApps = location.pathname === "/download";

  return (
    <nav className="fixed w-full z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-gray-200/40 shadow-xs select-none">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        {/* Left Side: Logo */}
        <div 
          className="flex flex-col justify-center items-start cursor-pointer z-10" 
          onClick={() => navigate("/")}
        >
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-[#F48FB1] to-[#E91E8C] bg-clip-text text-transparent leading-none mb-0.5">
            SUNSAN
          </span>
          <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase leading-none">
            MESSENGER
          </span>
        </div>

        {/* Center: Desktop Navigation Links (Absolutely Centered) */}
        <div className="hidden md:flex items-center justify-center gap-2 text-sm font-medium absolute left-1/2 -translate-x-1/2">
          <button
            onClick={() => navigate("/")}
            className={`${
              isHome
                ? "bg-[#FFE8F0] text-[#E91E8C] font-bold border border-pink-100/50"
                : "text-gray-600 hover:text-[#E91E8C] hover:bg-pink-50/50"
            } rounded-full px-4 py-2 transition-all duration-200`}
          >
            Home
          </button>
          <button
            onClick={() => navigate("/features")}
            className={`${
              isFeatures
                ? "bg-[#FFE8F0] text-[#E91E8C] font-bold border border-pink-100/50"
                : "text-gray-600 hover:text-[#E91E8C] hover:bg-pink-50/50"
            } rounded-full px-4 py-2 transition-all duration-200`}
          >
            Features
          </button>
          <button
            onClick={() => navigate("/security")}
            className={`${
              isPrivacy
                ? "bg-[#FFE8F0] text-[#E91E8C] font-bold border border-pink-100/50"
                : "text-gray-600 hover:text-[#E91E8C] hover:bg-pink-50/50"
            } rounded-full px-4 py-2 transition-all duration-200`}
          >
            Privacy
          </button>
          <button
            onClick={() => navigate("/demo")}
            className={`${
              isDemo
                ? "bg-[#FFE8F0] text-[#E91E8C] font-bold border border-pink-100/50"
                : "text-gray-600 hover:text-[#E91E8C] hover:bg-pink-50/50"
            } rounded-full px-4 py-2 transition-all duration-200`}
          >
            Interactive Demo
          </button>
          <button
            onClick={() => navigate("/download")}
            className={`${
              isApps
                ? "bg-[#FFE8F0] text-[#E91E8C] font-bold border border-pink-100/50"
                : "text-gray-600 hover:text-[#E91E8C] hover:bg-pink-50/50"
            } rounded-full px-4 py-2 transition-all duration-200`}
          >
            Apps
          </button>
        </div>

        {/* Right Side: Log In / Download Buttons */}
        <div className="hidden md:flex items-center gap-4 z-10">
          <Button
            className="text-[#E91E8C] bg-transparent hover:bg-pink-50/50 border border-pink-200 rounded-full px-6 transition-all hover:scale-105"
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
          <Button
            className="bg-[#E91E8C] hover:bg-[#c2185b] text-white rounded-full px-6 shadow-md shadow-pink-500/10 transition-all hover:scale-105 border-none"
            onClick={() => navigate("/signup")}
          >
            Download
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden z-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-pink-50/50">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#FAF8F5] border-l border-gray-200/40 text-gray-900 w-full sm:max-w-sm p-0">
              <div className="p-6 h-full flex flex-col overflow-y-auto">
                <SheetHeader className="mb-8">
                  <SheetTitle className="text-gray-900 text-left flex flex-col justify-center items-start">
                    <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-[#F48FB1] to-[#E91E8C] bg-clip-text text-transparent leading-none mb-0.5">
                      SUNSAN
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase leading-none">
                      MESSENGER
                    </span>
                  </SheetTitle>
                  <SheetDescription className="text-gray-400 text-left">
                    Navigate through Sunsan Messenger's services.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex-1 flex flex-col gap-2">
                  {[
                    { label: "Home", action: () => navigate("/"), icon: Home, active: isHome },
                    { label: "Features", action: () => navigate("/features"), icon: Zap, active: isFeatures },
                    { label: "Privacy", action: () => navigate("/security"), icon: Shield, active: isPrivacy },
                    { label: "Interactive Demo", action: () => navigate("/demo"), icon: Globe, active: isDemo },
                    { label: "Download Apps", action: () => navigate("/download"), icon: Smartphone, active: isApps },
                  ].map((item, i) => (
                    <button
                      key={i}
                      onClick={item.action}
                      className={`group flex items-center justify-between p-4 rounded-2xl transition-all active:scale-[0.98] border ${
                        item.active
                          ? "bg-[#FFE8F0] border-pink-200 text-[#E91E8C]"
                          : "bg-transparent border-transparent hover:bg-pink-50/50 text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          item.active ? "bg-white" : "bg-pink-50 group-hover:bg-pink-100/50"
                        }`}>
                          <item.icon className={`w-5 h-5 ${item.active ? "text-[#E91E8C]" : "text-[#F48FB1] group-hover:text-[#E91E8C]"}`} />
                        </div>
                        <span className="text-lg font-bold">
                          {item.label}
                        </span>
                      </div>
                      <ArrowRight className={`w-5 h-5 -translate-x-2 group-hover:translate-x-0 transition-all opacity-0 group-hover:opacity-100 ${
                        item.active ? "text-[#E91E8C]" : "text-gray-300"
                      }`} />
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-4 mt-auto pt-8 border-t border-gray-200">
                  <Button
                    className="w-full h-14 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-2xl text-lg font-medium transition-transform active:scale-[0.98]"
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </Button>
                  <Button
                    className="w-full h-14 bg-[#E91E8C] hover:bg-[#c2185b] text-white rounded-2xl text-lg font-bold shadow-lg shadow-pink-500/10 transition-transform active:scale-[0.98] border-none"
                    onClick={() => navigate("/signup")}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
