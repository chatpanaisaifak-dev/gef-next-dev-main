'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useProductModal } from '@/components/ProductModal';
import type { ProductKey } from '@/lib/products';
import { productModalData } from '@/lib/products';
import { SITE } from '@/lib/site';

interface Slide {
  key: ProductKey;
  name: string;
  headline: string;
  lede: string;
  /** Transparent PNG cutout of the machine */
  image: string;
  alt: string;
  readout: { value: string; unit?: string; label: string }[];
}

// Every figure below comes from lib/products.ts (spec sheets / feature lists).
const SLIDES: Slide[] = [
  {
    key: 'a9plus',
    name: 'GEF A9 PLUS',
    headline: 'ปั่นหนักทั้งวัน แต่เสียงเบากว่า 40 dB',
    lede: 'ตู้ครอบเก็บเสียง 2 ชั้น มอเตอร์ไร้แปรงถ่าน และโปรแกรมปั่นที่ตั้งเองได้ตามสูตรของร้าน',
    image: '/media/image/cutout/a9plus.png',
    alt: 'เครื่องปั่น GEF A9 PLUS ตู้ครอบเก็บเสียงใส ฐานสีเทาเข้ม',
    readout: [
      { value: '< 40', unit: 'dB', label: 'ระดับเสียงขณะปั่น' },
      { value: '18,000', unit: 'RPM', label: 'ความเร็วรอบ' },
      { value: '1.5', unit: 'ลิตร', label: 'ความจุโถ' },
      { value: '9', unit: 'มม.', label: 'ความหนาฝาครอบเก็บเสียง' },
    ],
  },
  {
    key: 'k9pro',
    name: 'Huracan K9 PRO',
    headline: 'ปั่นเร็ว ปั่นแรง ปั่นละเอียด ได้ทั้งวัน',
    lede: 'มอเตอร์ DC รอบสูงที่ไม่สะสมความร้อน ใบมีด 6 แฉก SUS304 และฝาครอบเก็บเสียงในตัว',
    image: '/media/image/cutout/k9pro.png',
    alt: 'เครื่องปั่น Huracan K9 PRO สีดำ ตู้ครอบเก็บเสียงในตัว',
    readout: [
      { value: '22,000', unit: 'RPM', label: 'ความเร็วรอบ' },
      { value: '1.5', unit: 'ลิตร', label: 'ความจุโถ' },
      { value: '6', unit: 'แฉก', label: 'ใบมีดสเตนเลส' },
      { value: '9.5', unit: 'กก.', label: 'น้ำหนักเครื่อง' },
    ],
  },
  {
    key: 's9pro',
    name: 'GEF S9 PRO',
    headline: 'กะทัดรัดบนเคาน์เตอร์ ปั่นได้ตั้งแต่เช้าจรดค่ำ',
    lede: 'มอเตอร์ไร้แปรงถ่าน V8 กำลังสูงสุด 4 แรงม้า แผงควบคุมกันน้ำและกันความชื้น',
    image: '/media/image/cutout/s9pro.png',
    alt: 'เครื่องปั่น GEF S9 PRO ฐานสีเทา แผงควบคุมกันน้ำ',
    readout: [
      { value: '4', unit: 'แรงม้า', label: 'กำลังสูงสุด' },
      { value: '400,000', unit: 'รอบ', label: 'อายุการใช้งานมอเตอร์' },
      { value: '18,000', unit: 'RPM', label: 'ความเร็วรอบ' },
      { value: '11.5', unit: 'กก.', label: 'น้ำหนักเครื่อง' },
    ],
  },
  {
    key: 'v3pro',
    name: 'GEF V3 PRO',
    headline: 'ปั่นได้ตลอดทั้งวันไม่ต้องพัก',
    lede: 'ออกแบบสำหรับเครื่องดื่มยุคใหม่ ระบบหยุดแบบเรียลไทม์ และตัวเครื่องผ่านมาตรฐาน LFGB',
    image: '/media/image/cutout/v3pro.png',
    alt: 'เครื่องปั่น GEF V3 PRO สีดำ จอแสดงผลสีฟ้า',
    readout: [
      { value: '< 40', unit: 'dB', label: 'ระดับเสียงขณะปั่น' },
      { value: '16,000', unit: 'RPM', label: 'ความเร็วรอบ' },
      { value: '1.5', unit: 'ลิตร', label: 'ความจุโถ' },
      { value: '9.3', unit: 'กก.', label: 'น้ำหนักเครื่อง' },
    ],
  },
];

