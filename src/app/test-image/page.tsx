"use client";

import Image from "next/image";

export default function TestImage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-8">ทดสอบรูปภาพ</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ใช้ img tag */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">ใช้ img tag</h2>
          <img 
            src="/1335810.png" 
            alt="Test Image" 
            className="w-full h-64 object-cover rounded"
          />
        </div>

        {/* ใช้ Next.js Image */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">ใช้ Next.js Image</h2>
          <div className="relative w-full h-64">
            <Image 
              src="/1335810.png" 
              alt="Test Image" 
              fill
              className="object-cover rounded"
            />
          </div>
        </div>

        {/* ทดสอบรูป SVG */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">รูป SVG (vercel.svg)</h2>
          <img 
            src="/vercel.svg" 
            alt="Vercel Logo" 
            className="w-32 h-32"
          />
        </div>

        {/* ทดสอบรูป SVG ด้วย Next.js Image */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">SVG ด้วย Next.js Image</h2>
          <Image 
            src="/vercel.svg" 
            alt="Vercel Logo" 
            width={128}
            height={128}
          />
        </div>
      </div>

      <div className="mt-8 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">ข้อมูลไฟล์</h2>
        <p>ไฟล์: /1335810.png</p>
        <p>ขนาด: 13MB</p>
        <p>ประเภท: PNG</p>
      </div>
    </div>
  );
} 