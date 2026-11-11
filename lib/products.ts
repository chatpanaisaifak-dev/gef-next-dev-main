export interface ProductSpec {
  label: string;
  value: string;
}

export interface ModalProductData {
  title: string;
  subtitle: string;
  image: string;
  description?: string;
  features: string[];
  specs: ProductSpec[];
  price: string;
}

export interface FeatureProductData {
  id: string;
  key: ProductKey;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  featureList: string[];
}

export type ProductKey = 'k9pro' | 'a9plus' | 's9pro' | 'v3pro';

export const productModalData: Record<ProductKey, ModalProductData> = {
  k9pro: {
    title: "Huracan K9 PRO",
    subtitle: "สุดยอดเครื่องปั่นสำหรับมืออาชีพ",
    image: "/media/image/K9Details.jpg",
    features: [
      "มอเตอร์ DC ความเร็วสูง ทนทาน ใช้งานได้นาน",
      "ใบมีด 6 แฉก SUS304/ Stainless Steel Blade ทนทาน ไม่เป็นสนิม",
      "Soundproof Cover ตู้เก็บเสียงในตัว ขนาด 7 มิล ลดเสียงรบกวน",
      "โปรแกรมตั้งระดับการปั่นแบบอัตโนมัติ",
      "ปุ่มกดคอนโทลพร้อมระบบออโต้"
    ],
    specs: [
      { label: "กำลัง", value: "1,500 - 2000W, 220V 50 - 60Hz" },
      { label: "ความจุ", value: "1.5 ลิตร" },
      { label: "ความเร็ว", value: "22,000 RPM" },
      { label: "น้ำหนัก", value: "9.5 กก." }
    ],
    price: "฿15,900"
  },
  a9plus: {
    title: "GEF A9 PLUS",
    subtitle: "ความสมบูรณ์แบบที่ปรับแต่งได้",
    image: "/media/image/A9Details.jpg",
    description: "ควบคุมทุกการปั่นด้วยแผงควบคุมดิจิทัลอัจฉริยะ ให้คุณตั้งโปรแกรมการทำงานได้อย่างอิสระ เพื่อให้ได้เนื้อสัมผัสที่สมบูรณ์แบบในทุกแก้ว",
    features: [
      "ปั่นเงียบ เสียงเบากว่า 40 dB",
      "วัสดุหุ้มฉนวนกันเสียงแบบ 2 ชั้น หนากว่า 9mm ป้องกันเสียงรบกวน",
      "ระบบป้องกันความปลอดภัย ป้องกันกระแสไฟและอุณหภูมิเกิน",
      "Super Motor มอเตอร์ไร้แปรงถ่าน นำเข้าจากญี่ปุ่น"
    ],
    specs: [
      { label: "กำลัง", value: "1,500 - 2,000 W, 220 - 240V" },
      { label: "ความจุ", value: "1.5 ลิตร" },
      { label: "ความเร็ว", value: "18,000 RPM" },
      { label: "น้ำหนัก", value: "11.1 กก." }
    ],
    price: "฿18,900"
  },
  s9pro: {
    title: "GEF S9 PRO",
    subtitle: "ความสมบูรณ์แบบที่ปรับแต่งได้",
    image: "/media/image/A9Details.jpg",
    description: "ใช้พื้นที่บาร์อย่างคุ้มค่า ออกแบบโดยคำนึงถึงความกะทัดรัดของพื้นที่โดยรวมเครื่องปั่นสมูทตี้ที่เหมาะกับร้านกาแฟและชา ปั่นได้ตั้งแต่เช้าจรดค่ำ",
    features: [
      "กำลังสูงสุด 4 แรงม้า มอเตอร์ไร้แปรงถ่าน V8",
      "อายุการใช้งานสูงถึง 400,000 รอบ มากกว่ามอเตอร์ AC 10 เท่า",
      "ระบบป้องกันความปลอดภัย ป้องกันกระแสไฟและอุณหภูมิเกิน",
      "แผงควบคุมเทคโนโลยีเคลือบฟิล์ม IMD กันความชื้นและกันน้ำ"
    ],
    specs: [
      { label: "กำลัง", value: "1,500 - 2,000 W, 220 - 240V" },
      { label: "ความจุ", value: "1.5 ลิตร" },
      { label: "ความเร็ว", value: "18,000 RPM" },
      { label: "น้ำหนัก", value: "11.5 กก." }
    ],
    price: "฿18,900"
  },
  v3pro: {
    title: "GEF V3 PRO",
    subtitle: "ปั่นได้ตลอดทั้งวันไม่ต้องพัก",
    image: "/media/image/V3-Details.png",
    description: "เครื่องปั่นเชิงพาณิชย์ที่ออกแบบมาเพื่อเครื่องดื่มยุคใหม่โดยเฉพาะ เพิ่มประสิทธิภาพการทำงานหน้าร้านให้ดียิ่งขึ้นพร้อมความปลอดภัยที่มั่นใจได้",
    features: [
      "ปั่นเงียบ เสียงเบากว่า 40 dB",
      "ระบบหยุดแบบเรียลไทม์ ลดความเสียหายของตลับลูกปืน",
      "มอเตอร์ขนาดใหญ่ ทำงานพร้อมระบบปั่นสี่มิติ",
      "ตัวเครื่องพลาสติกโคโพลีเอสเตอร์ ความแข็งแรงสูง ผ่านมาตรฐานความปลอดภัย LFGB"
    ],
    specs: [
      { label: "กำลัง", value: "1,500W , 220 - 240V" },
      { label: "ความจุ", value: "1.5 ลิตร" },
      { label: "ความเร็ว", value: "16,000 RPM" },
      { label: "น้ำหนัก", value: "9.3 กก." }
    ],
    price: "฿16,900"
  }
};