const INTERVAL_MS = 6500;

// Fixed values (not random) so server and client render the same markup.
const BUBBLES = Array.from({ length: 18 }, (_, i) => ({
  x: (i * 37 + 9) % 96,
  size: 10 + ((i * 13) % 26),
  dur: 10 + ((i * 7) % 9),
  delay: -((i * 5) % 17),
  drift: (i % 2 ? 1 : -1) * (24 + ((i * 11) % 60)),
  rot: (i % 2 ? 1 : -1) * (90 + ((i * 17) % 200)),
  cube: i % 3 === 0,
}));

export default function HeroShowcase() {
  const { open } = useProductModal();
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  // Respect prefers-reduced-motion: never auto-advance.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Advances on a fixed timer; nothing interrupts it.
  const running = !reduced;

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      INTERVAL_MS
    );
    return () => window.clearTimeout(id);
  }, [running, index]);

  const current = SLIDES[index];

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="เครื่องปั่นแนะนำ"
    >
      {/* Always-moving background: vortex swirls, drifting light, rising ice. Decorative only. */}
      <div className="hero-bg" aria-hidden="true">
        <span className="blob blob-a" />
        <span className="blob blob-b" />
        <span className="blob blob-c" />
        <span className="vortex" />
        <span className="vortex vortex-b" />
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className={`bubble${b.cube ? ' cube' : ''}`}
            style={
              {
                '--x': `${b.x}%`,
                '--s': `${b.size}px`,
                '--d': `${b.dur}s`,
                '--delay': `${b.delay}s`,
                '--drift': `${b.drift}px`,
                '--rot': `${b.rot}deg`,
              } as React.CSSProperties
            }
          />
        ))}
        <span className="hero-sweep" />
      </div>

      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-stack" aria-live={running ? 'off' : 'polite'}>
            {SLIDES.map((s, i) => (
              <div
                key={s.key}
                className={`hero-slide${i === index ? ' is-active' : ''}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} จาก ${SLIDES.length}: ${s.name}`}
                aria-hidden={i !== index}
                inert={i !== index}
              >
                <p className="hero-model">{s.name}</p>
                {i === index ? (
                  <h1 className="hero-title">{s.headline}</h1>
                ) : (
                  <p className="hero-title">{s.headline}</p>
                )}
                <p className="hero-lede">{s.lede}</p>

                <ul className="readout" aria-label={`สเปกหลักของ ${s.name}`}>
                  {s.readout.map((r) => (
                    <li key={r.label}>
                      <strong className="num">
                        {r.value}
                        {r.unit && <small>{r.unit}</small>}
                      </strong>
                      <span>{r.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-solid"
              onClick={() => open(current.key)}
            >
              ดูสเปกและราคา {productModalData[current.key].title}
            </button>
            <a
              href={SITE.line}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-line"
            >
              ปรึกษาทาง LINE
            </a>
          </div>
        </div>

        <div className="hero-art">
          {SLIDES.map((s, i) => (
            <div
              key={s.key}
              className={`hero-art-slide${i === index ? ' is-active' : ''}`}
              aria-hidden="true"
            >
              <Image
                src={s.image}
                alt=""
                fill
                priority={i === 0}
                loading="eager"
                sizes="(max-width: 900px) 80vw, 460px"
                style={{ objectFit: 'contain', objectPosition: 'center bottom' }}
              />
            </div>
          ))}
          <span className="hero-floor" aria-hidden="true" />
          {/* Accessible description of the visible machine */}
          <span className="sr-only">{current.alt}</span>
        </div>
      </div>
    </section>
  );
}
