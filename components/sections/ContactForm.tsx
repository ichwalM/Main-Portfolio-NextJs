'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { sendContactMessage } from '@/lib/api/contact';
import { ContactValidationError } from '@/types/contact';
import type { ContactPayload } from '@/types/contact';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FieldError {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// ─── Client-side validation (first line of defence) ───────────────────────────
function validate(data: ContactPayload): FieldError {
  const errors: FieldError = {};
  if (!data.name.trim()) errors.name = 'Name is required.';
  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!data.message.trim()) errors.message = 'Message is required.';
  return errors;
}

// ─── Reusable input/textarea field ────────────────────────────────────────────
interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

function InputField({
  id, label, type = 'text', value, onChange, error, required, placeholder, rows,
}: InputFieldProps) {
  const base =
    'w-full bg-background border text-foreground text-sm px-4 py-3 font-mono placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors duration-200 resize-none';
  const border = error ? 'border-red-500/60' : 'border-border hover:border-muted-foreground/40';

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-[10px] font-mono text-muted-foreground uppercase tracking-[0.15em]">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>

      {rows ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${base} ${border}`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${base} ${border}`}
        />
      )}

      {error && (
        <p className="text-[10px] text-red-400 font-mono flex items-center gap-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Main form component ───────────────────────────────────────────────────────
export default function ContactForm() {
  const [form, setForm] = useState<ContactPayload>({
    name: '', email: '', subject: '', message: '',
  });
  const [fieldErrors, setFieldErrors] = useState<FieldError>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMsg, setServerMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const set = (field: keyof ContactPayload) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear the error for this field as the user types
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Client-side validation
    const clientErrors = validate(form);
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }

    setStatus('loading');
    setFieldErrors({});
    setServerMsg('');

    try {
      const res = await sendContactMessage(form);
      if (res.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        // Backend returned 200 but success: false (edge-case)
        setStatus('error');
        setServerMsg(res.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      // 2. 422 — backend field-level validation errors
      if (err instanceof ContactValidationError) {
        const backendErrors: FieldError = {};
        if (err.errors.name?.[0])    backendErrors.name    = err.errors.name[0];
        if (err.errors.email?.[0])   backendErrors.email   = err.errors.email[0];
        if (err.errors.subject?.[0]) backendErrors.subject = err.errors.subject[0];
        if (err.errors.message?.[0]) backendErrors.message = err.errors.message[0];
        setFieldErrors(backendErrors);
        setStatus('idle'); // show errors on fields, not banner
        return;
      }

      // 3. Auth error / server error
      setStatus('error');
      setServerMsg(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">

      {/* ── Success banner ── */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 p-4 border border-primary/30 bg-primary/5"
          >
            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-foreground">Message sent!</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Thanks for reaching out. I&apos;ll get back to you as soon as possible.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Server / auth error banner ── */}
      <AnimatePresence>
        {status === 'error' && serverMsg && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 p-4 border border-red-500/30 bg-red-500/5"
          >
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-foreground">Failed to send</p>
              <p className="text-xs text-muted-foreground mt-0.5">{serverMsg}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Name + Email ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <InputField
          id="contact-name"
          label="Name"
          required
          placeholder="Your name"
          value={form.name}
          onChange={set('name')}
          error={fieldErrors.name}
        />
        <InputField
          id="contact-email"
          label="Email"
          type="email"
          required
          placeholder="you@example.com"
          value={form.email}
          onChange={set('email')}
          error={fieldErrors.email}
        />
      </div>

      {/* ── Subject (optional) ── */}
      <InputField
        id="contact-subject"
        label="Subject"
        placeholder="What's this about?"
        value={form.subject}
        onChange={set('subject')}
        error={fieldErrors.subject}
      />

      {/* ── Message ── */}
      <InputField
        id="contact-message"
        label="Message"
        required
        placeholder="Tell me about your project, idea, or question..."
        value={form.message}
        onChange={set('message')}
        error={fieldErrors.message}
        rows={6}
      />

      {/* ── Submit button ── */}
      <motion.button
        type="submit"
        disabled={status === 'loading'}
        whileTap={{ scale: 0.98 }}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="w-4 h-4" />
          </>
        )}
      </motion.button>
    </form>
  );
}
