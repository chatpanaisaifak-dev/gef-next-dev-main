import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import {
  ChatIcon,
  ClockIcon,
  FacebookIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from '@/components/Icons';
import { SITE } from '@/lib/site';
import './contact.css';

export const metadata: Metadata = {
  title: 'ติดต่อเรา',
  description: `ช่องทางติดต่อ ${SITE.company} โทร ${SITE.phone} LINE ${SITE.lineId} หรือฝากข้อความให้ทีมงานติดต่อกลับ`,
};

const channels = [
  {
    label: 'โทรศัพท์',
    value: SITE.phone,
    href: SITE.phoneHref,
    icon: <PhoneIcon />,
    note: SITE.hours,
  },
  {
    label: 'LINE Official',
    value: SITE.lineId,
    href: SITE.line,
    icon: <ChatIcon />,
    external: true,
    note: 'ตอบเร็วที่สุด ส่งรูปหน้าร้านมาให้ช่วยเลือกรุ่นได้',
  },
  {
    label: 'อีเมล',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: <MailIcon />,
  },
  {
    label: 'Facebook',
    value: 'GEF Thailand',
    href: SITE.facebook,
    icon: <FacebookIcon />,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar isContactPage />

      <main id="main" className="contact-page">
        <div className="container">
          <header className="contact-head">
            <h1>ติดต่อเรา</h1>
            <p>
              โทรหรือทักทาง LINE ได้ทุกวัน หรือฝากข้อความไว้
              ทีมงานจะติดต่อกลับภายในเวลาทำการ
            </p>
          </header>

          <div className="contact-layout">
            <section className="contact-info" aria-labelledby="channels-title">
              <h2 id="channels-title">ช่องทางติดต่อ</h2>
              <ul className="channel-list">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      className="channel"
                      href={c.href}
                      {...(c.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      <span className="channel-icon">{c.icon}</span>
                      <span className="channel-text">
                        <small>{c.label}</small>
                        <strong>{c.value}</strong>
                        {c.note && <em>{c.note}</em>}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="visit">
                <h3>มาที่สำนักงานใหญ่</h3>
                <ul>
                  <li>
                    <PinIcon />
                    <a href={SITE.map} target="_blank" rel="noopener noreferrer">
                      {SITE.company}
                      <br />
                      {SITE.address}
                    </a>
                  </li>
                  <li>
                    <ClockIcon />
                    <span>{SITE.hours}</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="contact-form-panel" aria-labelledby="message-title">
              <h2 id="message-title">ฝากข้อความถึงเรา</h2>
              <p className="form-hint">ช่องที่มี * ต้องกรอก</p>
              <ContactForm />
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
