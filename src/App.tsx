import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { VocaProvider, useVoca } from "./components/voca/VocaContext";
import { SocketProvider, useSocket } from "./components/voca/SocketContext";
import { LoginPage } from "./components/voca/auth/LoginPage";
import { LandingPage } from "./components/voca/LandingPage";
import { ChatLayout } from "./components/voca/chat/ChatLayout";
import { ChatWindow } from "./components/voca/chat/ChatWindow";
import { AdminPanel } from "./components/voca/admin/AdminPanel";
import { MaintenancePage } from "./components/voca/MaintenancePage";
import { FeaturesPage } from "./components/voca/pages/FeaturesPage";
import { SecurityPage } from "./components/voca/pages/SecurityPage";
import { DownloadPage } from "./components/voca/pages/DownloadPage";
import { PrivacyPage } from "./components/voca/pages/PrivacyPage";
import { TermsPage } from "./components/voca/pages/TermsPage";
import { ContactPage } from "./components/voca/pages/ContactPage";
import { DemoPage } from "./components/voca/DemoPage";
import { Toaster } from "sonner";
import { GlobalCallUI } from "./GlobalCallUI";
import { SplashScreen } from "./components/voca/SplashScreen";
import { ChatHeads } from "./components/voca/chat/ChatHeads";
import { App as CapacitorApp } from "@capacitor/app";
import { PushNotifications } from "@capacitor/push-notifications";
import { Capacitor } from "@capacitor/core";

const ProtectedRoute = ({
  children,
  requireAdmin = false,
}: {
  children: React.ReactNode;
  requireAdmin?: boolean;
}) => {
  const { currentUser, isAdmin, systemSettings, loading } = useVoca();
  const location = useLocation();

  // Show splash screen while checking authentication
  if (loading) {
    return <SplashScreen isLoading={loading} />;
  }

  if (systemSettings?.maintenanceMode && !isAdmin) {
    return <MaintenancePage />;
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/chat" replace />;
  }

  return <>{children}</>;
};

const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, isAdmin, loading } = useVoca();

  // Wait for auth check to complete
  if (loading) {
    return <SplashScreen isLoading={loading} />;
  }

  if (currentUser) {
    return <Navigate to={isAdmin ? "/admin" : "/chat"} replace />;
  }

  return <>{children}</>;
};

const AppContent = () => {
  console.log("🚀 AppContent rendering");
  const navigate = useNavigate();
  const location = useLocation();
  const { updateFcmToken } = useSocket();

  // Handle Android Back Button coverage
  React.useEffect(() => {
    const handleBackButton = async () => {
      await CapacitorApp.addListener("backButton", ({ canGoBack }) => {
        if (
          location.pathname === "/chat" ||
          location.pathname === "/" ||
          location.pathname === "/login"
        ) {
          CapacitorApp.exitApp();
        } else {
          navigate(-1);
        }
      });
    };

    // Initialize Push Notifications with High Priority Channel
    const initPush = async () => {
      let permStatus = await PushNotifications.checkPermissions();
      if (permStatus.receive === "prompt") {
        permStatus = await PushNotifications.requestPermissions();
      }
      if (permStatus.receive !== "granted") {
        console.error("User denied push permissions");
        return;
      }

      // Create High Importance Channel for "WhatsApp-like" behavior
      try {
        await PushNotifications.createChannel({
          id: "pop-notifications",
          name: "Pop Notifications",
          description: "Show notifications on top of screen",
          importance: 5,
          visibility: 1,
          vibration: true,
          sound: "beep.wav",
        });
      } catch (e) {
        console.error("Error creating push channel", e);
      }
      await PushNotifications.register();
    };

    // Setup Listeners
    const setupListeners = async () => {
      await PushNotifications.addListener("registration", (token) => {
        console.log("🔔 Push registration success, token: " + token.value);
        localStorage.setItem("fcm_token", token.value);
        setTimeout(() => updateFcmToken(token.value), 2000);
      });

      await PushNotifications.addListener(
        "pushNotificationReceived",
        async (notification) => {
          console.log("🔔 Push received: ", notification);
          try {
            const { LocalNotifications } = await import(
              "@capacitor/local-notifications"
            );
            await LocalNotifications.schedule({
              notifications: [
                {
                  title: notification.title || "New Message",
                  body: notification.body || "",
                  id: new Date().getTime(),
                  schedule: { at: new Date(Date.now() + 100) },
                  actionTypeId: "",
                  extra: notification.data,
                  channelId: "pop-notifications",
                },
              ],
            });
          } catch (e) {
            console.error("Error showing foreground notification", e);
          }
        }
      );

      await PushNotifications.addListener(
        "pushNotificationActionPerformed",
        (notification) => {
          console.log("🔔 Push action performed: ", notification);
          const data = notification.notification.data;
          if (data.type === "call") navigate("/chat/calls");
          else if (data.url) navigate(data.url);
        }
      );
    };

    if (Capacitor.isNativePlatform()) {
      handleBackButton();
      initPush();
      setupListeners();
    }

    return () => {
      if (Capacitor.isNativePlatform()) {
        CapacitorApp.removeAllListeners();
        PushNotifications.removeAllListeners();
      }
    };
  }, [navigate, location, updateFcmToken]);

  return (
    <>
      <GlobalCallUI />
      <ChatHeads />
      <Routes>
        <Route
          path="/"
          element={
            <PublicOnlyRoute>
              <LandingPage />
            </PublicOnlyRoute>
          }
        />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage initialMode="login" />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <LoginPage initialMode="signup" />
            </PublicOnlyRoute>
          }
        />
        <Route path="/demo" element={<DemoPage />} />
        {/* Protected Routes */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <div className="hidden md:flex items-center justify-center h-full w-full text-gray-500">
                Select a chat to start messaging
              </div>
            }
          />
          <Route
            path=":id"
            element={
              <div className="h-full w-full">
                <ChatWindow />
              </div>
            }
          />
          <Route
            path="status"
            element={
              <div className="hidden md:flex items-center justify-center h-full w-full text-gray-500">
                View Status Updates
              </div>
            }
          />
          <Route
            path="calls"
            element={
              <div className="hidden md:flex items-center justify-center h-full w-full text-gray-500">
                View Call History
              </div>
            }
          />
          <Route
            path="groups"
            element={
              <div className="hidden md:flex items-center justify-center h-full w-full text-gray-500">
                Manage Groups
              </div>
            }
          />
          <Route
            path="posts"
            element={
              <div className="hidden md:flex items-center justify-center h-full w-full text-gray-500">
                View Posts
              </div>
            }
          />
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        {/* Catch all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default function App() {
  console.log("🚀 App component rendering");
  return (
    <VocaProvider>
      <SocketProvider>
        <Router>
          <AppContent />
          <Toaster position="top-center" theme="dark" />
        </Router>
      </SocketProvider>
    </VocaProvider>
  );
}
