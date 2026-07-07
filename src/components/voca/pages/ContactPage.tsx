import React from "react";
import { Button } from "../../ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { SEO } from "../../SEO";
import { Navbar } from "../shared/Navbar";
export const ContactPage = () => {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message Sent", {
      description: "We'll get back to you shortly.",
    });
  };
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-gray-900 font-sans selection:bg-[#F48FB1] selection:text-white">
      {" "}
      <SEO
        title="Contact Us | SUNSAN MESSENGER"
        description="Contact the SUNSAN MESSENGER team for support, feedback, or general inquiries."
        url="/contact"
      />{" "}
      {/* Navbar */}
      <Navbar />{" "}
      <div className="pt-32 pb-20 px-6 max-w-2xl mx-auto">
        {" "}
        <div className="text-center mb-12">
          {" "}
          <h1 className="text-4xl font-bold mb-4">Get in touch</h1>{" "}
          <p className="text-gray-500">
            {" "}
            Have questions about Voca? We'd love to hear from you.{" "}
          </p>{" "}
        </div>{" "}
        <div className="bg-[#FFF0F5] rounded-2xl p-8 border border-pink-100 shadow-xl">
          {" "}
          <div className="flex items-center gap-4 mb-8 p-4 bg-[#F48FB1]/10 rounded-xl border border-[#F48FB1]/20">
            {" "}
            <div className="w-10 h-10 rounded-full bg-[#F48FB1] flex items-center justify-center shrink-0">
              {" "}
              <Mail className="w-5 h-5 text-white" />{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="text-sm text-gray-500">Email us directly at</p>{" "}
              <p className="text-white font-medium select-all">
                voca.org.com@gmail.com
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <form onSubmit={handleSubmit} className="space-y-6">
            {" "}
            <div className="space-y-2">
              {" "}
              <label className="text-sm font-medium text-gray-400">
                Name
              </label>{" "}
              <Input
                placeholder="Your name"
                className="bg-[#ffffff] border-pink-200"
                required
              />{" "}
            </div>{" "}
            <div className="space-y-2">
              {" "}
              <label className="text-sm font-medium text-gray-400">
                Email
              </label>{" "}
              <Input
                type="email"
                placeholder="you@example.com"
                className="bg-[#ffffff] border-pink-200"
                required
              />{" "}
            </div>{" "}
            <div className="space-y-2">
              {" "}
              <label className="text-sm font-medium text-gray-400">
                Message
              </label>{" "}
              <Textarea
                placeholder="How can we help?"
                className="bg-[#ffffff] border-pink-200 min-h-[150px]"
                required
              />{" "}
            </div>{" "}
            <Button className="w-full bg-[#F48FB1] hover:bg-[#E91E8C]">
              {" "}
              Send Message{" "}
            </Button>{" "}
          </form>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
