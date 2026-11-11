'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { CheckIcon, CloseIcon } from '@/components/Icons';
import { ProductKey, productModalData } from '@/lib/products';
import { SITE } from '@/lib/site';

interface ModalContextValue {
  open: (key: ProductKey) => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useProductModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useProductModal must be used inside ProductModalProvider');
  return ctx;
}

/** Button that opens the spec dialog for one product. */
export function OpenProductButton({
  productKey,
  className,
  children,
}: {
  productKey: ProductKey;
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useProductModal();
  return (
    <button type="button" className={className} onClick={() => open(productKey)}>
      {children}
    </button>
  );
}

export function ProductModalProvider({ children }: { children: React.ReactNode }) {
  const [activeKey, setActiveKey] = useState<ProductKey | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback((key: ProductKey) => setActiveKey(key), []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // Native <dialog> fires `close` for Esc, the close button and backdrop clicks.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setActiveKey(null);
    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, []);

  // Keep the page scroll lock and the dialog state in step with activeKey.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activeKey) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeKey]);

  const value = useMemo(() => ({ open }), [open]);
  const product = activeKey ? productModalData[activeKey] : null;

  return (
    <ModalContext.Provider value={value}>
      {children}
      <dialog
        ref={dialogRef}
        className="modal"
        aria-labelledby="modal-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {product && (
          <div className="modal-scroll">
            <button
              type="button"
              className="modal-close"
              onClick={close}
              aria-label="ปิดหน้าต่างรายละเอียดสินค้า"
            >
              <CloseIcon />
            </button>

            <div className="modal-body">
              <div className="modal-image">
                <Image
                  src={product.image}
                  alt={`ภาพ ${product.title}`}
                  width={1000}
                  height={1200}
                  sizes="(max-width: 720px) 90vw, 420px"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>

              <div className="modal-details">
                <h2 id="modal-title">{product.title}</h2>
                <p className="modal-sub">{product.subtitle}</p>
                {product.description && <p>{product.description}</p>}

                <h3>คุณสมบัติ</h3>
                <ul className="modal-features">
                  {product.features.map((f) => (
                    <li key={f}>
                      <CheckIcon />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <h3>ข้อมูลจำเพาะ</h3>
                <dl className="spec-dl">
                  {product.specs.map((s) => (
                    <div key={s.label} style={{ display: 'contents' }}>
                      <dt>{s.label}</dt>
                      <dd className="num">{s.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="modal-foot">
                  <div className="modal-price num">
                    <small>ราคา</small>
                    {product.price}
                  </div>
                  <a
                    href={SITE.line}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-solid"
                  >
                    สั่งซื้อทาง LINE
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </ModalContext.Provider>
  );
}
