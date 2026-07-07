import React from "react";
import { Settings, ShieldAlert } from "lucide-react";
export const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-[#FFF0F5] to-[#FFE4EF] flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
      {" "}
      {/* Background decoration */}{" "}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {" "}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F48FB1]/10 rounded-full blur-[100px]" />{" "}
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F8BBD9]/20 rounded-full blur-[100px]" />{" "}
      </div>{" "}
      <div className="relative z-10 flex flex-col items-center animate-in zoom-in-95 duration-700">
        {" "}
        <div className="w-48 h-48 mb-8 relative">
          {" "}
          {/* 3D Icon Representation */}{" "}
          <div className="absolute inset-0 bg-linear-to-br from-[#F48FB1] to-[#F8BBD9] rounded-3xl transform rotate-12 opacity-20 animate-pulse" />{" "}
          <div className="absolute inset-0 bg-linear-to-br from-[#F48FB1] to-[#E91E8C] rounded-3xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-500 border-t border-white/20">
            {" "}
            <Settings className="w-24 h-24 text-white animate-[spin_10s_linear_infinite]" />{" "}
          </div>{" "}
          <div className="absolute -bottom-4 -right-4 bg-yellow-400 rounded-full p-4 shadow-lg border-4 border-white">
            {" "}
            <ShieldAlert className="w-8 h-8 text-white" />{" "}
          </div>{" "}
        </div>{" "}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
          {" "}
          System{" "}
          <span className="bg-linear-to-r from-[#F48FB1] to-[#E91E8C] bg-clip-text text-transparent">
            Maintenance
          </span>{" "}
        </h1>{" "}
        <p className="text-gray-500 text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
          {" "}
          SUNSAN MESSENGER is currently undergoing scheduled maintenance to
          improve your experience. We'll be back shortly.{" "}
        </p>{" "}
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-200 shadow-sm">
          {" "}
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />{" "}
          <span className="text-sm text-gray-500 font-medium">
            Expected completion: Soon
          </span>{" "}
        </div>{" "}
      </div>{" "}
      <div className="absolute bottom-8 text-gray-400 text-sm">
        {" "}
        Sunsan Team &copy; {new Date().getFullYear()}{" "}
      </div>{" "}
    </div>
  );
};
