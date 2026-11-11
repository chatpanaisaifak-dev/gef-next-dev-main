import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  OpenProductButton,
  ProductModalProvider,
} from '@/components/ProductModal';
import {
  CheckIcon,
  ClockIcon,
  PhoneIcon,
  PinIcon,
  ShieldIcon,
  TruckIcon,
  WrenchIcon,
} from '@/components/Icons';
import { featureProducts, productModalData } from '@/lib/products';
import { SITE } from '@/lib/site';
import HeroShowcase from '@/components/HeroShowcase';
import './hero.css';
import './home.css';

const specValue = (key: keyof typeof productModalData, label: string) =>
  productModalData[key].specs.find((s) => s.label === label)?.value ?? '–';

const compareColumns = ['กำลัง', 'ความจุ', 'ความเร็ว', 'น้ำหนัก'] as const;

export default function HomePage() {
  return (
    <ProductModalProvider>
      <Navbar />

      <main id="main">
        <HeroShowcase />

        {/* ---------------- Products ---------------- */}
        <section id="products" className="section" aria-labelledby="products-title">
          <div className="container">
            <div className="section-head">
              <h2 id="products-title">เครื่องปั่น 4 รุ่น สำหรับงานหน้าบาร์</h2>
              <p>
                ทุกรุ่นใช้มอเตอร์ความเร็วสูงและมีฝาครอบเก็บเสียง
                เลือกตามขนาดร้านและงบประมาณ หรือดูตารางเทียบสเปกด้านล่าง
              </p>
            </div>

            <div className="product-grid">
              {featureProducts.map((p) => (
                <article key={p.id} id={p.id} className="product-card">
                  <div className="product-photo">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 280px"
                    />
                  </div>
                  <div className="product-body">
                    <h3>{p.title}</h3>
                    <p className="product-sub">{p.subtitle}</p>
                    <p className="product-price num">
                      {productModalData[p.key].price}
                    </p>
                    <ul className="tick-list">
                      {p.featureList.map((f) => (
                        <li key={f}>
                          <CheckIcon />
                          <span>{f.trim()}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="card-actions">
                      <OpenProductButton
                        productKey={p.key}
                        className="btn btn-line btn-sm"
                      >
                        ดูสเปกเต็ม
                      </OpenProductButton>
                      <Link href="/contact" className="btn btn-solid btn-sm">
                        สอบถามรุ่นนี้
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Compare ---------------- */}
        <section
          id="compare"
          className="section section-tint"
          aria-labelledby="compare-title"
        >
          <div className="container">
            <div className="section-head">
              <h2 id="compare-title">เทียบสเปกทุกรุ่น</h2>
              <p>ตัวเลขทั้งหมดมาจากข้อมูลจำเพาะของแต่ละรุ่น เลื่อนตารางไปด้านข้างได้บนมือถือ</p>
            </div>

            <div className="table-wrap" tabIndex={0} role="region" aria-label="ตารางเทียบสเปกเครื่องปั่น GEF">
              <table className="compare">
                <caption>เทียบกำลังไฟ ความจุ ความเร็วรอบ น้ำหนัก และราคาของเครื่องปั่น GEF แต่ละรุ่น</caption>
                <thead>
                  <tr>
                    <th scope="col">รุ่น</th>
                    {compareColumns.map((c) => (
                      <th key={c} scope="col">
                        {c}
                      </th>
                    ))}
                    <th scope="col">ราคา</th>
                  </tr>
                </thead>
                <tbody>
                  {featureProducts.map((p) => (
                    <tr key={p.key}>
                      <th scope="row">{p.title}</th>
                      {compareColumns.map((c) => (
                        <td key={c} className="num">
                          {specValue(p.key, c)}
                        </td>
                      ))}
                      <td className="price num">{productModalData[p.key].price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="compare-note">
              ต้องการให้ช่วยเลือกรุ่นที่เหมาะกับร้าน?{' '}
              <a
                href={SITE.line}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}
              >
                ถามทีมงานทาง LINE
              </a>
            </p>
          </div>
        </section>

        {/* ---------------- About ---------------- */}
        <section id="about" className="section" aria-labelledby="about-title">
          <div className="container">
            <div className="about-grid">
              <div className="about-copy">
                <h2 id="about-title">ออกแบบมาให้ทนงานร้านเครื่องดื่ม</h2>
                <p>
                  GEF ผลิตเครื่องปั่นเชิงพาณิชย์สำหรับร้านที่ต้องปั่นต่อเนื่องทั้งวัน
                  ทั้งมอเตอร์ ใบมีด และระบบป้องกันความร้อนถูกออกแบบสำหรับงานหนัก
                  จำหน่ายและให้บริการในประเทศไทยโดย {SITE.company}
                </p>

                <div className="strengths">
                  <div>
                    <h3>วิจัยและพัฒนา</h3>
                    <p>มอเตอร์ไร้แปรงถ่านและฝาครอบเก็บเสียงที่ออกแบบเฉพาะรุ่น</p>
                  </div>
                  <div>
                    <h3>ควบคุมการผลิต</h3>
                    <p>ตรวจสอบคุณภาพก่อนส่งมอบทุกเครื่อง</p>
                  </div>
                  <div>
                    <h3>ตั้งโปรแกรมได้</h3>
                    <p>ปรับความเร็วและเวลาปั่นให้ตรงกับสูตรเฉพาะของร้าน</p>
                  </div>
                  <div>
                    <h3>อะไหล่พร้อมส่ง</h3>
                    <p>ทีมช่างให้คำปรึกษาทางเทคนิคและมีอะไหล่แท้ในสต็อก</p>
                  </div>
                </div>
              </div>

              <figure className="proof">
                <Image
                  src="/media/image/cert.jpg"
                  alt="สรุปผู้ผลิตและใบรับรอง: ประสบการณ์ 16 ปี สิทธิบัตร 32 รายการ ส่งออก 23 ประเทศ พร้อมใบรับรอง CCC LFGB CE LVD GB4806 ISO 9001 EMC RoHS"
                  width={1536}
                  height={894}
                  sizes="(max-width: 900px) 100vw, 640px"
                />
                <figcaption>ข้อมูลและใบรับรองจากผู้ผลิต</figcaption>
              </figure>
            </div>

            <div className="assurance">
              <div className="assurance-item">
                <TruckIcon />
                <div>
                  <h3>จัดส่งฟรีทั่วประเทศ</h3>
                  <p>เมื่อสั่งซื้อตามเงื่อนไขที่กำหนด</p>
                </div>
              </div>
              <div className="assurance-item">
                <ShieldIcon />
                <div>
                  <h3>รับประกัน 1 ปี</h3>
                  <p>รับประกันส่วนของมอเตอร์</p>
                </div>
              </div>
              <div className="assurance-item">
                <WrenchIcon />
                <div>
                  <h3>บริการหลังการขาย</h3>
                  <p>ทีมช่างพร้อมให้คำปรึกษาตลอดอายุการใช้งาน</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Field photos ---------------- */}
        <section className="section section-tint" aria-labelledby="field-title">
          <div className="container">
            <div className="section-head">
              <h2 id="field-title">ใช้งานจริงหลังเคาน์เตอร์</h2>
              <p>ภาพจากร้านลูกค้าที่ใช้เครื่องปั่นของเราในงานประจำวัน</p>
            </div>
            <div className="field-grid">
              <figure>
                <div className="field-photo">
                  <Image
                    src="/media/image/196CCC7C-DE51-40F7-8FE0-A8A8CFC6867A.jpg"
                    alt="พนักงานร้านเทสมูทตี้จากโถปั่น ข้างเครื่องปั่น Huracan สองเครื่องบนเคาน์เตอร์บาร์"
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, 580px"
                    style={{ objectPosition: '70% 50%' }}
                  />
                </div>
                <figcaption>เคาน์เตอร์บาร์ที่ปั่นสมูทตี้ต่อเนื่องทั้งวัน</figcaption>
              </figure>
              <figure>
                <div className="field-photo">
                  <Image
                    src="/media/image/4C62E4EF-858E-4EB6-ACBF-0D9BD97AEB7D.jpg"
                    alt="เครื่องปั่น Huracan สองเครื่องวางบนชั้นสเตนเลสที่เคาน์เตอร์ร้านในห้างสรรพสินค้า"
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, 580px"
                    style={{ objectPosition: '40% 60%' }}
                  />
                </div>
                <figcaption>ติดตั้งคู่บนชั้นสเตนเลสของร้านในศูนย์การค้า</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ---------------- Branches ---------------- */}
        <section id="branches" className="section" aria-labelledby="branches-title">
          <div className="container">
            <div className="section-head">
              <h2 id="branches-title">แวะดูเครื่องจริงได้ที่สาขา</h2>
              <p>ทดลองใช้เครื่องและคุยกับทีมงานได้ที่ชลบุรีและพัทยา</p>
            </div>

            <div className="branch-grid">
              <div className="branch">
                <div className="branch-info">
                  <h3>สาขาชลบุรี (สำนักงานใหญ่)</h3>
                  <ul>
                    <li>
                      <PinIcon />
                      <span>
                        {SITE.company}
                        <br />
                        {SITE.address}
                      </span>
                    </li>
                    <li>
                      <PhoneIcon />
                      <a href={SITE.phoneHref}>{SITE.phone}</a>
                    </li>
                    <li>
                      <ClockIcon />
                      <span>{SITE.hours}</span>
                    </li>
                  </ul>
                </div>
                <iframe
                  title="แผนที่สาขาชลบุรี"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3882.472486818005!2d100.94368217484785!3d13.320858887027574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d4adb40decf41%3A0xedf6b9d2ca47354a!2z4Liu4Li04Lil4Lil4LmM4LiE4Lit4Lif4Lif4LmMIOC4quC4suC4guC4suC4iuC4peC4muC4uOC4o-C4tSAoIOC4o-C5ieC4suC4meC4q-C4reC4oeC5hOC4geC4pSDguIrguKXguJrguLjguKPguLUgKQ!5e0!3m2!1sen!2sth!4v1785304445216!5m2!1sen!2sth"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              <div className="branch">
                <div className="branch-info">
                  <h3>สาขาพัทยา</h3>
                  <ul>
                    <li>
                      <PinIcon />
                      <span>เมืองพัทยา อ.บางละมุง จ.ชลบุรี 20150</span>
                    </li>
                    <li>
                      <PhoneIcon />
                      <a href="tel:0622596950">062-259-6950</a>
                    </li>
                    <li>
                      <ClockIcon />
                      <span>จันทร์ – เสาร์ 08:30 – 18:00 น. (หยุดวันอาทิตย์)</span>
                    </li>
                  </ul>
                </div>
                <iframe
                  title="แผนที่สาขาพัทยา"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.782481372273!2d100.8955107748405!3d12.921697387389106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310295425b1fb4fb%3A0xff858caf711358b1!2z4Lij4LmJ4Liy4LiZ4Lir4Lit4Lih4LmE4LiB4Lil4Lie4Lix4LiX4Lii4LiyIChIaWxsa29mZiBIb21nbGFpIFBhdHRheWEp!5e0!3m2!1sen!2sth!4v1785305918090!5m2!1sen!2sth"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Closing CTA ---------------- */}
        <section className="cta" aria-labelledby="cta-title">
          <div className="container cta-inner">
            <div>
              <h2 id="cta-title">ยังไม่แน่ใจว่ารุ่นไหนเหมาะกับร้าน?</h2>
              <p>บอกเราว่าร้านปั่นวันละกี่แก้วและวางเครื่องตรงไหน ทีมงานจะแนะนำรุ่นให้</p>
            </div>
            <div className="cta-actions">
              <a
                href={SITE.line}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid"
              >
                ปรึกษาทาง LINE
              </a>
              <Link href="/contact" className="btn btn-line">
                ส่งข้อความถึงเรา
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </ProductModalProvider>
  );
}
