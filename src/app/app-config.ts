import { faWifi, faPlane, faSun, faBatteryFull, faSignal, faBolt, faBell, faCamera, faMusic, faLock, faEye, faEyeSlash, faShieldAlt, faCheckCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { faBluetooth } from '@fortawesome/free-brands-svg-icons';

export const appConfig = {
  statusBar: {
    time: "9:41",
    icons: [faSignal, faBatteryFull]
  },
  dynamicIsland: {
    text: "Lofi Gallery",
    color: "blue"
  },
  popup: {
    title: "ระบบรักษาความปลอดภัย",
    subtitle: "กรุณาใส่รหัสผ่านเพื่อเข้าสู่ระบบ",
    passwordHint: "240444",
    errorText: "รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง",
    icon: faShieldAlt,
    passwordIcon: faLock,
    showIcon: faEye,
    hideIcon: faEyeSlash,
    buttonText: "เข้าสู่ระบบ"
  },
  success: {
    title: "ยินดีต้อนรับ! 🎉",
    subtitle: "เข้าสู่ระบบสำเร็จแล้ว",
    description: "คุณสามารถใช้งานระบบได้แล้ว",
    icon: faCheckCircle,
    starIcon: faStar,
    buttonBack: "กลับไปหน้าหลัก",
    buttonNext: "ถัดไป →"
  },
  gallery: {
    title: "Lofi Wallpapers Collection",
    subtitle: "คอลเลกชันภาพพื้นหลังสไตล์ Lofi ที่สวยงามและผ่อนคลาย เลื่อนลงเพื่อดูภาพทั้งหมด",
    images: [
      { src: "/Artboard1.jpg", title: "Lofi Night City", description: "เมืองยามค่ำคืนที่เงียบสงบ พร้อมแสงไฟที่สวยงาม" },
      { src: "/Artboard1.jpg", title: "Cozy Room Vibes", description: "ห้องนอนที่อบอุ่น พร้อมบรรยากาศที่ผ่อนคลาย" },
      { src: "/Artboard1.jpg", title: "Rainy Window", description: "หน้าต่างยามฝนตก พร้อมเสียงฝนที่ผ่อนคลาย" },
      { src: "/Artboard1.jpg", title: "Sunset Dreams", description: "พระอาทิตย์ตกดิน พร้อมบรรยากาศที่โรแมนติก" },
      { src: "/Artboard1.jpg", title: "Study Session", description: "โต๊ะเรียนที่เรียบง่าย พร้อมแสงไฟที่อบอุ่น" },
      { src: "/Artboard1.jpg", title: "Cafe Corner", description: "มุมกาแฟที่สวยงาม พร้อมบรรยากาศที่ผ่อนคลาย" },
    ]
  },
  controlCenter: {
    main: [
      { icon: faWifi, label: 'Wi-Fi', color: 'bg-blue-500' },
      { icon: faBluetooth, label: 'Bluetooth', color: 'bg-cyan-500' },
      { icon: faPlane, label: 'Airplane', color: 'bg-indigo-500' },
      { icon: faSun, label: 'Brightness', color: 'bg-yellow-400' },
    ],
    small: [
      { icon: faBolt, color: 'bg-orange-400' },
      { icon: faBell, color: 'bg-red-400' },
      { icon: faCamera, color: 'bg-gray-400' },
      { icon: faMusic, color: 'bg-teal-400' },
    ]
  }
}; 