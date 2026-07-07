import React from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

console.log("🚀 main.tsx: loaded");

const GOOGLE_CLIENT_ID =
  "1020729373464-m48ld29rfgkeocgu9al5ea4qtq23pdqi.apps.googleusercontent.com";

// Register custom service worker for push notifications
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      // First: Unregister ALL old service workers
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        const url = registration.active?.scriptURL || "";
        if (!url.includes("sw.js") || url.includes("sw-v2.js")) {
          console.log("🗑️ Unregistering old SW:", url);
          await registration.unregister();
        }
      }

      // Now register the new one
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("✅ Service Worker registered:", registration.scope);
      await registration.update();
    } catch (error) {
      console.warn("⚠️ Service Worker registration failed:", error);
    }
  });
}

// Global Error Boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null; errorInfo: any }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.setState({ error, errorInfo });
    console.error("React Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            background: "#ff3333",
            color: "white",
            position: "fixed",
            inset: 0,
            zIndex: 9999999,
            overflow: "auto",
          }}
        >
          <h2>React Rendering Error</h2>
          <pre style={{ whiteSpace: "pre-wrap", marginTop: "10px" }}>
            {this.state.error?.toString()}
          </pre>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              marginTop: "10px",
              fontSize: "12px",
            }}
          >
            {this.state.errorInfo?.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

console.log("🚀 main.tsx: mounting React app to #root");
createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </GoogleOAuthProvider>
  </ErrorBoundary>
);
