import React from "react";
import { Button } from "../../ui/button";
import { motion } from "motion/react";
import { ArrowLeft, Shield, Lock, FileKey, EyeOff, Server } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SEO } from "../../SEO";
import { Navbar } from "../shared/Navbar";
export const SecurityPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-gray-900 font-sans selection:bg-[#F48FB1] selection:text-white">
      {" "}
      <SEO
        title="Security & Privacy | SUNSAN MESSENGER"
        description="Learn how SUNSAN MESSENGER protects your data with end-to-end encryption, secure authentication, and privacy-first architecture."
        url="/security"
      />{" "}
      {/* Navbar */}
      <Navbar />{" "}
      {/* Hero */}{" "}
      <section className="pt-32 pb-20 px-6 text-center">
        {" "}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 bg-[#F48FB1]/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-[#F48FB1]"
        >
          {" "}
          <Shield className="w-10 h-10" />{" "}
        </motion.div>{" "}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          {" "}
          Privacy is not a mode. <br />{" "}
          <span className="text-gray-500"> It's the architecture. </span>{" "}
        </motion.h1>{" "}
      </section>{" "}
      {/* Diagram Section */}{" "}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        {" "}
        <div className="bg-[#FFF0F5] rounded-3xl p-8 md:p-12 border border-pink-100 relative overflow-hidden">
          {" "}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F48FB1]/10 rounded-full blur-[100px]" />{" "}
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            {" "}
            <div>
              {" "}
              <h3 className="text-2xl font-bold mb-4">Signal Protocol</h3>{" "}
              <p className="text-gray-500 leading-relaxed mb-6">
                {" "}
                We use the state-of-the-art open source Signal Protocol to keep
                your chats secure. We can't read your messages or listen to your
                calls, and no one else can either.{" "}
              </p>{" "}
              <div className="flex gap-3">
                <div className="px-4 py-2 bg-white/80 backdrop-blur-md border border-pink-200 rounded-full text-xs font-semibold text-[#E91E8C] shadow-xs">
                  Double Ratchet Algorithm
                </div>
                <div className="px-4 py-2 bg-white/80 backdrop-blur-md border border-pink-200 rounded-full text-xs font-semibold text-[#E91E8C] shadow-xs">
                  X3DH Key Agreement
                </div>
              </div>{" "}
            </div>{" "}
            <div className="space-y-4">
              {" "}
              <div className="flex items-center gap-4 bg-[#ffffff] p-4 rounded-xl border border-pink-100">
                {" "}
                <Lock className="w-6 h-6 text-green-400" />{" "}
                <div>
                  {" "}
                  <div className="font-semibold">Alice</div>{" "}
                  <div className="text-xs text-gray-500">
                    Private Key: 0x82...1A
                  </div>{" "}
                </div>{" "}
                <div className="flex-1 h-[1px] bg-pink-100 mx-2" />{" "}
                <Lock className="w-6 h-6 text-green-400" />{" "}
                <div>
                  {" "}
                  <div className="font-semibold">Bob</div>{" "}
                  <div className="text-xs text-gray-500">
                    Private Key: 0xB4...9C
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="text-center text-xs text-gray-500">
                {" "}
                Only the endpoints possess the keys to decrypt.{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Grid */}{" "}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        {" "}
        <div className="grid md:grid-cols-3 gap-8">
          {" "}
          <div className="p-8">
            {" "}
            <FileKey className="w-10 h-10 text-[#F48FB1] mb-6" />{" "}
            <h3 className="text-xl font-bold mb-3">Metadata Minimalist</h3>{" "}
            <p className="text-gray-500 text-sm leading-relaxed">
              {" "}
              We don't know who you're messaging, when you're messaging, or how
              many messages you send. Our server architecture is designed to
              know as little as possible.{" "}
            </p>{" "}
          </div>{" "}
          <div className="p-8">
            {" "}
            <EyeOff className="w-10 h-10 text-[#F48FB1] mb-6" />{" "}
            <h3 className="text-xl font-bold mb-3">No Ads, No Trackers</h3>{" "}
            <p className="text-gray-500 text-sm leading-relaxed">
              {" "}
              There are no affiliate marketers, no tracking pixels, and no data
              mining. You are the customer, not the product.{" "}
            </p>{" "}
          </div>{" "}
          <div className="p-8">
            {" "}
            <Server className="w-10 h-10 text-[#F48FB1] mb-6" />{" "}
            <h3 className="text-xl font-bold mb-3">Open Source Core</h3>{" "}
            <p className="text-gray-500 text-sm leading-relaxed">
              {" "}
              Our encryption libraries are open source and have been audited by
              independent security researchers to ensure no backdoors exist.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </div>
  );
};
