import React from "react";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SEO } from "../../SEO";
import { Navbar } from "../shared/Navbar";
export const PrivacyPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-gray-900 font-sans selection:bg-[#F48FB1] selection:text-white">
      {" "}
      <SEO
        title="Privacy Policy | SUNSAN MESSENGER"
        description="Read our privacy policy to understand how we protect your data and ensure your conversations remain private."
        url="/privacy"
      />{" "}
      {/* Navbar */}
      <Navbar />{" "}
      <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto prose prose-invert">
        {" "}
        <h1>Privacy Policy</h1>{" "}
        <p className="text-gray-500 text-lg mb-8">
          Last updated: December 24, 2025
        </p>{" "}
        <section className="space-y-6 text-gray-400">
          {" "}
          <p>
            {" "}
            At Voca, privacy is not just a feature—it's the foundation of
            everything we build. This Privacy Policy outlines how we handle your
            data, which is simple: we handle as little of it as possible.{" "}
          </p>{" "}
          <h3>1. Information We Collect</h3>{" "}
          <p>
            {" "}
            <strong>Account Information:</strong> You register with an email
            address. We use this solely to identify your account and allow
            others to find you if they know your email.{" "}
          </p>{" "}
          <p>
            {" "}
            <strong>Messages:</strong> Sunsan uses end-to-end encryption. This
            means your messages are encrypted on your device and can only be
            decrypted by the intended recipient. We cannot read your messages,
            listen to your calls, or see your media.{" "}
          </p>{" "}
          <h3>2. Information We Do Not Collect</h3>{" "}
          <ul className="list-disc pl-5 space-y-2">
            {" "}
            <li>
              We do not collect metadata about your messages (who you message,
              when, or how often).
            </li>{" "}
            <li>
              We do not store your contact list on our servers in plain text.
            </li>{" "}
            <li>We do not sell your data to advertisers.</li>{" "}
          </ul>{" "}
          <h3>3. Data Storage</h3>{" "}
          <p>
            {" "}
            Your message history is stored locally on your device. If you use
            Sunsan on multiple devices, your devices sync directly with each
            other via an encrypted tunnel.{" "}
          </p>{" "}
          <h3>4. Third Parties</h3>{" "}
          <p>
            {" "}
            We do not share your information with third parties, except as
            required by law. However, since we do not possess decryption keys
            for your messages, we cannot disclose message content to anyone,
            including government agencies.{" "}
          </p>{" "}
          <h3>5. Contact Us</h3>{" "}
          <p>
            {" "}
            If you have questions about this policy, please contact us at{" "}
            <a href="mailto:voca.org@gmail.com" className="text-[#F8BBD9]">
              voca.org@gmail.com
            </a>
            .{" "}
          </p>{" "}
        </section>{" "}
      </div>{" "}
    </div>
  );
};
