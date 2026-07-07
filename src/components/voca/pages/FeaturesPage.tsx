import React from "react";
import { Button } from "../../ui/button";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Check,
  Lock,
  Zap,
  Smartphone,
  Users,
  Globe,
  Video,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SEO } from "../../SEO";
import { Navbar } from "../shared/Navbar";
export const FeaturesPage = () => {
  const navigate = useNavigate();
  const mainFeatures = [
    {
      title: "End-to-End Encryption",
      desc: "Powered by the Signal Protocol, ensuring your messages stay private.",
      icon: Lock,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      title: "Global Low Latency",
      desc: "Distributed edge servers ensure messages are delivered in milliseconds.",
      icon: Zap,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      title: "Cross-Platform",
      desc: "Seamlessly sync between Mobile, Web, and Desktop apps.",
      icon: Smartphone,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      title: "HD Video Calls",
      desc: "Crystal clear voice and video calls, even on low bandwidth.",
      icon: Video,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      title: "Large Groups",
      desc: "Create communities with up to 200,000 members.",
      icon: Users,
      color: "text-pink-400",
      bg: "bg-pink-400/10",
    },
    {
      title: "No Tracking",
      desc: "We don't collect metadata. Your business is your business.",
      icon: Globe,
      color: "text-[#F8BBD9]",
      bg: "bg-[#F8BBD9]/10",
    },
  ];
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-gray-900 font-sans selection:bg-[#F48FB1] selection:text-white">
      {" "}
      <SEO
        title="Features | SUNSAN MESSENGER"
        description="Explore SUNSAN MESSENGER features including encrypted messaging, voice and video calls, file sharing, message editing, and real-time presence."
        url="/features"
      />{" "}
      {/* Navbar */}
      <Navbar />{" "}
      {/* Hero */}{" "}
      <section className="pt-32 pb-20 px-6 text-center">
        {" "}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          {" "}
          Everything you need. <br />{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F48FB1] to-[#E91E8C]">
            {" "}
            Nothing you don't.{" "}
          </span>{" "}
        </motion.h1>{" "}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-500 max-w-2xl mx-auto"
        >
          {" "}
          Sunsan is built for those who value privacy without compromising on
          features.{" "}
        </motion.p>{" "}
      </section>{" "}
      {/* Grid */}{" "}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        {" "}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {" "}
          {mainFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-pink-50 border border-pink-100 hover:bg-pink-100 transition-colors"
            >
              {" "}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.bg} ${feature.color}`}
              >
                {" "}
                <feature.icon className="w-7 h-7" />{" "}
              </div>{" "}
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>{" "}
              <p className="text-gray-500 leading-relaxed"> {feature.desc} </p>{" "}
            </motion.div>
          ))}{" "}
        </div>{" "}
      </section>{" "}
      {/* Detailed Feature List */}{" "}
      <section className="py-20 bg-[#FFF5F8]">
        {" "}
        <div className="max-w-4xl mx-auto px-6">
          {" "}
          <h2 className="text-3xl font-bold mb-12 text-center">
            Technical Specifications
          </h2>{" "}
          <div className="space-y-4">
            {" "}
            {[
              "RSA-4096 Encryption keys",
              "SHA-256 Hashing for file integrity",
              "Perfect Forward Secrecy",
              "Local database encryption (SQLCipher)",
              "Automatic message destruction timers",
              "Screen lock & Biometric authentication support",
              "Proxy support for restricted networks",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 border-b border-pink-100 hover:bg-pink-50 transition-colors"
              >
                {" "}
                <Check className="w-5 h-5 text-[#F48FB1]" />{" "}
                <span className="text-gray-400">{item}</span>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Footer Call to Action */}{" "}
      <section className="py-20 px-6 text-center">
        {" "}
        <div className="max-w-3xl mx-auto bg-linear-to-br from-[#FFF0F5] to-[#ffffff] border border-pink-200 rounded-3xl p-12">
          {" "}
          <h2 className="text-3xl font-bold mb-6">Ready to upgrade?</h2>{" "}
          <p className="text-gray-500 mb-8">
            Join millions of users who trust Sunsan with their conversations.
          </p>{" "}
          <Button
            size="lg"
            className="bg-[#F48FB1] hover:bg-[#E91E8C] text-white rounded-full px-8 h-12 text-lg"
            onClick={() => navigate("/signup")}
          >
            {" "}
            Get Started Now{" "}
          </Button>{" "}
        </div>{" "}
      </section>{" "}
    </div>
  );
};
