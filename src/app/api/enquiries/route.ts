import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error.issues[0]?.message || 'Invalid form data',
        },
        { status: 400 }
      );
    }

    const contactData = result.data;

    // Check if Supabase environment variables are configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('contact_enquiries')
        .insert([
          {
            name: contactData.name,
            email: contactData.email,
            phone: contactData.phone || null,
            subject: contactData.subject,
            message: contactData.message,
            status: 'new',
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Supabase contact enquiry insert error:', error);
        return NextResponse.json(
          {
            success: false,
            error: 'Failed to send message. Please try again or call us directly.',
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        data,
        message: 'Message sent successfully',
      });
    }

    // Demo / offline fallback when Supabase is not yet configured
    console.log('[Demo Mode] Enquiry received:', contactData);
    return NextResponse.json({
      success: true,
      data: {
        id: 'demo-' + Date.now(),
        ...contactData,
        status: 'new',
        created_at: new Date().toISOString(),
      },
      message: 'Message sent successfully (demo mode)',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Enquiries API endpoint is operational',
  });
}
