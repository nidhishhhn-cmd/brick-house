'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, Clock, Users, User, Phone, Mail, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { RESTAURANT, RESERVATION_TIMES, GUEST_COUNT_OPTIONS } from '@/lib/constants';
import { reservationSchema, type ReservationInput } from '@/lib/validations';
import { formatTime, getTodayString } from '@/lib/utils';

export default function ReservationsPage() {
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinDate(getTodayString());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState<ReservationInput>({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    reservation_date: '',
    reservation_time: '',
    guest_count: 2,
    special_requests: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ReservationInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guest_count' ? parseInt(value, 10) : value,
    }));
    // Clear error on change
    if (errors[name as keyof ReservationInput]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitStatus('idle');

    // Validate
    const result = reservationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ReservationInput, string>> = {};
      result.error.issues.forEach(issue => {
        const field = issue.path[0] as keyof ReservationInput;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Validate date is not in the past
    const today = getTodayString();
    if (formData.reservation_date < today) {
      setErrors({ reservation_date: 'Please select a future date' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setSubmitMessage('Your reservation request has been submitted! We will confirm your booking shortly.');
        setFormData({
          customer_name: '',
          customer_phone: '',
          customer_email: '',
          reservation_date: '',
          reservation_time: '',
          guest_count: 2,
          special_requests: '',
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'Something went wrong. Please try again or call us directly.');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Unable to submit your reservation. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: keyof ReservationInput) =>
    `w-full px-4 py-3 bg-surface border ${
      errors[field] ? 'border-error' : 'border-border'
    } rounded-sm text-charcoal text-sm focus:outline-none focus:border-brick focus:ring-1 focus:ring-brick/20 transition-colors`;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-brick-light text-xs font-semibold uppercase tracking-[0.2em]">
              Reservations
            </span>
            <h1 className="font-serif text-ivory text-4xl sm:text-5xl mt-3 mb-4">
              Book Your Table
            </h1>
            <p className="text-ivory/70 text-lg leading-relaxed">
              Secure your spot at Brick House. Fill out the form below and we&apos;ll
              confirm your reservation as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 lg:py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              {submitStatus === 'success' ? (
                <div className="bg-success/5 border border-success/20 rounded-sm p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                  <h2 className="font-serif text-charcoal text-2xl mb-3">
                    Request Received!
                  </h2>
                  <p className="text-muted leading-relaxed mb-6">{submitMessage}</p>
                  <p className="text-sm text-muted">
                    <strong>Important:</strong> Your reservation is pending until confirmed
                    by our team. You will receive confirmation shortly.
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-6 px-6 py-3 bg-charcoal text-ivory font-medium text-sm rounded-sm hover:bg-charcoal-light transition-colors"
                  >
                    Make Another Reservation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2 className="font-serif text-charcoal text-2xl mb-8">
                    Reservation Details
                  </h2>

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-error/5 border border-error/20 rounded-sm flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
                      <p className="text-sm text-error">{submitMessage}</p>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="customer_name" className="block text-sm font-medium text-charcoal mb-2">
                          <User className="w-4 h-4 inline mr-1.5 text-muted" />
                          Full Name <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          id="customer_name"
                          name="customer_name"
                          value={formData.customer_name}
                          onChange={handleChange}
                          className={inputClass('customer_name')}
                          placeholder="Your full name"
                        />
                        {errors.customer_name && (
                          <p className="mt-1.5 text-xs text-error">{errors.customer_name}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="customer_phone" className="block text-sm font-medium text-charcoal mb-2">
                          <Phone className="w-4 h-4 inline mr-1.5 text-muted" />
                          Phone Number <span className="text-error">*</span>
                        </label>
                        <input
                          type="tel"
                          id="customer_phone"
                          name="customer_phone"
                          value={formData.customer_phone}
                          onChange={handleChange}
                          className={inputClass('customer_phone')}
                          placeholder="+91 XXXXX XXXXX"
                        />
                        {errors.customer_phone && (
                          <p className="mt-1.5 text-xs text-error">{errors.customer_phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="customer_email" className="block text-sm font-medium text-charcoal mb-2">
                        <Mail className="w-4 h-4 inline mr-1.5 text-muted" />
                        Email <span className="text-muted text-xs">(optional)</span>
                      </label>
                      <input
                        type="email"
                        id="customer_email"
                        name="customer_email"
                        value={formData.customer_email}
                        onChange={handleChange}
                        className={inputClass('customer_email')}
                        placeholder="your@email.com"
                      />
                      {errors.customer_email && (
                        <p className="mt-1.5 text-xs text-error">{errors.customer_email}</p>
                      )}
                    </div>

                    {/* Date, Time, Guests */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="reservation_date" className="block text-sm font-medium text-charcoal mb-2">
                          <Calendar className="w-4 h-4 inline mr-1.5 text-muted" />
                          Date <span className="text-error">*</span>
                        </label>
                        <input
                          type="date"
                          id="reservation_date"
                          name="reservation_date"
                          value={formData.reservation_date}
                          onChange={handleChange}
                          min={minDate || undefined}
                          className={inputClass('reservation_date')}
                        />
                        {errors.reservation_date && (
                          <p className="mt-1.5 text-xs text-error">{errors.reservation_date}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="reservation_time" className="block text-sm font-medium text-charcoal mb-2">
                          <Clock className="w-4 h-4 inline mr-1.5 text-muted" />
                          Time <span className="text-error">*</span>
                        </label>
                        <select
                          id="reservation_time"
                          name="reservation_time"
                          value={formData.reservation_time}
                          onChange={handleChange}
                          className={inputClass('reservation_time')}
                        >
                          <option value="">Select time</option>
                          {RESERVATION_TIMES.map((time) => (
                            <option key={time} value={time}>
                              {formatTime(time)}
                            </option>
                          ))}
                        </select>
                        {errors.reservation_time && (
                          <p className="mt-1.5 text-xs text-error">{errors.reservation_time}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="guest_count" className="block text-sm font-medium text-charcoal mb-2">
                          <Users className="w-4 h-4 inline mr-1.5 text-muted" />
                          Guests <span className="text-error">*</span>
                        </label>
                        <select
                          id="guest_count"
                          name="guest_count"
                          value={formData.guest_count}
                          onChange={handleChange}
                          className={inputClass('guest_count')}
                        >
                          {GUEST_COUNT_OPTIONS.map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? 'Guest' : 'Guests'}
                            </option>
                          ))}
                        </select>
                        {errors.guest_count && (
                          <p className="mt-1.5 text-xs text-error">{errors.guest_count}</p>
                        )}
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <label htmlFor="special_requests" className="block text-sm font-medium text-charcoal mb-2">
                        <MessageSquare className="w-4 h-4 inline mr-1.5 text-muted" />
                        Special Requests <span className="text-muted text-xs">(optional)</span>
                      </label>
                      <textarea
                        id="special_requests"
                        name="special_requests"
                        value={formData.special_requests}
                        onChange={handleChange}
                        rows={3}
                        className={inputClass('special_requests')}
                        placeholder="Any dietary requirements, celebrations, seating preferences..."
                      />
                      {errors.special_requests && (
                        <p className="mt-1.5 text-xs text-error">{errors.special_requests}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-10 py-3.5 bg-brick text-ivory font-medium tracking-wide rounded-sm hover:bg-brick-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Request Reservation'
                      )}
                    </button>

                    <p className="text-xs text-muted">
                      Your reservation is not confirmed until you receive a confirmation
                      from our team. For parties larger than 12, please call us directly.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-5">
              <div className="bg-cream rounded-sm p-8 lg:sticky lg:top-28">
                <h3 className="font-serif text-charcoal text-xl mb-6">
                  Reservation Guidelines
                </h3>
                <ul className="space-y-4 text-sm text-muted">
                  <li className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-brick mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-charcoal">Operating Hours</strong>
                      <p className="mt-1">{RESTAURANT.hours}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-brick mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-charcoal">Group Size</strong>
                      <p className="mt-1">Online reservations for up to 12 guests. For larger groups, please call us.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-brick mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-charcoal">Advance Booking</strong>
                      <p className="mt-1">We recommend booking at least 2 hours in advance, especially for weekends.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-brick mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-charcoal">Prefer to Call?</strong>
                      <p className="mt-1">
                        Reach us at{' '}
                        <a href={`tel:${RESTAURANT.phone}`} className="text-brick hover:text-brick-dark">
                          {RESTAURANT.phone}
                        </a>
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="text-sm font-semibold text-charcoal mb-2">Cancellation</h4>
                  <p className="text-xs text-muted leading-relaxed">
                    Please let us know as early as possible if you need to cancel or
                    modify your reservation. You can call us or manage it through
                    the booking confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
