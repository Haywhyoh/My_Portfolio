'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { ArrowUpRight } from 'lucide-react';
import Button from '@/components/site/Button';
import { siteConfig } from '@/lib/siteConfig';

const fieldClass =
  'tw-w-full tw-rounded-xl tw-border tw-border-white/10 tw-bg-white/5 tw-px-4 tw-py-3 tw-text-sm tw-text-white tw-outline-none tw-transition-colors placeholder:tw-text-mist-400 focus:tw-border-accent-400';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in your name, email, and a short message.');
      return;
    }

    setSending(true);

    const subject = encodeURIComponent(`Hello from ${formData.name}`);
    const body = encodeURIComponent(
      `${formData.message}\n\n— ${formData.name}\n${formData.email}${formData.company ? `\n${formData.company}` : ''}`
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    toast.success('Opening your email client…');
    setSending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="tw-space-y-4">
      <div>
        <label htmlFor="name" className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-mist-200">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Jane Doe"
          value={formData.name}
          onChange={handleChange}
          className={fieldClass}
        />
      </div>
      <div className="tw-grid tw-grid-cols-1 tw-gap-4 sm:tw-grid-cols-2">
        <div>
          <label htmlFor="email" className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-mist-200">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            value={formData.email}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="company" className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-mist-200">
            Company <span className="tw-text-mist-400">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Acme"
            value={formData.company}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-mist-200">
          How can I help?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell me about the role, product, or problem."
          value={formData.message}
          onChange={handleChange}
          className={fieldClass}
        />
      </div>
      <Button type="submit" size="lg" disabled={sending} className="tw-w-full sm:tw-w-auto">
        Send message <ArrowUpRight className="tw-h-4 tw-w-4" />
      </Button>
    </form>
  );
}
