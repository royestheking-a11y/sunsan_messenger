import React from "react";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SEO } from "../../SEO";
import { Navbar } from "../shared/Navbar";
export const TermsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-gray-900 font-sans selection:bg-[#F48FB1] selection:text-white">
      {" "}
      <SEO
        title="Terms of Service | SUNSAN MESSENGER"
        description="Read the Terms of Service for using SUNSAN MESSENGER."
        url="/terms"
      />{" "}
      {/* Navbar */}
      <Navbar />{" "}
      <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto prose prose-invert">
        {" "}
        <h1>Terms of Service</h1>{" "}
        <p className="text-gray-500 text-lg mb-8">
          Last updated: December 24, 2025
        </p>{" "}
        <section className="space-y-6 text-gray-400">
          {" "}
          <h3>1. Acceptance of Terms</h3>{" "}
          <p>
            {" "}
            By downloading, installing, or using Voca, you agree to be bound by
            these Terms of Service. If you do not agree to these terms, please
            do not use the service.{" "}
          </p>{" "}
          <h3>2. Our Service</h3>{" "}
          <p>
            {" "}
            Sunsan provides a secure messaging platform. We are constantly
            innovating to provide the best possible experience for our users.
            You acknowledge and agree that the form and nature of the services
            which Sunsan provides may change from time to time without prior
            notice to you.{" "}
          </p>{" "}
          <h3>3. User Responsibilities</h3>{" "}
          <p>
            {" "}
            You are responsible for your use of the Services and for any content
            you provide, including compliance with applicable laws. You may not
            use our service to send spam, harass others, or facilitate illegal
            activities.{" "}
          </p>{" "}
          <h3>4. Termination</h3>{" "}
          <p>
            {" "}
            We may suspend or terminate your access to Sunsan at any time, for
            any reason, including if we reasonably believe you have violated
            these Terms.{" "}
          </p>{" "}
          <h3>5. Disclaimers</h3>{" "}
          <p>
            {" "}
            The Service is provided "as is" and "as available". To the maximum
            extent permitted by law, we disclaim all warranties, whether express
            or implied.{" "}
          </p>{" "}
          <h3>6. Limitation of Liability</h3>{" "}
          <p>
            {" "}
            To the maximum extent permitted by law, Sunsan shall not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages.{" "}
          </p>{" "}
        </section>{" "}
      </div>{" "}
    </div>
  );
};
