'use client';

import { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { RESTAURANT } from '@/lib/constants';
import { contactSchema, type ContactInput } from '@/lib/validations';

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactInput>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactInput]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitStatus('idle');

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
      result.error.issues.forEach(issue => {
        const field = issue.path[0] as keyof ContactInput;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Unable to send your message. Please try again or call us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: keyof ContactInput) =>
    `w-full px-4 py-3 bg-surface border ${
      errors[field] ? 'border-error' : 'border-border'
    } rounded-sm text-charcoal text-sm focus:outline-none focus:border-brick focus:ring-1 focus:ring-brick/20 transition-colors`;

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-12 lg:pt-32 lg:pb-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-brick text-xs font-semibold uppercase tracking-[0.2em]">
              Contact
            </span>
            <h1 className="font-serif text-charcoal text-4xl sm:text-5xl mt-3 mb-4">
              Get in Touch
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              Have a question, feedback, or special request? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-12 lg:py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-5">
              <div className="space-y-8 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-brick/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-brick" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal mb-1">Address</h3>
                    <p className="text-muted text-sm leading-relaxed">{RESTAURANT.address}</p>
                    <a
                      href={RESTAURANT.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-sm font-medium text-brick hover:text-brick-dark transition-colors"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-brick/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-brick" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal mb-1">Phone</h3>
                    <a href={`tel:${RESTAURANT.phone}`} className="text-muted text-sm hover:text-charcoal transition-colors">
                      {RESTAURANT.phone}
                    </a>
                    <div className="mt-2">
                      <a
                        href={RESTAURANT.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm font-medium text-brick hover:text-brick-dark transition-colors"
                      >
                        WhatsApp Us →
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-brick/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-brick" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal mb-1">Opening Hours</h3>
                    <p className="text-muted text-sm">{RESTAURANT.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-brick/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brick" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal mb-1">Email</h3>
                    <p className="text-muted text-sm italic">
                      {RESTAURANT.email}
                    </p>
                    <p className="text-xs text-muted mt-1">(Placeholder — to be confirmed by owner)</p>
                  </div>
                </div>
              </div>

              {/* Map Embed Placeholder */}
              <div className="aspect-[4/3] bg-ivory-dark rounded-sm overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.8!2d74.85!3d12.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUyJzEyLjAiTiA3NMKwNTEnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Brick House location on Google Maps"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              {submitStatus === 'success' ? (
                <div className="bg-success/5 border border-success/20 rounded-sm p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                  <h2 className="font-serif text-charcoal text-2xl mb-3">Message Sent!</h2>
                  <p className="text-muted leading-relaxed mb-6">{submitMessage}</p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="px-6 py-3 bg-charcoal text-ivory font-medium text-sm rounded-sm hover:bg-charcoal-light transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2 className="font-serif text-charcoal text-2xl mb-8">Send Us a Message</h2>

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-error/5 border border-error/20 rounded-sm flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
                      <p className="text-sm text-error">{submitMessage}</p>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                          Name <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={inputClass('name')}
                          placeholder="Your name"
                        />
                        {errors.name && <p className="mt-1.5 text-xs text-error">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                          Email <span className="text-error">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={inputClass('email')}
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="mt-1.5 text-xs text-error">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contact_phone" className="block text-sm font-medium text-charcoal mb-2">
                          Phone <span className="text-muted text-xs">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="contact_phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={inputClass('phone')}
                          placeholder="+91 XXXXX XXXXX"
                        />
                        {errors.phone && <p className="mt-1.5 text-xs text-error">{errors.phone}</p>}
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-2">
                          Subject <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={inputClass('subject')}
                          placeholder="How can we help?"
                        />
                        {errors.subject && <p className="mt-1.5 text-xs text-error">{errors.subject}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                        Message <span className="text-error">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={inputClass('message')}
                        placeholder="Tell us what's on your mind..."
                      />
                      {errors.message && <p className="mt-1.5 text-xs text-error">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-10 py-3.5 bg-brick text-ivory font-medium tracking-wide rounded-sm hover:bg-brick-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
