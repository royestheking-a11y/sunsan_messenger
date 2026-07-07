import React, { useState, useEffect } from 'react';
import { SEO } from '../../SEO';
import { useVoca } from '../VocaContext';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../ui/card';
import { Lock, Mail, ShieldCheck, ArrowLeft, Loader2, Eye, EyeOff, CheckCircle2, KeyRound } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { initEmail, generateOTP, sendRegistrationOTP, sendPasswordResetOTP } from '../../../lib/email';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '../../ui/input-otp';
import { Capacitor } from '@capacitor/core';
import { signInWithGoogleNative } from '../../../lib/googleAuth';

interface LoginPageProps {
  initialMode?: 'login' | 'signup';
}

type AuthStep = 'credentials' | 'otp' | 'forgot-password' | 'reset-otp' | 'new-password';

export const LoginPage = ({ initialMode = 'login' }: LoginPageProps) => {
  const { login, signup, googleLogin } = useVoca();
  const navigate = useNavigate();
  const location = useLocation();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Auth Flow State
  const [isLoginView, setIsLoginView] = useState(initialMode === 'login');
  const [authStep, setAuthStep] = useState<AuthStep>('credentials');

  // OTP State
  const [otpValue, setOtpValue] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [timer, setTimer] = useState(300); // 5 minutes

  // New Password State (for reset)
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    initEmail();
  }, []);

  useEffect(() => {
    setIsLoginView(initialMode === 'login');
    setAuthStep('credentials');
    setOtpValue('');
    setGeneratedOtp(null);
  }, [initialMode]);

  // Timer logic for OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if ((authStep === 'otp' || authStep === 'reset-otp') && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [authStep, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Platform-agnostic Google Login Handler
  const handleNativeGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // 1. Native Mobile Login
      if (Capacitor.isNativePlatform()) {
        const result = await signInWithGoogleNative();
        if (result.success && result.user) {
          await processLogin(result.user);
        } else {
          toast.error("Google Login Failed");
        }
      }
      // 2. Web Login (Using the existing hook via button click)
      else {
        webGoogleLogin();
      }
    } catch (error) {
      console.error('Google Login Error:', error);
      toast.error("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to process the user data after auth (shared between web/native)
  const processLogin = async (profileData: any) => {
    // Normalize data structure if needed
    const userData = {
      googleId: profileData.googleId || profileData.sub,
      email: profileData.email,
      name: profileData.name,
      avatar: profileData.avatar || profileData.picture
    };

    const result = await googleLogin(userData);
    if (result.success) {
      toast.success("Welcome to Sunsan Messenger");
      if (result.isAdminPanel) {
        navigate('/admin', { replace: true });
      } else {
        navigate('/chat', { replace: true });
      }
    } else {
      toast.error("Login Failed", { description: result.error });
    }
  };

  // Web-only hook
  const webGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }).then(res => res.json());

        await processLogin({
          googleId: userInfo.sub,
          email: userInfo.email,
          name: userInfo.name,
          avatar: userInfo.picture
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to get user info");
      }
    },
    onError: () => toast.error("Google Login Failed"),
  });

  // --- Handlers ---

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await login(email, password);
      // login function returns { success, error, isAdminPanel }
      if (result.success) {
        toast.success("Welcome back to Sunsan Messenger");
        if (result.isAdminPanel) {
          navigate('/admin', { replace: true });
        } else {
          const from = (location.state as any)?.from?.pathname || '/chat';
          navigate(from, { replace: true });
        }
      } else {
        // If specific error message exists (like 'Your account is banned'), show it
        if (result.error === 'Your account has been banned') {
          toast.error("Access Denied", { description: "Your account is banned by the administrator." });
        } else {
          toast.error("Login Failed", { description: result.error || "Please check your email and password." });
        }
      }
    } catch (err: any) {
      toast.error("Error", { description: err.message || "Something went wrong." });
    } finally {
      setIsLoading(false);
    }
  };

  const initSignup = async () => {
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    const otp = generateOTP();
    setGeneratedOtp(otp);
    setTimer(300);

    const { success, error } = await sendRegistrationOTP(email, otp, name);

    setIsLoading(false);

    if (success) {
      setAuthStep('otp');
      toast.success("Verification code sent", { description: "Check your email inbox." });
    } else {
      toast.error("Failed to send OTP", { description: "Please try again later." });
    }
  };

  const verifySignupOtp = async () => {
    if (otpValue !== generatedOtp) {
      toast.error("Invalid Code", { description: "Please check the code and try again." });
      return;
    }

    setIsLoading(true);
    try {
      const success = await signup({ name, email, password });
      if (success) {
        toast.success("Account verified & created!", { description: "Welcome to Sunsan Messenger!" });
        navigate('/chat', { replace: true });
      } else {
        toast.error("Signup failed", { description: "Please try again." });
        // Could be email already exists
      }
    } catch (err: any) {
      toast.error("Error", { description: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const initForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setIsLoading(true);
    const otp = generateOTP();
    setGeneratedOtp(otp);
    setTimer(300);

    // In a real app we might want to check if user exists first, but for security sometimes we don't reveal it.
    // However, SendOTP usually works.
    const { success } = await sendPasswordResetOTP(email, otp);
    setIsLoading(false);

    if (success) {
      setAuthStep('reset-otp');
      toast.success("Reset code sent", { description: "Check your email inbox." });
    } else {
      toast.error("Failed to send OTP");
    }
  };

  const verifyResetOtp = () => {
    if (otpValue !== generatedOtp) {
      toast.error("Invalid Code");
      return;
    }
    setAuthStep('new-password');
  };

  const completePasswordReset = async () => {
    if (!newPassword) return;
    setIsLoading(true);
    try {
      const { uploadAPI } = await import('../../../lib/api');
      // Using a direct fetch here because reset-password isn't in api.ts yet or we can add it.
      // Let's use direct fetch for now or add to API client. 
      // Quickest is direct fetch.
      const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001/api';

      const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });

      if (res.ok) {
        toast.success("Password updated", { description: "Please login with your new password." });
        setIsLoginView(true);
        setAuthStep('credentials');
        setPassword('');
      } else {
        toast.error("Failed to update password");
      }
    } catch (err) {
      toast.error("Error updating password");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    if (timer > 240) return; // Debounce re-send (allow only after 1 min pass)

    const otp = generateOTP();
    setGeneratedOtp(otp);
    setTimer(300);

    let success;
    if (authStep === 'otp') {
      const res = await sendRegistrationOTP(email, otp, name);
      success = res.success;
    } else {
      const res = await sendPasswordResetOTP(email, otp);
      success = res.success;
    }

    if (success) toast.success("Code resent!");
    else toast.error("Failed to resend code");
  };


  const renderCredentialsForm = () => (
    <form onSubmit={(e) => { e.preventDefault(); isLoginView ? handleLogin() : initSignup(); }} className="space-y-5">
      <AnimatePresence mode="popLayout">
        {!isLoginView && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <Label htmlFor="name" className="text-gray-600">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              className="bg-white border-pink-200 text-gray-800 placeholder:text-gray-300 focus-visible:ring-[#F48FB1]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isLoginView}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-600">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="pl-9 bg-white border-pink-200 text-gray-800 placeholder:text-gray-300 focus-visible:ring-[#F48FB1]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-600">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pl-9 pr-10 bg-white border-pink-200 text-gray-800 placeholder:text-gray-300 focus-visible:ring-[#F48FB1]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-[#E91E8C] transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {isLoginView && (
          <div className="flex justify-end">
            <button type="button" onClick={() => { setAuthStep('forgot-password'); setEmail(''); }} className="text-xs text-[#F48FB1] hover:text-[#E91E8C] hover:underline">
              Forgot password?
            </button>
          </div>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-11 bg-linear-to-r from-[#F48FB1] to-[#E91E8C] hover:opacity-90 text-white shadow-lg shadow-[#F48FB1]/30 border-none"
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLoginView ? "Sign In" : "Create Account")}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-pink-100" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-400">Or continue with</span>
        </div>
      </div>

      <div className="w-full">
        <button
          type="button"
          onClick={() => handleNativeGoogleLogin()}
          className="w-full h-11 bg-white hover:bg-pink-50 text-gray-700 font-medium rounded-lg flex items-center justify-center gap-3 transition-all duration-300 border border-pink-200 group hover:border-pink-300 hover:scale-[1.02]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>
    </form>
  );

  const renderOtpView = (isReset = false) => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto text-[#F48FB1]">
          <Mail className="w-6 h-6" />
        </div>
        <h3 className="text-gray-800 font-medium text-lg">Check your email</h3>
        <p className="text-sm text-gray-500">
          We sent a code to <span className="text-gray-700 font-medium">{email}</span>
        </p>
      </div>

      <div className="flex justify-center py-2">
        <InputOTP value={otpValue} onChange={setOtpValue} maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} className="w-10 h-12 md:w-12 md:h-14 text-lg bg-white border-pink-200 text-gray-800 data-[active=true]:border-[#F48FB1]" />
            <InputOTPSlot index={1} className="w-10 h-12 md:w-12 md:h-14 text-lg bg-white border-pink-200 text-gray-800 data-[active=true]:border-[#F48FB1]" />
            <InputOTPSlot index={2} className="w-10 h-12 md:w-12 md:h-14 text-lg bg-white border-pink-200 text-gray-800 data-[active=true]:border-[#F48FB1]" />
          </InputOTPGroup>
          <InputOTPSeparator className="text-pink-200" />
          <InputOTPGroup>
            <InputOTPSlot index={3} className="w-10 h-12 md:w-12 md:h-14 text-lg bg-white border-pink-200 text-gray-800 data-[active=true]:border-[#F48FB1]" />
            <InputOTPSlot index={4} className="w-10 h-12 md:w-12 md:h-14 text-lg bg-white border-pink-200 text-gray-800 data-[active=true]:border-[#F48FB1]" />
            <InputOTPSlot index={5} className="w-10 h-12 md:w-12 md:h-14 text-lg bg-white border-pink-200 text-gray-800 data-[active=true]:border-[#F48FB1]" />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="space-y-4">
        <Button
          onClick={() => isReset ? verifyResetOtp() : verifySignupOtp()}
          className="w-full h-11 bg-linear-to-r from-[#F48FB1] to-[#E91E8C] text-white shadow-lg border-none hover:opacity-90"
          disabled={otpValue.length !== 6 || isLoading}
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify & Continue"}
        </Button>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Expires in {formatTime(timer)}</span>
          <button onClick={resendOtp} className="text-[#F48FB1] hover:text-[#E91E8C] transition-colors" disabled={timer > 240}>
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );

  const renderForgotPassword = () => (
    <form onSubmit={(e) => { e.preventDefault(); initForgotPassword(); }} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="reset-email" className="text-gray-600">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="reset-email"
            type="email"
            placeholder="name@example.com"
            className="pl-9 bg-white border-pink-200 text-gray-800 placeholder:text-gray-300 focus-visible:ring-[#F48FB1]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <Button
        type="submit"
        className="w-full h-11 bg-linear-to-r from-[#F48FB1] to-[#E91E8C] text-white shadow-lg border-none hover:opacity-90"
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Reset Code"}
      </Button>
    </form>
  );

  const renderNewPassword = () => (
    <form onSubmit={(e) => { e.preventDefault(); completePasswordReset(); }} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="new-password" className="text-gray-600">New Password</Label>
        <div className="relative">
          <KeyRound className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="new-password"
            type="password"
            placeholder="Enter new password"
            className="pl-9 bg-white border-pink-200 text-gray-800 placeholder:text-gray-300 focus-visible:ring-[#F48FB1]"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
      </div>
      <Button
        type="submit"
        className="w-full h-11 bg-linear-to-r from-[#F48FB1] to-[#E91E8C] text-white shadow-lg border-none hover:opacity-90"
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Update Password"}
      </Button>
    </form>
  );

  const getHeaderContent = () => {
    switch (authStep) {
      case 'otp': return { title: "Verification", sub: "Enter the code sent to your email" };
      case 'forgot-password': return { title: "Reset Password", sub: "We'll send you a code to reset it" };
      case 'reset-otp': return { title: "Verification", sub: "Enter code to reset password" };
      case 'new-password': return { title: "New Password", sub: "Secure your account" };
      default: return isLoginView
        ? { title: "Welcome back", sub: "Enter your credentials to access your account" }
        : { title: "Create an account", sub: "Enter your details to get started" };
    }
  };

  const header = getHeaderContent();

  const seoProps = isLoginView
    ? {
      title: "Login | Sunsan Messenger",
      description: "Access your secure Sunsan Messenger account and continue private conversations instantly.",
      url: "/login"
    }
    : {
      title: "Create Account | Sunsan Messenger",
      description: "Create your Sunsan Messenger account using email login and enjoy private messaging, real-time chat, and encrypted communication.",
      url: "/signup"
    };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col md:flex-row font-sans relative overflow-hidden">
      <SEO {...seoProps} />

      {/* Decorative floating blur circles for premium style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full bg-[#F48FB1]/10 blur-[120px] mix-blend-multiply animate-pulse" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[70vw] h-[70vw] rounded-full bg-[#E91E8C]/5 blur-[120px] mix-blend-multiply" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] rounded-full bg-white/30 blur-[80px]" />
      </div>

      {/* Full Page Layout */}
      <motion.div
        key={authStep + (isLoginView ? 'login' : 'signup')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full min-h-screen flex flex-col md:flex-row relative z-10"
      >
        {/* Left Side: Brand Panel (Full Page Column - 50% split) */}
        <div className="hidden md:flex md:w-[50%] bg-linear-to-br from-[#F48FB1] via-[#E91E8C] to-[#D81B60] p-16 text-white flex-col justify-between relative overflow-hidden min-h-screen select-none">
          {/* Abstract background blobs for brand panel */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-xl" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-2xl" />

          {/* Top: Logo */}
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-md overflow-hidden p-1">
              <img src="/sunsanlogo.png" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-sm tracking-wider uppercase">SUNSAN MESSENGER</span>
          </div>

          {/* Middle: Brand Message */}
          <div className="my-auto space-y-6 relative z-10">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight">
              Connect globally. <br />
              <span className="text-pink-100">Securely.</span>
            </h2>
            <p className="text-pink-50 text-base leading-relaxed max-w-[340px] opacity-95 font-light">
              Experience the next generation of messaging with SUNSAN MESSENGER. End-to-end encryption, high-fidelity calls, and a design that respects your focus.
            </p>
            {/* Animated Micro Mockup */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 max-w-[300px] shadow-lg">
              <div className="flex gap-2 items-center mb-3">
                <div className="w-7 h-7 rounded-full bg-white/30" />
                <div className="w-24 h-2 bg-white/40 rounded" />
              </div>
              <div className="w-full h-10 bg-white/20 rounded-lg flex items-center px-4 text-xs text-pink-100 font-medium">
                Hey! Did you see the new Sunsan update? ✨
              </div>
            </div>
          </div>

          {/* Bottom: Footer Info */}
          <div className="flex items-center gap-2 text-xs text-pink-100/90 font-medium relative z-10">
            <ShieldCheck className="w-4 h-4" />
            <span>End-to-End Encrypted</span>
          </div>
        </div>

        {/* Right Side: Form Panel (Full Page Column - 50% split) */}
        <div className="w-full md:w-[50%] p-8 sm:p-12 md:p-20 flex flex-col justify-between bg-linear-to-tr from-[#FFF5F7] to-[#ffffff] min-h-screen overflow-y-auto relative">
          
          {/* Back Button styled inside the form panel with perfect contrast */}
          <div className="absolute top-6 left-6 sm:top-10 sm:left-12 md:left-20">
            <Button
              variant="ghost"
              className="text-gray-500 hover:text-[#E91E8C] hover:bg-pink-50 gap-2 rounded-full px-4"
              onClick={() => {
                if (authStep !== 'credentials') {
                  setAuthStep('credentials');
                } else {
                  navigate('/');
                }
              }}
            >
              <ArrowLeft className="w-4 h-4" /> {authStep !== 'credentials' ? 'Back' : 'Back to Home'}
            </Button>
          </div>

          {/* Centered form wrapper to keep form size readable and elegant */}
          <div className="my-auto max-w-md w-full mx-auto space-y-8 pt-12 md:pt-0">
            {/* Mobile Header (Hidden on Desktop) */}
            <div className="md:hidden text-center mb-8">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-pink-100 mx-auto mb-4 overflow-hidden p-2 border border-pink-100">
                <img src="/sunsanlogo.png" className="w-full h-full object-contain" alt="Sunsan Logo" />
              </div>
              <span className="font-bold text-xs tracking-wider text-[#E91E8C] block uppercase mb-1">SUNSAN MESSENGER</span>
            </div>

            {/* Form Title & Subtitle */}
            <div className="text-center md:text-left space-y-1">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {header.title}
              </h1>
              <p className="text-gray-500 text-sm">
                {header.sub}
              </p>
            </div>

            {/* Active Step Content */}
            <div className="py-2">
              {authStep === 'credentials' && renderCredentialsForm()}
              {authStep === 'otp' && renderOtpView(false)}
              {authStep === 'forgot-password' && renderForgotPassword()}
              {authStep === 'reset-otp' && renderOtpView(true)}
              {authStep === 'new-password' && renderNewPassword()}
            </div>
          </div>

          {/* Switch Login/Signup Link */}
          {authStep === 'credentials' && (
            <div className="mt-8 pt-6 border-t border-pink-100 flex justify-center md:justify-start items-center gap-2 text-sm text-gray-500">
              <span>{isLoginView ? "New to Sunsan Messenger?" : "Already have an account?"}</span>
              <button
                type="button"
                className="text-[#E91E8C] font-semibold hover:text-[#F48FB1] hover:underline transition-colors"
                onClick={() => {
                  setIsLoginView(!isLoginView);
                  setAuthStep('credentials');
                }}
              >
                {isLoginView ? "Sign up now" : "Log in"}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
