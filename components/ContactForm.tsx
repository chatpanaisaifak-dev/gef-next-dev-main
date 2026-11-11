'use client';

import { useState } from 'react';
import { AlertIcon, CheckIcon, SendIcon } from '@/components/Icons';

type Status = 'idle' | 'loading' | 'success' | 'error';

const EMPTY = { fullName: '', phone: '', email: '', message: '' };

export default function ContactForm() {
  const [formData, setFormData] = useState(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFeedback('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setFeedback(data.message || 'ส่งข้อความเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด');
        setFormData(EMPTY);
      } else {
        setStatus('error');
        setFeedback(data.error || 'ส่งข้อความไม่สำเร็จ กรุณาตรวจสอบข้อมูลแล้วลองอีกครั้ง');
      }
    } catch {
      setStatus('error');
      setFeedback('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาลองอีกครั้ง หรือโทร 061-771-1139');
    }
  };

  const busy = status === 'loading';

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div aria-live="polite">
        {status === 'success' && (
          <p className="form-alert form-alert-ok" role="status">
            <CheckIcon />
            <span>{feedback}</span>
          </p>
        )}
        {status === 'error' && (
          <p className="form-alert form-alert-error" role="alert">
            <AlertIcon />
            <span>{feedback}</span>
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="full-name">
          ชื่อ - นามสกุล <span className="req" aria-hidden="true">*</span>
        </label>
        <input
          id="full-name"
          name="fullName"
          type="text"
          autoComplete="name"
          value={formData.fullName}
          onChange={handleChange}
          required
          disabled={busy}
        />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="phone">
            เบอร์โทร <span className="req" aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={busy}
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">อีเมล (ไม่บังคับ)</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            disabled={busy}
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="message">
          ข้อความ <span className="req" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="เช่น รุ่นที่สนใจ จำนวนเครื่อง หรือจังหวัดที่ต้องจัดส่ง"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={busy}
        />
      </div>

      <button className="btn btn-solid" type="submit" disabled={busy}>
        <SendIcon />
        {busy ? 'กำลังส่ง...' : 'ส่งข้อความ'}
      </button>
    </form>
  );
}
