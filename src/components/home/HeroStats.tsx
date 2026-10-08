'use client';

import CountUp from 'react-countup';
import { motion, type Variants } from 'framer-motion';
import { stats } from '@/lib/resumeData';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.32, ease: 'easeOut' },
  },
};

function parseStatValue(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { end: 0, suffix: value };
  }

  return { end: Number(match[1]), suffix: match[2] };
}

export default function HeroStats() {
  return (
    <motion.dl
      initial="hidden"
      animate="show"
      variants={fadeUp}
      className="tw-mt-14 tw-grid tw-grid-cols-2 tw-gap-6 sm:tw-grid-cols-4"
    >
      {stats.map((stat, index) => {
        const { end, suffix } = parseStatValue(stat.value);

        return (
          <div key={stat.label}>
            <dt
              aria-label={stat.value}
              className="tw-font-display tw-text-2xl tw-font-semibold tw-tabular-nums tw-text-white sm:tw-text-3xl"
            >
              <CountUp end={end} suffix={suffix} duration={1.6} delay={0.35 + index * 0.12} />
            </dt>
            <dd className="tw-mt-1 tw-text-xs tw-text-mist-400 sm:tw-text-sm">{stat.label}</dd>
          </div>
        );
      })}
    </motion.dl>
  );
}
