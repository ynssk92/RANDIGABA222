import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { Logo } from './Logo';
import { Lock, Mail, Eye, EyeOff, AlertCircle, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, setIsAdminOpen, language } = useCms();

  const [username, setUsername] = useState('admin@darrandigaba.com');
  const [password, setPassword] = useState('Taroudant#2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const result = await loginAdmin(username, password);
      if (!result.success) {
        setErrorMessage(result.error || 'Invalid credentials.');
      }
    } catch {
      setErrorMessage('An unexpected authentication error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseDefaultCredentials = () => {
    setUsername('admin@darrandigaba.com');
    setPassword('Taroudant#2026!');
    setErrorMessage(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#24241F]/90 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-[#F7F3EA] text-[#24241F] shadow-2xl p-8 sm:p-10 border border-[#4B502E]/20 animate-fadeIn">
        {/* Return to website */}
        <button
          type="button"
          onClick={() => setIsAdminOpen(false)}
          className="absolute top-6 right-6 p-2 text-[#24241F]/60 hover:text-[#4B502E] transition-colors cursor-pointer flex items-center gap-1 text-xs font-sans tracking-wider uppercase"
          aria-label="Exit admin login"
        >
          <ArrowLeft size={16} />
          <span>Website</span>
        </button>

        {/* Brand Header */}
        <div className="text-center mb-8 pt-2 flex flex-col items-center">
          <Logo variant="header" className="mb-4" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#4B502E]/10 text-[#4B502E] text-[10px] font-sans tracking-[0.25em] uppercase font-semibold">
            <ShieldCheck size={13} />
            <span>SECURE CMS ACCESS</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#24241F] font-normal mt-3">
            Admin Authentication
          </h2>
          <p className="font-sans text-xs text-[#24241F]/65 mt-1">
            Please log in to manage rooms, bookings, reviews, and website content.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs font-sans flex items-start gap-2.5 animate-fadeIn">
            <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">{errorMessage}</div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-sans tracking-wider uppercase text-[#4B502E] font-medium mb-1.5">
              Username or Email
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[#4B502E]/60 pointer-events-none">
                <Mail size={16} />
              </span>
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@darrandigaba.com"
                className="w-full pl-10 pr-3 py-2.5 bg-[#FCFBF7] border border-[#4B502E]/25 text-sm text-[#24241F] focus:border-[#4B502E] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-sans tracking-wider uppercase text-[#4B502E] font-medium">
                Password
              </label>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[#4B502E]/60 pointer-events-none">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-[#FCFBF7] border border-[#4B502E]/25 text-sm text-[#24241F] focus:border-[#4B502E] focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-[#24241F]/50 hover:text-[#4B502E] transition-colors p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#4B502E] text-[#FCFBF7] hover:bg-[#414628] disabled:opacity-60 text-xs font-sans tracking-[0.2em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-2"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <span>Authorize & Enter CMS</span>
            )}
          </button>
        </form>

        {/* Security & Credentials Assistance */}
        <div className="mt-8 pt-6 border-t border-[#4B502E]/15">
          <div className="p-3 bg-[#EFE8DA] border border-[#4B502E]/15 text-xs font-sans space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#4B502E] flex items-center gap-1.5">
                <CheckCircle2 size={13} />
                <span>Initial Super-Admin Setup</span>
              </span>
              <button
                type="button"
                onClick={handleUseDefaultCredentials}
                className="text-[10px] uppercase tracking-wider text-[#4B502E] hover:underline cursor-pointer"
              >
                Autofill
              </button>
            </div>
            <div className="text-[#24241F]/80 space-y-0.5 text-[11px] font-mono">
              <div><span className="text-[#4B502E]">User:</span> admin@darrandigaba.com</div>
              <div><span className="text-[#4B502E]">Pass:</span> Taroudant#2026!</div>
            </div>
            <p className="text-[10px] text-[#24241F]/60 leading-normal pt-1 border-t border-[#4B502E]/10">
              Authenticated directly against database with 12-round bcrypt hash, HttpOnly Secure SameSite=Strict cookies, and rate-limiting. Configured via <span className="font-mono">.env</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
