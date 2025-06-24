"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEye, faEyeSlash, faHeart } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import React from "react";

export default function Home() {
  const [showPopup, setShowPopup] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confetti, setConfetti] = useState<Array<{id: number, x: number, y: number, color: string, rotation: number, size: number, speed: number}>>([]);
  const [mainConfetti, setMainConfetti] = useState<Array<{id: number, x: number, y: number, color: string, rotation: number, size: number, speed: number}>>([]);
  const correctPassword = "240444";
  const [currentImage, setCurrentImage] = useState(0);

  // เพิ่มรายชื่อไฟล์รูปจาก public แบบ manual (หรือจะใช้ dynamic import ก็ได้ แต่ Next.js ไม่รองรับ fs ในฝั่ง client)
  const publicImages = [
    '/Artboard1.jpg',
    '/Artboard1.png',
    '/1349195.png',
    '/1338843.png',
    '/2025-05-01_21.34.42.png',
  ];

  // Lofi images สำหรับ stack
  const lofiImagesStack = publicImages.map((src, idx) => ({
    src,
    title: `รูปที่ ${idx + 1}`,
    description: `ภาพจาก public (${src})`,
  }));

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
        speed: Math.random() * 1 + 0.5
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
            y: conf.y + conf.speed * 0.5,
            x: conf.x + (Math.random() - 0.5) * 0.5,
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
              speed: Math.random() * 1 + 0.5
            });
          }
          
          return updated;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [showSuccess]);

  // TimelineBar Component
  function TimelineBar({ years, activeIndex, onChange }: { years: string[], activeIndex: number, onChange: (idx: number) => void }) {
    return (
      <div className="w-full flex flex-col items-center my-8">
        <div className="relative w-full max-w-xs mx-auto px-2">
          {/* Bar */}
          <div className="absolute left-0 right-0 top-4.5 h-2 -translate-y-1/2 bg-blue-300 rounded-full" style={{zIndex:1}} />
          <div className="flex justify-between relative z-10">
            {years.map((year, idx) => (
              <div key={year} className="flex flex-col items-center w-1/4">
                {/* Node */}
                <button
                  className={`w-9 h-9 rounded-full flex items-center justify-center border-4 ${idx === activeIndex ? 'border-blue-600 bg-white shadow-lg' : 'border-blue-200 bg-white shadow'} transition-all duration-200`}
                  style={{marginBottom: 8, zIndex: 2}}
                  onClick={() => onChange(idx)}
                >
                  <div className={`w-5 h-5 rounded-full ${idx === activeIndex ? 'bg-blue-600' : 'bg-blue-200'}`}></div>
                </button>
                {/* Label (Bubble) */}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f7f8] relative overflow-hidden">
      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {showSuccess
          ? confetti.map((conf) => (
              <div
                key={conf.id}
                style={{
                  position: 'absolute',
                  left: `${conf.x}%`,
                  top: `${conf.y}%`,
                  width: conf.size * 2,
                  height: conf.size * 2,
                  background: conf.color,
                  borderRadius: '50%',
                  transform: `rotate(${conf.rotation}deg)`
                }}
                className="animate-confetti shadow-md opacity-80"
              />
            ))
          : mainConfetti.map((conf) => (
              <div
                key={conf.id}
                style={{
                  position: 'absolute',
                  left: `${conf.x}%`,
                  top: `${conf.y}%`,
                  width: conf.size * 2,
                  height: conf.size * 2,
                  background: conf.color,
                  borderRadius: '50%',
                  transform: `rotate(${conf.rotation}deg)`
                }}
                className="animate-confetti shadow-md opacity-80"
              />
            ))}
      </div>
      {/* Popup รหัสผ่าน */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f1f3f6] px-2 min-h-screen">
          <div className="card-neumorph w-full max-w-sm mx-auto animate-fade-in flex flex-col items-center justify-center gap-8 p-8">
            <h2 className="text-2xl text-[#363636] mb-6 font-kanit self-start flex items-center gap-2">
              <FontAwesomeIcon icon={faLock} className="text-blue-600 text-xl" />
              Secret code
            </h2>
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-8">
              {/* Password */}
              <div className="w-full flex flex-col items-center">
                <div className="relative w-full flex items-center justify-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-white rounded-2xl shadow-[0_2px_12px_0_#e0e3ea] px-5 py-4 pr-14 text-[#23272f] font-kanit text-base focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder-[#b6c3e0] transition"
                    placeholder="*******"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoFocus
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-6 -translate-y-1/2 flex items-center justify-center w-9 h-9 bg-white rounded-full shadow-md"
                    style={{boxShadow:'0 2px 8px #e0e3ea'}} 
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-[#b6c3e0] text-lg" />
                  </button>
                </div>
              </div>
              {error && (
                <div className="flex items-center gap-2 p-2 bg-transparent">
                  <span className="text-[#e11d48] text-xs font-kanit">{error}</span>
                </div>
              )}
              <button
                type="submit"
                className="w-4/6 py-4 rounded-full font-bold text-lg text-white shadow-lg bg-blue-600 hover:bg-blue-700 transition"
                style={{boxShadow:'0 8px 24px 0 #b6c3e055'}}
              >
                เข้าสู่ระบบ
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Success Page (HBD) */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f1f3f6] overflow-y-auto px-2">
          <div className="card-neumorph w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto animate-fade-in flex flex-col items-center gap-6 mt-10 mb-6 p-8 relative">
            <FontAwesomeIcon icon={faHeart} className="text-[#2563eb] text-4xl mb-2" />
            <h1 className="text-3xl sm:text-4xl font-bold text-[#23272f] font-kanit">สุขสันต์วันเกิด!</h1>
            <p className="text-base sm:text-lg text-[#23272f] text-center max-w-md font-kanit">
            HBDคับ🎉 นิมีน 25 ขวบแล้ว ขอให้ปีนี้เป็นปีที่ดี เต็มไปด้วยความสุข ความสำเร็จ และรอยยิ้มเยอะๆค้าบบ
            </p>
            {/* Stack images ในหน้า HBD */}
            <div className="relative w-50 h-60 flex items-center justify-center">
              {lofiImagesStack.map((img, idx) => {
                const isActive = idx === currentImage;
                return (
                  <div
                    key={img.src}
                    className={`absolute left-0 top-0 w-50 h-70 transition-all duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${isActive ? 'scale-100 z-30 opacity-100' : 'scale-90 z-20 opacity-60'} ${Math.abs(idx - currentImage) > 2 ? 'opacity-0' : ''}`}
                    style={{
                      transform: `translateX(${(idx - currentImage) * 20}px) scale(${isActive ? 1 : 0.9})`,
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.title}
                      fill
                      className="object-cover rounded-full border-4 border-white shadow-lg"
                    />
                  </div>
                );
              })}
            </div>
            {/* TimelineBar */}
            <TimelineBar years={['1','2','3','4']} activeIndex={currentImage} onChange={setCurrentImage} />
            <button
              className="btn-neumorph mt-4 bg-[#2563eb] hover:bg-[#1746a2] text-white font-bold py-3 rounded-xl shadow-md text-lg"
              onClick={() => { setShowSuccess(false); setShowPopup(true); setPassword(""); setConfetti([]); setMainConfetti([]); }}
            >
              กลับไปหน้าใส่รหัส
            </button>
            {/* Footer */}
            <div className="absolute left-0  right-0 bottom-2 text-center text-xs text-[#23272f] font-kanit opacity-70">
              Made with by YourFriend
            </div>
          </div>
        </div>
      )}
      {/* Main Content - Lofi Gallery */}
      {!showPopup && !showSuccess && (
        <div className="w-full max-w-md mx-auto px-2 sm:px-4 pb-10 pt-10 flex flex-col items-center">
          <div className="card-neumorph w-full animate-fade-in flex flex-col items-center">
            <div className="text-center py-8 sm:py-12">
              <h2 className="text-2xl sm:text-4xl font-bold text-[#2563eb] mb-3 sm:mb-6 font-kanit">
                Lofi Wallpapers Collection
              </h2>
              <p className="text-sm sm:text-xl text-[#3b82f6] font-kanit mb-4 sm:mb-8 max-w-2xl mx-auto">
                คอลเลกชันภาพพื้นหลังสไตล์ Lofi ที่สวยงามและผ่อนคลาย เลื่อนซ้ายขวาเพื่อดูภาพถัดไป
              </p>
            </div>
            <div className="relative w-full flex flex-col items-center">
              {/* Stack images */}
              <div className="relative w-72 h-72 flex items-center justify-center">
                {lofiImagesStack.map((img, idx) => {
                  const isActive = idx === currentImage;
                  return (
                    <div
                      key={img.src}
                      className={`absolute left-0 top-0 w-72 h-72 transition-all duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${isActive ? 'scale-100 z-30 opacity-100' : 'scale-90 z-20 opacity-60'} ${Math.abs(idx - currentImage) > 2 ? 'opacity-0' : ''}`}
                      style={{
                        transform: `translateX(${(idx - currentImage) * 32}px) scale(${isActive ? 1 : 0.9})`,
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.title}
                        fill
                        className="object-cover rounded-xl border-4 border-[#e5e7eb] shadow-lg"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="w-full flex justify-center mt-10">
                <input
                  type="range"
                  min={0}
                  max={lofiImagesStack.length - 1}
                  value={currentImage}
                  onChange={e => setCurrentImage(Number(e.target.value))}
                  className="slider-neumorph w-40 md:w-56 h-3"
                  style={{ accentColor: '#2563eb' }}
                />
              </div>
            </div>
            {/* ข้อมูลรูป */}
            <div className="mt-4 text-center">
              <h3 className="text-base sm:text-xl font-bold text-[#2563eb] mb-1 sm:mb-2 font-kanit text-center">
                {lofiImagesStack[currentImage].title}
              </h3>
              <p className="text-xs sm:text-base text-[#3b82f6] font-kanit leading-relaxed mb-2 sm:mb-4 text-center">
                {lofiImagesStack[currentImage].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
