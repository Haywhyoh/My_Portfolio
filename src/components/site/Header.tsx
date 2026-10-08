'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Container from './Container';
import Button from './Button';
import { siteConfig } from '@/lib/siteConfig';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header
      className={`tw-sticky tw-top-0 tw-z-50 tw-w-full tw-transition-all tw-duration-300 ${
        scrolled
          ? 'tw-border-b tw-border-white/10 tw-bg-ink-950/80 tw-backdrop-blur-xl'
          : 'tw-border-b tw-border-transparent tw-bg-transparent'
      }`}
    >
      <Container className="tw-flex tw-h-16 tw-items-center tw-justify-between sm:tw-h-20">
        <Link
          href="/"
          className="tw-group tw-flex tw-items-center tw-gap-2 tw-font-display tw-text-lg tw-font-semibold tw-text-white"
        >
          <span className="tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-rounded-xl tw-bg-accent-500 tw-font-mono tw-text-sm tw-text-white tw-shadow-glow tw-transition-transform tw-group-hover:-tw-rotate-6">
            AS
          </span>
          <span className="tw-hidden sm:tw-inline">Ayomide Samuel</span>
        </Link>

        <nav className="tw-hidden tw-items-center tw-gap-8 lg:tw-flex">
          {siteConfig.nav.map((item) => {
            const isHashLink = item.href.includes('#');
            const active = !isHashLink && (pathname === item.href || pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`tw-link-underline tw-text-sm tw-font-medium tw-transition-colors ${
                  active ? 'tw-text-white' : 'tw-text-mist-300 hover:tw-text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="tw-hidden lg:tw-block">
          <Button href="/contact" size="md">
            Let&apos;s talk <ArrowUpRight className="tw-h-4 tw-w-4" />
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-white/10 tw-text-white lg:tw-hidden"
        >
          {open ? <X className="tw-h-5 tw-w-5" /> : <Menu className="tw-h-5 tw-w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="tw-overflow-hidden tw-border-b tw-border-white/10 tw-bg-ink-950 lg:tw-hidden"
          >
            <Container className="tw-flex tw-flex-col tw-gap-1 tw-py-6">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="tw-rounded-xl tw-px-3 tw-py-3 tw-text-base tw-font-medium tw-text-mist-200 tw-transition-colors hover:tw-bg-white/5 hover:tw-text-white"
                >
                  {item.label}
                </Link>
              ))}
              <Button href="/contact" className="tw-mt-3 tw-w-full">
                Let&apos;s talk <ArrowUpRight className="tw-h-4 tw-w-4" />
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
