import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff } from 'lucide-react';
import anakLogo from 'figma:asset/e98844b3cc7b597ff0b79e0a631a430f264ab517.png';

interface LoginScreenProps {
  navigateTo: () => void;
}

export default function LoginScreen({ navigateTo }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigateTo();
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigateTo();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-8 py-12">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center">
        {/* ANAK Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.img
            src={anakLogo}
            alt="ANAK Logo"
            className="w-32 h-32 object-contain mx-auto"
            animate={{
              y: [-2, 2, -2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-6"
        >
          {/* Email Input */}
          <div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email atau nomor ponsel"
              className="w-full px-4 py-4 bg-gray-100 border-0 rounded-2xl font-body text-base text-gray-900 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="w-full px-4 py-4 pr-12 bg-gray-100 border-0 rounded-2xl font-body text-base text-gray-900 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-orange-500 bg-gray-100 border-0 rounded focus:ring-orange-500 focus:ring-2"
              />
              <span className="text-gray-700 font-body text-sm">Ingat saya</span>
            </label>
            <button
              type="button"
              className="text-blue-500 font-body text-sm hover:text-blue-600 transition-colors"
            >
              Lupa password?
            </button>
          </div>

          {/* Login Button */}
          <motion.button
            onClick={handleLogin}
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-2xl font-heading font-bold text-base transition-all flex items-center justify-center ${
              isLoading
                ? 'bg-orange-300 text-white cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl'
            }`}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Masuk...</span>
              </div>
            ) : (
              <span>Masuk</span>
            )}
          </motion.button>

          {/* Google Login Button */}
          <motion.button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-2xl font-body font-semibold text-base transition-all flex items-center justify-center space-x-3 ${
              isLoading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-800 hover:bg-gray-900 text-white shadow-lg hover:shadow-xl'
            }`}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {/* Google Icon */}
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <span className="font-[Nunito]">Atau masuk google</span>
          </motion.button>
        </motion.div>

        {/* Additional Options - Moved outside and fixed at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-8 pb-8"
        >
          <p className="text-gray-600 font-body text-sm">
            Belum punya akun?{' '}
            <button className="text-orange-500 hover:text-orange-600 font-semibold">
              Daftar sekarang
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}