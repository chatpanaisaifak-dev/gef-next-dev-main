import { NextResponse } from 'next/server';

export interface ContactRequestBody {
  fullName: string;
  phone: string;
  email?: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactRequestBody = await request.json();
    const { fullName, phone, email, message } = body;

    // Validation
    if (!fullName || !fullName.trim()) {
      return NextResponse.json(
        { success: false, error: 'กรุณากรอกชื่อ - นามสกุล' },
        { status: 400 }
      );
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: 'กรุณากรอกเบอร์โทรศัพท์' },
        { status: 400 }
      );
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { success: false, error: 'กรุณากรอกข้อความ' },
        { status: 400 }
      );
    }

    // In a production environment, you can send an email via Resend / Nodemailer / SendGrid
    // or store in a database / notify via LINE Notify / Telegram webhook.
    console.log('[Contact Form Submission Received]', {
      timestamp: new Date().toISOString(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : null,
      message: message.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'ส่งข้อความเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด ขอบคุณครับ',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact Form Error]', error);
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดภายในระบบ กรุณาลองใหม่อีกครั้ง' },
      { status: 500 }
    );
  }
}