export const featureProducts: FeatureProductData[] = [
  {
    id: "product-k9pro",
    key: "k9pro",
    title: "Huracan K9 PRO",
    subtitle: "สุดยอดเครื่องปั่นสำหรับมืออาชีพ",
    description: "รองรับการปั่นหนักๆได้ตลอดทั้งวัน ด้วยมอเตอร์ระบบ DC ที่ให้รอบปั่นสูง ปั่นเร็ว ปั่นแรง ปั่นละเอียด เสียงเบา มาพร้อม Soundproof Cover ลดเสียงรบกวน และระบบออโต้ใช้งานได้สะดวกยิ่งขึ้น",
    image: "/media/image/K9_Pro.png",
    imageAlt: "Huracan K9 PRO Blender",
    reverse: false,
    featureList: [
      "มอเตอร์ DC ทนทาน ความเร็วสูง ไม่สะสมความร้อน",
      "ใบมีด 6 แฉก SUS304 Stainless Steel Blade ทนทาน ไม่เป็นสนิม",
      "ปรับความแรงได้ 8 ระดับ พร้อมปุ่มกระแทกน้ำแข็ง"
    ]
  },
  {
    id: "product-a9plus",
    key: "a9plus",
    title: "GEF A9 PLUS",
    subtitle: "ความสมบูรณ์แบบที่ปรับแต่งได้",
    description: "ควบคุมทุกการปั่นด้วยแผงควบคุมดิจิทัลอัจฉริยะ ให้คุณตั้งโปรแกรมการทำงานได้อย่างอิสระ เพื่อให้ได้เนื้อสัมผัสที่สมบูรณ์แบบในทุกแก้ว",
    image: "/media/image/GEF_A9_Plus.png",
    imageAlt: "GEF A9 PLUS Blender",
    reverse: true,
    featureList: [
      "อายุการใช้งานมอเตอร์นานกว่ามอเตอร์ซีรีส์ทั่วไปถึง 10 เท่า",
      "เทคโนโลยีออกแบบเครื่อง ป้องกันน้ำและความชื้น ",
      "ใช้งานง่ายด้วยปุ่มกดแบบอัตโนมัติ และมีโปรแกรมปรับแต่ง DIY "
    ]
  },
  {
    id: "product-s9pro",
    key: "s9pro",
    title: "GEF S9 PRO",
    subtitle: "สุดยอดเครื่องปั่นสำหรับมืออาชีพ",
    description: "ใช้พื้นที่บาร์อย่างคุ้มค่า ออกแบบโดยคำนึงถึงความกะทัดรัดของพื้นที่โดยรวม เครื่องปั่นสมูทตี้ที่เหมาะกับร้านกาแฟและชา ปั่นได้ตั้งแต่เช้าจรดค่ำ",
    image: "/media/image/A9Details.jpg",
    imageAlt: "GEF S9 PRO Blender",
    reverse: false,
    featureList: [
      "มอเตอร์ DC ทนทาน ความเร็วสูง ไม่สะสมความร้อน",
      "เทคโนโลยีซีลจดสิทธิบัตร กันน้ำและกันความชื้นทั้งตัวเครื่อง",
      "ระบบชิปประมวลผลทรงพลัง ตั้งค่าเองได้ตามต้องการ"
    ]
  },
  {
    id: "product-v3pro",
    key: "v3pro",
    title: "GEF V3 PRO",
    subtitle: "ปั่นได้ตลอดทั้งวันไม่ต้องพัก",
    description: "เครื่องปั่นเชิงพาณิชย์ที่ออกแบบมาเพื่อเครื่องดื่มยุคใหม่โดยเฉพาะ เพิ่มประสิทธิภาพการทำงานหน้าร้านให้ดียิ่งขึ้นพร้อมความปลอดภัยที่มั่นใจได้",
    image: "/media/image/V3PRO.png",
    imageAlt: "GEF V3 PRO Blender",
    reverse: true,
    featureList: [
      "ทนทานต่อการใช้งาน ถี่สูงกว่า 300,000 รอบ ",
      "เทคโนโลยีออกแบบเครื่อง ป้องกันน้ำและความชื้น ",
      "โถปั่นทรงดอกเหมย ทำให้วัตถุดิบบดเนียนละเอียดและเข้ากันสม่ำเสมอ "
    ]
  }
];
