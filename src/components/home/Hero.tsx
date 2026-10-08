'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, Download, Sparkles } from 'lucide-react';
import Container from '@/components/site/Container';
import Button from '@/components/site/Button';
import { siteConfig } from '@/lib/siteConfig';
import { stats } from '@/lib/resumeData';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
};

export default function Hero() {
  return (
    <section className="tw-relative tw-overflow-hidden tw-pb-20 tw-pt-16 sm:tw-pb-28 sm:tw-pt-24">
      <div className="tw-grain tw-pointer-events-none tw-absolute tw-inset-0" />
      <div
        className="tw-pointer-events-none tw-absolute tw-inset-x-0 tw-top-[-10%] tw-h-[600px]"
        style={{
          background:
            'radial-gradient(650px circle at 50% 0%, rgba(109,91,255,0.22), transparent 65%)',
        }}
      />

      <Container className="tw-relative tw-grid tw-grid-cols-1 tw-items-center tw-gap-16 lg:tw-grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
            className="tw-mb-6 tw-inline-flex tw-items-center tw-gap-2 tw-rounded-full tw-border tw-border-white/10 tw-bg-white/5 tw-px-4 tw-py-1.5 tw-text-xs tw-font-medium tw-text-mist-200"
          >
            <span className="tw-relative tw-flex tw-h-2 tw-w-2">
              <span className="tw-absolute tw-inline-flex tw-h-full tw-w-full tw-animate-ping tw-rounded-full tw-bg-glow-500 tw-opacity-75" />
              <span className="tw-relative tw-inline-flex tw-h-2 tw-w-2 tw-rounded-full tw-bg-glow-500" />
            </span>
            {siteConfig.availability}
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
            className="tw-text-balance tw-text-4xl tw-font-semibold tw-leading-[1.1] tw-tracking-tight tw-text-white sm:tw-text-5xl lg:tw-text-6xl"
          >
            Full-stack engineer who ships{' '}
            <span className="tw-bg-gradient-to-r tw-from-accent-300 tw-via-accent-400 tw-to-glow-500 tw-bg-clip-text tw-text-transparent">
              products, not prototypes.
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={2}
            variants={fadeUp}
            className="tw-mt-6 tw-max-w-xl tw-text-base tw-leading-relaxed tw-text-mist-300 sm:tw-text-lg"
          >
            I&apos;m {siteConfig.name.split(' ')[0]} {siteConfig.name.split(' ')[1]} — a {siteConfig.role.toLowerCase()}{' '}
            with 5+ years building SaaS, AI-powered automation, and marketplace platforms end to end: database to deploy.
            Recent work includes an AI WhatsApp assistant live with 1,000+ businesses, and marketplaces serving 20,000+ users.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={3}
            variants={fadeUp}
            className="tw-mt-9 tw-flex tw-flex-wrap tw-items-center tw-gap-4"
          >
            <Button href="/work" size="lg">
              View my work <ArrowUpRight className="tw-h-4 tw-w-4" />
            </Button>
            <Button href={siteConfig.resumeFile} external size="lg" variant="secondary">
              Download résumé <Download className="tw-h-4 tw-w-4" />
            </Button>
          </motion.div>

          <motion.dl
            initial="hidden"
            animate="show"
            custom={4}
            variants={fadeUp}
            className="tw-mt-14 tw-grid tw-grid-cols-2 tw-gap-6 sm:tw-grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="tw-font-display tw-text-2xl tw-font-semibold tw-text-white sm:tw-text-3xl">
                  {stat.value}
                </dt>
                <dd className="tw-mt-1 tw-text-xs tw-text-mist-400 sm:tw-text-sm">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="tw-relative tw-mx-auto tw-w-full tw-max-w-sm lg:tw-max-w-none"
        >
          <div className="tw-rounded-2xl tw-border tw-border-white/10 tw-bg-ink-900/80 tw-shadow-card tw-backdrop-blur">
            <div className="tw-flex tw-items-center tw-gap-2 tw-border-b tw-border-white/10 tw-px-4 tw-py-3">
              <span className="tw-h-2.5 tw-w-2.5 tw-rounded-full tw-bg-red-400/70" />
              <span className="tw-h-2.5 tw-w-2.5 tw-rounded-full tw-bg-yellow-400/70" />
              <span className="tw-h-2.5 tw-w-2.5 tw-rounded-full tw-bg-green-400/70" />
              <span className="tw-ml-2 tw-font-mono tw-text-xs tw-text-mist-400">status.ts</span>
            </div>
            <div className="tw-space-y-2 tw-px-5 tw-py-5 tw-font-mono tw-text-[13px] tw-leading-relaxed">
              <p className="tw-text-mist-400">
                <span className="tw-text-accent-400">const</span> engineer = {'{'}
              </p>
              <p className="tw-pl-4 tw-text-mist-300">
                name: <span className="tw-text-glow-500">&apos;Ayomide Samuel&apos;</span>,
              </p>
              <p className="tw-pl-4 tw-text-mist-300">
                stack: <span className="tw-text-glow-500">[&apos;Next.js&apos;, &apos;NestJS&apos;, &apos;Django&apos;, &apos;Postgres&apos;]</span>,
              </p>
              <p className="tw-pl-4 tw-text-mist-300">
                shipped: <span className="tw-text-accent-300">[&apos;Botglam AI&apos;, &apos;Hillpad&apos;, &apos;GraviitalBeats&apos;]</span>,
              </p>
              <p className="tw-pl-4 tw-text-mist-300">
                status: <span className="tw-text-glow-500">&apos;open_to_work&apos;</span>,
              </p>
              <p className="tw-text-mist-400">{'}'}</p>
              <p className="tw-mt-4 tw-flex tw-items-center tw-gap-2 tw-text-accent-300">
                <Sparkles className="tw-h-3.5 tw-w-3.5" /> deploy(engineer) → production ✓
                <span className="tw-inline-block tw-h-3.5 tw-w-[2px] tw-animate-blink tw-bg-accent-300" />
              </p>
            </div>
          </div>

          <div className="tw-absolute -tw-bottom-6 -tw-left-6 tw-hidden tw-rounded-xl tw-border tw-border-white/10 tw-bg-ink-900 tw-px-4 tw-py-3 tw-shadow-card sm:tw-block">
            <p className="tw-font-mono tw-text-xs tw-text-mist-400">AI messages handled today</p>
            <p className="tw-font-display tw-text-xl tw-font-semibold tw-text-glow-500">94</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
