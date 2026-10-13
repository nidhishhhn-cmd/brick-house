import { NextResponse } from 'next/server';
import { reservationSchema } from '@/lib/validations';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = reservationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error.issues[0]?.message || 'Invalid reservation data',
        },
        { status: 400 }
      );
    }

    const reservationData = result.data;

    // Check if Supabase environment variables are configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('reservations')
        .insert([
          {
            customer_name: reservationData.customer_name,
            customer_phone: reservationData.customer_phone,
            customer_email: reservationData.customer_email || null,
            reservation_date: reservationData.reservation_date,
            reservation_time: reservationData.reservation_time,
            guest_count: reservationData.guest_count,
            special_requests: reservationData.special_requests || null,
            status: 'pending',
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Supabase reservation insert error:', error);
        return NextResponse.json(
          {
            success: false,
            error: 'Failed to save reservation. Please try again or call us directly.',
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        data,
        message: 'Reservation request submitted successfully',
      });
    }

    // Demo / offline fallback when Supabase is not yet configured
    console.log('[Demo Mode] Reservation received:', reservationData);
    return NextResponse.json({
      success: true,
      data: {
        id: 'demo-' + Date.now(),
        ...reservationData,
        status: 'pending',
        created_at: new Date().toISOString(),
      },
      message: 'Reservation request submitted successfully (demo mode)',
    });
  } catch (error) {
    console.error('Reservation API error:', error);
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
    message: 'Reservations API endpoint is operational',
  });
}
