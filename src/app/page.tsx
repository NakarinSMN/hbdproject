"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEye, faEyeSlash, faShieldAlt, faCheckCircle, faStar, faArrowDown, faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [showPopup, setShowPopup] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confetti, setConfetti] = useState<Array<{id: number, x: number, y: number, color: string, rotation: number, size: number, speed: number}>>([]);
  const [mainConfetti, setMainConfetti] = useState<Array<{id: number, x: number, y: number, color: string, rotation: number, size: number, speed: number}>>([]);
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const correctPassword = "240444";

  // Lofi wallpapers data
  const lofiImages = [
    {
      id: 1,
      src: "/Artboard1.jpg",
      title: "Lofi Night City",
      description: "เมืองยามค่ำคืนที่เงียบสงบ พร้อมแสงไฟที่สวยงาม",
      direction: "right"
    },
    {
      id: 2,
      src: "/Artboard1.jpg",
      title: "Cozy Room Vibes",
      description: "ห้องนอนที่อบอุ่น พร้อมบรรยากาศที่ผ่อนคลาย",
      direction: "right"
    },
    {
      id: 3,
      src: "/Artboard1.jpg",
      title: "Rainy Window",
      description: "หน้าต่างยามฝนตก พร้อมเสียงฝนที่ผ่อนคลาย",
      direction: "right"
    },
    {
      id: 4,
      src: "/Artboard1.jpg",
      title: "Sunset Dreams",
      description: "พระอาทิตย์ตกดิน พร้อมบรรยากาศที่โรแมนติก",
      direction: "right"
    },
    {
      id: 5,
      src: "/Artboard1.jpg",
      title: "Study Session",
      description: "โต๊ะเรียนที่เรียบง่าย พร้อมแสงไฟที่อบอุ่น",
      direction: "right"
    },
    {
      id: 6,
      src: "/Artboard1.jpg",
      title: "Cafe Corner",
      description: "มุมกาแฟที่สวยงาม พร้อมบรรยากาศที่ผ่อนคลาย",
      direction: "right"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setShowPopup(false);
      setShowSuccess(true);
      setError("");
      createConfetti();
    } else {
      setError("รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
    }
  };

  const createConfetti = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
    const newConfetti = [];
    
    for (let i = 0; i < 100; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        size: Math.random() * 6 + 3,
        speed: Math.random() * 2 + 1
      });
    }
    
    setConfetti(newConfetti);
  };

  const createMainConfetti = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
    const newConfetti = [];
    
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 1.5 + 0.5
      });
    }
    
    setMainConfetti(newConfetti);
  };

  useEffect(() => {
    setVisibleImages(new Set(lofiImages.map(img => img.id)));
  }, []);

  // Initialize main confetti when entering main page
  useEffect(() => {
    if (!showPopup && !showSuccess) {
      createMainConfetti();
    }
  }, [showPopup, showSuccess]);

  // Main confetti animation
  useEffect(() => {
    if (!showPopup && !showSuccess) {
      const interval = setInterval(() => {
        setMainConfetti(prev => {
          const updated = prev.map(conf => ({
            ...conf,
            y: conf.y + conf.speed,
            x: conf.x + (Math.random() - 0.5) * 0.5,
            rotation: conf.rotation + 3
          })).filter(conf => conf.y < 110);
          
          if (Math.random() < 0.1 && updated.length < 40) {
            const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
            updated.push({
              id: Date.now() + Math.random(),
              x: Math.random() * 100,
              y: -10,
              color: colors[Math.floor(Math.random() * colors.length)],
              rotation: Math.random() * 360,
              size: Math.random() * 4 + 2,
              speed: Math.random() * 1.5 + 0.5
            });
          }
          
          return updated;
        });
      }, 80);

      return () => clearInterval(interval);
    }
  }, [showPopup, showSuccess]);

  useEffect(() => {
    if (showSuccess) {
      const interval = setInterval(() => {
        setConfetti(prev => {
          const updated = prev.map(conf => ({
            ...conf,
            y: conf.y + conf.speed,
            x: conf.x + (Math.random() - 0.5) * 1,
            rotation: conf.rotation + 5
          })).filter(conf => conf.y < 110);
          
          if (Math.random() < 0.2 && updated.length < 80) {
            const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
            updated.push({
              id: Date.now() + Math.random(),
              x: Math.random() * 100,
              y: -10,
              color: colors[Math.floor(Math.random() * colors.length)],
              rotation: Math.random() * 360,
              size: Math.random() * 6 + 3,
              speed: Math.random() * 2 + 1
            });
          }
          
          return updated;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [showSuccess]);

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-2">
          <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 flex flex-col gap-8 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto border border-gray-100">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full mb-4 sm:mb-6">
                <FontAwesomeIcon icon={faShieldAlt} className="text-gray-600 text-2xl sm:text-3xl" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 font-kanit">ระบบรักษาความปลอดภัย</h2>
              <p className="text-gray-500 text-sm sm:text-base font-kanit">กรุณาใส่รหัสผ่านเพื่อเข้าสู่ระบบ</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-gray-400 text-base sm:text-lg" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-4 focus:ring-gray-100 transition-all duration-300 text-gray-700 placeholder-gray-400 font-kanit text-base sm:text-lg"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="รหัสผ่าน"
                  autoFocus
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon 
                    icon={showPassword ? faEyeSlash : faEye} 
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200 text-base sm:text-lg" 
                  />
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-red-400 rounded-full"></div>
                  <span className="text-red-600 text-xs sm:text-sm font-kanit">{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-offset-2 transform transition-all duration-300 hover:scale-105 active:scale-95 font-kanit text-base sm:text-lg shadow-lg hover:shadow-xl"
              >
                เข้าสู่ระบบ
              </button>
            </form>

          </div>
        </div>
      )}

      {/* Success Page with Confetti */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-50 to-white overflow-hidden px-2">
          {/* Confetti */}
          {confetti.map((conf) => (
            <div
              key={conf.id}
              className="absolute"
              style={{
                left: `${conf.x}%`,
                top: `${conf.y}%`,
                backgroundColor: conf.color,
                width: `${conf.size}px`,
                height: `${conf.size}px`,
                borderRadius: '50%',
                transform: `rotate(${conf.rotation}deg)`,
                boxShadow: `0 0 8px ${conf.color}`
              }}
            />
          ))}
          
          {/* Success Content */}
          <div className="flex items-center justify-center min-h-screen relative">
            <div className="text-center animate-fade-in relative z-10 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto bg-white/80 rounded-3xl p-6 sm:p-10 shadow-2xl">
              {/* Success Icon */}
              <div className="relative mb-6 sm:mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full shadow-2xl">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-gray-600 text-4xl sm:text-6xl" />
                </div>
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-10 sm:h-10 bg-gray-300 rounded-full flex items-center justify-center animate-pulse">
                  <FontAwesomeIcon icon={faStar} className="text-gray-600 text-base sm:text-lg" />
                </div>
              </div>
              
              {/* Main Text */}
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-8 font-kanit animate-pulse-slow text-gray-800">
                ยินดีต้อนรับ! 🎉
              </h1>
              <p className="text-lg sm:text-2xl mb-2 sm:mb-6 font-kanit text-gray-700">
                เข้าสู่ระบบสำเร็จแล้ว
              </p>
              <p className="text-base sm:text-xl mb-4 sm:mb-10 font-kanit text-gray-500">
                คุณสามารถใช้งานระบบได้แล้ว
              </p>
              
              {/* Decorative Stars */}
              <div className="flex justify-center gap-4 sm:gap-8 mb-6 sm:mb-10">
                <FontAwesomeIcon icon={faStar} className="text-gray-400 text-xl sm:text-4xl animate-pulse" />
                <FontAwesomeIcon icon={faStar} className="text-gray-400 text-xl sm:text-4xl animate-pulse" style={{animationDelay: '0.3s'}} />
                <FontAwesomeIcon icon={faStar} className="text-gray-400 text-xl sm:text-4xl animate-pulse" style={{animationDelay: '0.6s'}} />
                <FontAwesomeIcon icon={faStar} className="text-gray-400 text-xl sm:text-4xl animate-pulse" style={{animationDelay: '0.9s'}} />
                <FontAwesomeIcon icon={faStar} className="text-gray-400 text-xl sm:text-4xl animate-pulse" style={{animationDelay: '1.2s'}} />
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <button
                  onClick={() => {
                    setShowSuccess(false);
                    setShowPopup(true);
                    setPassword("");
                    setConfetti([]);
                    setMainConfetti([]);
                  }}
                  className="bg-gray-500 text-white font-semibold py-3 sm:py-5 px-6 sm:px-10 rounded-xl hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50 transform transition-all duration-300 hover:scale-105 active:scale-95 font-kanit shadow-lg hover:shadow-xl text-base sm:text-lg"
                >
                  กลับไปหน้าหลัก
                </button>
                <button
                  onClick={() => {
                    setShowSuccess(false);
                    setConfetti([]);
                  }}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold py-3 sm:py-5 px-8 sm:px-12 rounded-xl hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50 transform transition-all duration-300 hover:scale-110 active:scale-95 font-kanit shadow-lg hover:shadow-xl text-base sm:text-lg"
                >
                  ถัดไป →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Lofi Gallery */}
      {!showPopup && !showSuccess && (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-2 relative overflow-hidden">
          {/* Main Confetti */}
          {mainConfetti.map((conf) => (
            <div
              key={conf.id}
              className="absolute pointer-events-none"
              style={{
                left: `${conf.x}%`,
                top: `${conf.y}%`,
                backgroundColor: conf.color,
                width: `${conf.size}px`,
                height: `${conf.size}px`,
                borderRadius: '50%',
                transform: `rotate(${conf.rotation}deg)`,
                boxShadow: `0 0 6px ${conf.color}`,
                zIndex: 10
              }}
            />
          ))}

          {/* Header */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm rounded-b-2xl relative">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
              <div className="flex justify-between items-center py-4 sm:py-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                    <FontAwesomeIcon icon={faHeart} className="text-gray-600 text-base sm:text-lg" />
                  </div>
                  <h1 className="text-lg sm:text-2xl font-bold text-gray-800 font-kanit">Nakarin Smn</h1>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <span className="text-xs sm:text-sm text-gray-600 font-kanit">ยินดีต้อนรับ</span>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-white text-xs sm:text-sm" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <div className="text-center py-8 sm:py-16 px-2 sm:px-4 animate-fade-in">
            <h2 className="text-2xl sm:text-5xl font-bold text-gray-800 mb-3 sm:mb-6 font-kanit">
              Lofi Wallpapers Collection
            </h2>
            <p className="text-sm sm:text-xl text-gray-600 font-kanit mb-4 sm:mb-8 max-w-2xl mx-auto">
              คอลเลกชันภาพพื้นหลังสไตล์ Lofi ที่สวยงามและผ่อนคลาย 
              เลื่อนลงเพื่อดูภาพทั้งหมด
            </p>
            <div className="animate-bounce">
              <FontAwesomeIcon icon={faArrowDown} className="text-gray-400 text-lg sm:text-2xl" />
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pb-10 sm:pb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {lofiImages.map((image, index) => (
                <div
                  key={image.id}
                  data-id={image.id}
                  className={`transform transition-all duration-1000 ease-out animate-fade-in ${
                    visibleImages.has(image.id)
                      ? 'translate-x-0 opacity-100 scale-100'
                      : image.direction === 'left' 
                        ? '-translate-x-full opacity-0 scale-95' 
                        : 'translate-x-full opacity-0 scale-95'
                  }`}
                  style={{
                    transitionDelay: `${index * 200}ms`
                  }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group border border-gray-100 flex flex-col">
                    <div className="relative h-48 sm:h-64 overflow-hidden bg-blue-100 border-b border-blue-200 flex items-center justify-center">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          console.error('Error loading image:', image.src);
                          console.log('Falling back to vercel.svg');
                          e.currentTarget.src = "/vercel.svg";
                        }}
                        onLoad={(e) => {
                          console.log('Image loaded successfully:', image.src);
                          const img = e.target as HTMLImageElement;
                          console.log('Image dimensions:', img.naturalWidth, 'x', img.naturalHeight);
                          console.log('Image display style:', img.style.display);
                          console.log('Image visibility:', img.style.visibility);
                          console.log('Image opacity:', img.style.opacity);
                          console.log('Container dimensions:', img.parentElement?.offsetWidth, 'x', img.parentElement?.offsetHeight);
                          console.log('Image computed style:', window.getComputedStyle(img).width, 'x', window.getComputedStyle(img).height);
                        }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2 font-kanit group-hover:text-gray-600 transition-colors duration-300">
                          {image.title}
                        </h3>
                        <p className="text-xs sm:text-base text-gray-600 font-kanit leading-relaxed mb-2 sm:mb-4">
                          {image.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 mt-auto">
                        <FontAwesomeIcon icon={faHeart} className="text-gray-400 text-xs sm:text-sm" />
                        <span className="text-xs sm:text-sm text-gray-500 font-kanit">Lofi Vibes</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 rounded-t-2xl">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-8">
              <div className="text-center">
                <p className="text-xs sm:text-base text-gray-500 font-kanit">
                  © 2024 Lofi Gallery. สร้างด้วย Next.js และ Tailwind CSS
                </p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
