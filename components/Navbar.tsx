'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, CloseIcon, MenuIcon } from '@/components/Icons';
import { featureProducts } from '@/lib/products';
import { SITE } from '@/lib/site';

interface NavbarProps {
  isContactPage?: boolean;
}

export default function Navbar({ isContactPage = false }: NavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const drawerId = useId();
  const menuId = useId();

  // Close the products menu on outside click or Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const closeAll = () => {
    setDrawerOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand" onClick={closeAll} aria-label="GEF Thailand หน้าแรก">
          <span className="brand-mark">GEF</span>
          <span className="brand-sub">เครื่องปั่นเชิงพาณิชย์</span>
        </Link>

        <nav className="nav-links" aria-label="เมนูหลัก">
          <Link
            href="/"
            className="nav-link"
            aria-current={!isContactPage ? 'page' : undefined}
          >
            หน้าแรก
          </Link>

          <div className="nav-dropdown" ref={menuRef}>
            <button
              type="button"
              className="nav-link"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setMenuOpen((v) => !v)}
            >
              สินค้า <ChevronDownIcon />
            </button>
            {menuOpen && (
              <div id={menuId} className="nav-dropdown-panel">
                {featureProducts.map((p) => (
                  <Link key={p.id} href={`/#${p.id}`} onClick={closeAll}>
                    {p.title}
                  </Link>
                ))}
                <Link href="/#compare" onClick={closeAll}>
                  เทียบสเปกทุกรุ่น
                </Link>
              </div>
            )}
          </div>

          <Link href="/#branches" className="nav-link">
            สาขา
          </Link>
          <Link
            href="/contact"
            className="nav-link"
            aria-current={isContactPage ? 'page' : undefined}
          >
            ติดต่อเรา
          </Link>
        </nav>

        <a
          href={SITE.line}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-solid btn-sm nav-cta"
        >
          ปรึกษาผู้เชี่ยวชาญทาง LINE
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-label={drawerOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
          aria-expanded={drawerOpen}
          aria-controls={drawerId}
          onClick={() => setDrawerOpen((v) => !v)}
        >
          {drawerOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {drawerOpen && (
        <nav id={drawerId} className="nav-drawer" aria-label="เมนูมือถือ">
          <Link href="/" onClick={closeAll}>
            หน้าแรก
          </Link>
          <Link href="/#products" onClick={closeAll}>
            สินค้า
          </Link>
          <Link href="/#compare" onClick={closeAll}>
            เทียบสเปกทุกรุ่น
          </Link>
          <Link href="/#branches" onClick={closeAll}>
            สาขา
          </Link>
          <Link href="/contact" onClick={closeAll}>
            ติดต่อเรา
          </Link>
          <a
            href={SITE.line}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid"
          >
            ปรึกษาผู้เชี่ยวชาญทาง LINE
          </a>
        </nav>
      )}
    </header>
  );
}
