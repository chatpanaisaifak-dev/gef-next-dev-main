import Link from 'next/link';
import {
  ChatIcon,
  ClockIcon,
  FacebookIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from '@/components/Icons';
import { featureProducts } from '@/lib/products';
import { SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h2 className="footer-logo">GEF</h2>
          <p>
            เครื่องปั่นเชิงพาณิชย์สำหรับร้านกาแฟ คาเฟ่ และบาร์เครื่องดื่ม
            จำหน่ายและดูแลหลังการขายโดย {SITE.company}
          </p>
          <div className="social">
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook GEF Thailand"
            >
              <FacebookIcon />
            </a>
            <a
              href={SITE.line}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LINE Official GEF Thailand"
            >
              <ChatIcon />
            </a>
          </div>
        </div>

        <div>
          <h3>สินค้า</h3>
          <ul className="footer-list">
            {featureProducts.map((p) => (
              <li key={p.id}>
                <Link href={`/#${p.id}`}>{p.title}</Link>
              </li>
            ))}
            <li>
              <Link href="/#compare">เทียบสเปกทุกรุ่น</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>บริษัท</h3>
          <ul className="footer-list">
            <li>
              <Link href="/#about">เกี่ยวกับเรา</Link>
            </li>
            <li>
              <Link href="/#branches">สาขา</Link>
            </li>
            <li>
              <Link href="/contact">ติดต่อเรา</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>ติดต่อเรา</h3>
          <ul className="footer-contact">
            <li>
              <ClockIcon />
              <span>{SITE.hours}</span>
            </li>
            <li>
              <PhoneIcon />
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </li>
            <li>
              <MailIcon />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <PinIcon />
              <span>
                {SITE.company}
                <br />
                {SITE.address}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          © 2026 GEF Thailand — {SITE.company} สงวนลิขสิทธิ์
        </div>
      </div>
    </footer>
  );
}
