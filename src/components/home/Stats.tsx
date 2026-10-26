'use client';

import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import Container from '@/components/site/Container';
import { stats } from '@/lib/resumeData';

function parseStatValue(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { end: 0, suffix: value };
  }

  return { end: Number(match[1]), suffix: match[2] };
}

export default function Stats() {
  return (
    <section aria-label="Impact" className="tw-border-t tw-border-white/10 tw-bg-ink-900/40">
      <Container>
        <motion.dl
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="tw-m-0 tw-grid tw-grid-cols-2 lg:tw-grid-cols-4"
        >
          {stats.map((stat, index) => {
            const { end, suffix } = parseStatValue(stat.value);
            const isRightColumn = index % 2 === 1;

            return (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                }}
                className={[
                  'tw-py-8 sm:tw-py-12',
                  isRightColumn
                    ? 'tw-border-l tw-border-white/10 tw-pl-5 sm:tw-pl-8'
                    : 'tw-pr-5 sm:tw-pr-8',
                  index >= 2 ? 'tw-border-t tw-border-white/10' : '',
                  index > 0 ? 'lg:tw-border-l lg:tw-border-t-0 lg:tw-pl-8' : 'lg:tw-pl-0',
                  index < stats.length - 1 ? 'lg:tw-pr-8' : 'lg:tw-pr-0',
                ].join(' ')}
              >
                <dt
                  aria-label={stat.value}
                  className="tw-m-0 tw-font-display tw-text-3xl tw-font-semibold tw-tabular-nums tw-tracking-tight tw-text-white sm:tw-text-4xl"
                >
                  <CountUp
                    end={end}
                    suffix={suffix}
                    duration={1.6}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </dt>
                <dd className="tw-m-0 tw-mt-2 tw-text-sm tw-text-mist-400">
                  {stat.label}
                </dd>
              </motion.div>
            );
          })}
        </motion.dl>
      </Container>
    </section>
  );
}
