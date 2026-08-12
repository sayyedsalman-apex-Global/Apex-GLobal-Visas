import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import emailjs from '@emailjs/browser';
import { X, Mail, Lock, User, Phone, CheckSquare, Square, Eye, EyeOff, AlertTriangle, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, verifyEmailExists, resetPassword } = useAuth();
  
  const [activeTab, setActiveTab] = useState('signin'); // 'signin', 'signup', 'forgot', 'otp_reset'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form Fields for Sign In and Sign Up
  const [signInData, setSignInData] = useState({ email: '', password: '', rememberMe: false });
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  // Forgot Password Flow States
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setErrorMsg('');
    setSuccessMsg('');
    // Reset views
    setActiveTab('signin');
  };

  // Sign In submit
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!signInData.email.trim() || !signInData.password.trim()) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(signInData.email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    // Simulate tiny network delay
    setTimeout(() => {
      const res = login(signInData.email, signInData.password, signInData.rememberMe);
      setIsSubmitting(false);

      if (res.success) {
        setSuccessMsg('Successfully signed in!');
        setTimeout(() => {
          handleClose();
        }, 1000);
      } else {
        setErrorMsg(res.message);
      }
    }, 800);
  };

  // Sign Up submit
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const { fullName, email, phone, password, confirmPassword, agreeTerms } = signUpData;

    // Standard client checks
    if (!fullName.trim() || !email.trim() || !phone.trim() || !password || !confirmPassword) {
      setErrorMsg('All fields are required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!/^\+?[\d\s-]{8,15}$/.test(phone.replace(/\s/g, ''))) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = register(fullName, email, phone, password);
      setIsSubmitting(false);

      if (res.success) {
        setSuccessMsg('Account registered successfully! Logging in...');
        
        setTimeout(() => {
          handleClose();
        }, 1200);
      } else {
        setErrorMsg(res.message);
      }
    }, 800);
  };

  // Forgot Password Submit (Request OTP)
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!forgotEmail.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(forgotEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const emailExists = verifyEmailExists(forgotEmail);
    if (!emailExists) {
      setErrorMsg('No registered account found with this email address.');
      return;
    }

    setIsSubmitting(true);

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTime = new Date(Date.now() + 15 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    try {
      emailjs.send(
        'service_6cm1une',
        'template_orvwxo5',
        {
          to_email: forgotEmail,
          email: forgotEmail,
          passcode: generatedOtp,
          time: expiryTime
        },
        'vGFzGzx2tBr6RvH4A'
      )
      .then(() => {
        setIsSubmitting(false);
        setGeneratedOtp(generatedOtp);
        setResetEmail(forgotEmail);
        
        // Clear password & OTP input fields
        setOtpInput('');
        setNewPassword('');
        setConfirmNewPassword('');
   
        // Show OTP success message
        setSuccessMsg(`Verification code sent successfully to ${forgotEmail}! Check your inbox. (For testing, the OTP is also logged to console)`);
        console.log(`[TESTING] Generated OTP is: ${generatedOtp}`);
        setActiveTab('otp_reset');
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.error('EmailJS OTP Send Promise Catch Error:', err);
        setErrorMsg(err.text || err.message || 'Failed to dispatch verification email. Please try again later.');
      });
    } catch (err) {
      setIsSubmitting(false);
      console.error('EmailJS OTP Send Try-Catch Error:', err);
      setErrorMsg(err.message || 'Failed to dispatch verification email. Please try again later.');
    }
  };

  // Reset Password Submit (Verify OTP & Save Password)
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!otpInput.trim()) {
      setErrorMsg('Please enter the 6-digit verification code.');
      return;
    }

    if (otpInput.trim() !== generatedOtp) {
      setErrorMsg('Invalid verification code. Please check and try again.');
      return;
    }

    if (!newPassword || !confirmNewPassword) {
      setErrorMsg('Please enter and confirm your new password.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const res = resetPassword(resetEmail, newPassword);
      if (res.success) {
        setSuccessMsg('Password successfully updated! Please sign in.');
        
        // Clear all forgot/reset states
        setForgotEmail('');
        setResetEmail('');
        setGeneratedOtp('');
        setOtpInput('');
        setNewPassword('');
        setConfirmNewPassword('');

        // Switch to signin tab after 2 seconds
        setTimeout(() => {
          setSuccessMsg('');
          setActiveTab('signin');
        }, 2000);
      } else {
        setErrorMsg(res.message);
      }
    }, 800);
  };

  const handleBackToSignIn = () => {
    setErrorMsg('');
    setSuccessMsg('');
    setActiveTab('signin');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      
      {/* Modal Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6.5 sm:p-8 shadow-2xl relative animate-slide-up max-h-[95vh] overflow-y-auto">
        
        {/* Glow Header effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_4px_rgba(59,130,246,0.3)]" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/50 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5.5 h-5.5" />
        </button>

        {/* Brand header */}
        <div className="mb-6 text-center">
          <h3 className="text-xl font-extrabold tracking-wide text-white">APEX GLOBAL VISAS</h3>
          <p className="text-xs text-slate-500 mt-1">Consular Client Portal</p>
        </div>

        {/* Tabs toggle */}
        {(activeTab === 'signin' || activeTab === 'signup') ? (
          <div className="flex bg-slate-950 rounded-xl p-1 mb-6 border border-slate-800/80">
            <button
              onClick={() => { setActiveTab('signin'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'signin'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab('signup'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'signup'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Register Account
            </button>
          </div>
        ) : (
          <div className="mb-6 text-center">
            <h4 className="text-sm font-bold text-slate-300">
              {activeTab === 'forgot' ? 'Recover Password' : 'Reset Password'}
            </h4>
          </div>
        )}

        {/* Feedback Alert Cards */}
        {errorMsg && (
          <div className="mb-5 flex items-start gap-2.5 p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 text-red-400 text-xs animate-fade-in">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-5 flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-xs whitespace-pre-line animate-fade-in">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tab content: SIGN IN */}
        {activeTab === 'signin' && (
          <form onSubmit={handleSignInSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <Mail className="w-4 h-4 text-slate-500" />
                </span>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={signInData.email}
                  onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <Lock className="w-4 h-4 text-slate-500" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={signInData.password}
                  onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Remember me row */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setSignInData({ ...signInData, rememberMe: !signInData.rememberMe })}
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-300 focus:outline-none"
              >
                {signInData.rememberMe ? (
                  <CheckSquare className="w-4 h-4 text-blue-500" />
                ) : (
                  <Square className="w-4 h-4" />
                )}
                <span>Remember Me</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('forgot');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className="text-xs text-blue-400 hover:underline focus:outline-none"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 transition-all shadow-lg shadow-blue-600/20"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        )}

        {/* Tab content: SIGN UP */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <User className="w-4 h-4 text-slate-500" />
                </span>
                <input
                  type="text"
                  placeholder="e.g. Marcus Aurelius"
                  value={signUpData.fullName}
                  onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Mail className="w-4 h-4 text-slate-500" />
                  </span>
                  <input
                    type="email"
                    placeholder="name@mail.com"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Phone Number</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Phone className="w-4 h-4 text-slate-500" />
                  </span>
                  <input
                    type="tel"
                    placeholder="+1 555-0199"
                    value={signUpData.phone}
                    onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Lock className="w-4 h-4 text-slate-500" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 6 chars"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Confirm Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Lock className="w-4 h-4 text-slate-500" />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    value={signUpData.confirmPassword}
                    onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setSignUpData({ ...signUpData, agreeTerms: !signUpData.agreeTerms })}
                className="flex items-start gap-2.5 text-xs text-slate-400 hover:text-slate-300 focus:outline-none text-left"
              >
                <span className="mt-0.5 flex-shrink-0">
                  {signUpData.agreeTerms ? (
                    <CheckSquare className="w-4 h-4 text-blue-500" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </span>
                <span>I agree to the secure audit logs handling, terms of consular advisory and registration conditions.</span>
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 transition-all shadow-lg shadow-blue-600/20"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Register Account</span>
              )}
            </button>
          </form>
        )}

        {/* Tab content: FORGOT PASSWORD */}
        {activeTab === 'forgot' && (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <Mail className="w-4 h-4 text-slate-500" />
                </span>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 transition-all shadow-lg shadow-blue-600/20"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending Code...</span>
                </>
              ) : (
                <span>Send Reset Verification Code</span>
              )}
            </button>

            <button
              type="button"
              onClick={handleBackToSignIn}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-all focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </button>
          </form>
        )}

        {/* Tab content: OTP & RESET PASSWORD */}
        {activeTab === 'otp_reset' && (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Resetting Password For</label>
              <input
                type="text"
                value={resetEmail}
                disabled
                className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-sm text-slate-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Verification Code (OTP)</label>
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white tracking-widest text-center font-bold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">New Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <Lock className="w-4 h-4 text-slate-500" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Confirm New Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <Lock className="w-4 h-4 text-slate-500" />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 transition-all shadow-lg shadow-blue-600/20"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Resetting Password...</span>
                </>
              ) : (
                <span>Reset Password</span>
              )}
            </button>

            <button
              type="button"
              onClick={handleBackToSignIn}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-all focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
