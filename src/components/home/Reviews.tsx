'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Star } from 'lucide-react';
import Container from '@/components/site/Container';
import SectionHeading from '@/components/site/SectionHeading';
import Button from '@/components/site/Button';
import { UpworkIcon } from '@/components/site/BrandIcons';
import {
  clientReviews,
  earlierReviews,
  reviewFilters,
  upworkEndorsements,
  upworkProfile,
  type ClientReview,
  type ReviewFilter,
} from '@/lib/reviews';

const proofStats = [
  { value: upworkProfile.rating.toFixed(1), label: `From ${upworkProfile.reviewCount} Upwork reviews` },
  { value: upworkProfile.jobSuccess, label: 'Job success score' },
  { value: String(upworkProfile.hoursBilled), label: 'Hours billed' },
  { value: String(upworkProfile.inProgress), label: 'Contracts in progress' },
];

function Stars({ rating }: { rating: number }) {
  return (
    <span className="tw-inline-flex tw-items-center tw-gap-0.5" aria-label={`${rating.toFixed(1)} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.min(Math.max(rating - index, 0), 1);
        return (
          <span key={index} className="tw-relative tw-block tw-h-3.5 tw-w-3.5" aria-hidden>
            <Star className="tw-h-3.5 tw-w-3.5 tw-text-white/20" strokeWidth={1.75} />
            <span className="tw-absolute tw-inset-y-0 tw-left-0 tw-overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="tw-h-3.5 tw-w-3.5 tw-fill-white tw-text-white" strokeWidth={1.75} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function PersonMark({ review }: { review: ClientReview }) {
  if (review.avatar) {
    return (
      <span className="tw-relative tw-block tw-h-11 tw-w-11 tw-flex-shrink-0 tw-overflow-hidden tw-rounded-full tw-bg-ink-800 tw-ring-1 tw-ring-white/15">
        <Image src={review.avatar} alt="" fill sizes="44px" className="tw-object-cover" />
      </span>
    );
  }

  return (
    <span className="tw-flex tw-h-11 tw-w-11 tw-flex-shrink-0 tw-items-center tw-justify-center tw-rounded-full tw-bg-[#14a800]/15 tw-text-[#6dce5b] tw-ring-1 tw-ring-[#14a800]/40">
      <UpworkIcon className="tw-h-5 tw-w-5" />
    </span>
  );
}

function ReviewCard({ review, large }: { review: ClientReview; large: boolean }) {
  const upwork = review.source === 'upwork';

  return (
    <article
      className={`tw-flex tw-h-full tw-flex-col tw-rounded-3xl tw-border tw-border-white/10 tw-bg-ink-900/70 tw-p-6 tw-shadow-card tw-transition-colors hover:tw-border-white/25 sm:tw-p-7 ${
        large ? 'xl:tw-p-8' : ''
      }`}
      style={
        large
          ? {
              backgroundImage:
                'radial-gradient(420px circle at 0% 0%, rgba(20,168,0,0.14), transparent 58%)',
            }
          : undefined
      }
    >
      <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-3">
        <span
          className={`tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-full tw-px-2.5 tw-py-1 tw-font-mono tw-text-[10px] tw-uppercase tw-tracking-[0.16em] ${
            upwork
              ? 'tw-bg-[#14a800]/15 tw-text-[#7dce6a]'
              : 'tw-bg-white/5 tw-text-mist-300'
          }`}
        >
          {upwork ? <UpworkIcon className="tw-h-3 tw-w-3" /> : null}
          {upwork ? 'Upwork' : 'Direct client'}
        </span>
        <span className="tw-inline-flex tw-items-center tw-gap-2">
          <span className="tw-font-mono tw-text-xs tw-text-white">{review.rating.toFixed(1)}</span>
          <Stars rating={review.rating} />
        </span>
      </div>

      <blockquote
        className={`tw-m-0 tw-mt-5 tw-flex-1 tw-text-pretty tw-font-medium tw-leading-relaxed tw-text-white ${
          large ? 'tw-text-xl sm:tw-text-2xl sm:tw-leading-snug' : 'tw-text-[15px] sm:tw-text-base'
        }`}
      >
        <span aria-hidden className="tw-mr-1 tw-text-white/35">
          “
        </span>
        {review.quote}
        <span aria-hidden className="tw-text-white/35">
          ”
        </span>
      </blockquote>

      {review.tags && review.tags.length > 0 && (
        <ul className="tw-m-0 tw-mt-5 tw-flex tw-list-none tw-flex-wrap tw-gap-2 tw-p-0">
          {review.tags.map((tag) => (
            <li
              key={tag}
              className="tw-rounded-full tw-bg-white/5 tw-px-2.5 tw-py-1 tw-text-xs tw-font-medium tw-text-mist-300"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {review.endorsements && review.endorsements.length > 0 && (
        <ul className="tw-m-0 tw-mt-4 tw-flex tw-list-none tw-flex-wrap tw-gap-1.5 tw-p-0">
          {review.endorsements.map((item) => (
            <li
              key={item}
              className="tw-rounded-full tw-border tw-border-white/10 tw-px-2 tw-py-0.5 tw-text-[11px] tw-text-mist-400"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      <footer className="tw-mt-6 tw-flex tw-items-center tw-gap-3 tw-border-t tw-border-white/10 tw-pt-5">
        <PersonMark review={review} />
        <div className="tw-min-w-0">
          <p className="tw-m-0 tw-line-clamp-2 tw-text-sm tw-font-semibold tw-text-white">{review.name}</p>
          <p className="tw-m-0 tw-mt-0.5 tw-truncate tw-text-xs tw-text-mist-400">{review.detail}</p>
        </div>
      </footer>
    </article>
  );
}

function EarlierLine({
  quote,
  rating,
  contract,
  period,
}: {
  quote: string;
  rating: number;
  contract: string;
  period: string;
}) {
  return (
    <span className="tw-inline-flex tw-items-center tw-gap-4 tw-whitespace-nowrap">
      <span className="tw-font-mono tw-text-xs tw-text-white">{rating.toFixed(1)}</span>
      <span className="tw-text-sm tw-text-mist-200">“{quote}”</span>
      <span className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.14em] tw-text-mist-400">
        {contract} · {period}
      </span>
    </span>
  );
}

export default function Reviews() {
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const reduce = useReducedMotion();
  const faces = clientReviews.filter((review) => review.avatar);

  const visible = useMemo(
    () => (filter === 'all' ? clientReviews : clientReviews.filter((review) => review.source === filter)),
    [filter],
  );

  const marquee = [...earlierReviews, ...earlierReviews];

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="tw-relative tw-scroll-mt-20 tw-overflow-hidden tw-border-t tw-border-white/10 tw-bg-ink-950 tw-py-20 sm:tw-py-28"
    >
      <div
        aria-hidden
        className="tw-pointer-events-none tw-absolute -tw-left-24 tw-top-0 tw-h-[420px] tw-w-[420px] tw-rounded-full tw-blur-3xl"
        style={{ background: 'rgba(20, 168, 0, 0.09)' }}
      />

      <Container className="tw-relative">
        <div className="tw-flex tw-flex-col tw-items-start tw-justify-between tw-gap-8 lg:tw-flex-row lg:tw-items-end">
          <SectionHeading
            titleId="reviews-heading"
            eyebrow="Client proof"
            title="They'd hire me again."
            description="Named clients I shipped with, and public reviews from my Upwork profile. Recent engineering contracts are 5.0. The profile average is 4.9 across 21 reviews."
          />
          <div className="tw-flex tw-flex-col tw-items-start tw-gap-4 lg:tw-items-end">
            <div className="tw-flex tw-items-center tw-gap-3">
              <div className="tw-flex -tw-space-x-2">
                {faces.map((person) => (
                  <span
                    key={person.id}
                    className="tw-relative tw-block tw-h-10 tw-w-10 tw-overflow-hidden tw-rounded-full tw-bg-ink-800 tw-ring-2 tw-ring-ink-950"
                  >
                    <Image src={person.avatar!} alt="" fill sizes="40px" className="tw-object-cover" />
                  </span>
                ))}
              </div>
              <p className="tw-m-0 tw-max-w-[9rem] tw-text-xs tw-leading-snug tw-text-mist-300">
                Naolo, Sam, Tony, and John
              </p>
            </div>
            <span className="tw-inline-flex tw-items-center tw-gap-2 tw-rounded-full tw-border tw-border-[#14a800]/30 tw-bg-[#14a800]/10 tw-px-3 tw-py-1 tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.16em] tw-text-[#7dce6a]">
              <span className="tw-h-1.5 tw-w-1.5 tw-rounded-full tw-bg-[#14a800]" />
              {upworkProfile.badge} · {upworkProfile.jobSuccess} job success
            </span>
            <Button href={upworkProfile.url} external variant="secondary">
              Upwork profile <ArrowUpRight className="tw-h-4 tw-w-4" />
            </Button>
          </div>
        </div>

        <dl className="tw-mt-12 tw-grid tw-grid-cols-2 tw-overflow-hidden tw-rounded-3xl tw-border tw-border-white/10 lg:tw-grid-cols-4">
          {proofStats.map((stat, index) => (
            <div
              key={stat.label}
              className={[
                'tw-px-5 tw-py-6 sm:tw-px-6',
                index % 2 === 1 ? 'tw-border-l tw-border-white/10' : '',
                index >= 2 ? 'tw-border-t tw-border-white/10' : '',
                index > 0 ? 'lg:tw-border-l lg:tw-border-t-0' : '',
              ].join(' ')}
            >
              <dt className="tw-m-0 tw-font-display tw-text-3xl tw-font-semibold tw-tabular-nums tw-tracking-tight tw-text-white sm:tw-text-4xl">
                {stat.value}
              </dt>
              <dd className="tw-m-0 tw-mt-2 tw-text-sm tw-text-mist-400">{stat.label}</dd>
            </div>
          ))}
        </dl>

        <div className="tw-mt-8 tw-flex tw-flex-wrap tw-gap-2" role="group" aria-label="Filter reviews">
          {reviewFilters.map((item) => {
            const selected = filter === item.id;
            const count =
              item.id === 'all'
                ? clientReviews.length
                : clientReviews.filter((review) => review.source === item.id).length;

            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(item.id)}
                className={`tw-inline-flex tw-items-center tw-gap-2 tw-rounded-full tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-white/50 ${
                  selected
                    ? 'tw-bg-white tw-text-ink-950'
                    : 'tw-bg-white/5 tw-text-mist-300 tw-ring-1 tw-ring-inset tw-ring-white/10 hover:tw-bg-white/10 hover:tw-text-white'
                }`}
              >
                {item.label}
                <span className={selected ? 'tw-text-ink-500' : 'tw-text-mist-400'}>{count}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className={`tw-mt-6 tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2 ${
            filter === 'all' ? 'xl:tw-grid-cols-12' : 'xl:tw-grid-cols-3'
          }`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: reduce ? 0 : 0.28, ease: 'easeOut' }}
                className={filter === 'all' ? review.layout : ''}
              >
                <ReviewCard review={review} large={Boolean(review.featured && filter === 'all')} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="tw-mt-14 tw-border-t tw-border-white/10 tw-pt-8">
          <p className="tw-m-0 tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.2em] tw-text-mist-400">
            Endorsed across completed jobs
          </p>
          <ul className="tw-m-0 tw-mt-4 tw-flex tw-list-none tw-flex-wrap tw-gap-2 tw-p-0">
            {upworkEndorsements.map((item) => (
              <li
                key={item.label}
                className="tw-inline-flex tw-items-center tw-gap-2 tw-rounded-full tw-border tw-border-white/10 tw-bg-white/[0.03] tw-py-1.5 tw-pl-3 tw-pr-1.5"
              >
                <span className="tw-text-sm tw-text-mist-200">{item.label}</span>
                <span className="tw-rounded-full tw-bg-white tw-px-2 tw-py-0.5 tw-font-mono tw-text-[11px] tw-font-medium tw-text-ink-950">
                  {item.count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="tw-mt-14 tw-border-t tw-border-white/10 tw-pt-8">
        <Container>
          <p className="tw-m-0 tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.2em] tw-text-mist-400">
            Earlier Upwork feedback
          </p>
        </Container>

        <ul className="tw-sr-only">
          {earlierReviews.map((item) => (
            <li key={item.id}>
              {item.rating.toFixed(1)} stars. {item.quote} {item.contract}, {item.period}.
            </li>
          ))}
        </ul>

        {reduce ? (
          <Container>
            <ul className="tw-m-0 tw-mt-5 tw-list-none tw-space-y-4 tw-p-0">
              {earlierReviews.map((item) => (
                <li key={item.id} className="tw-text-sm tw-leading-relaxed tw-text-mist-200">
                  <span className="tw-mr-2 tw-font-mono tw-text-xs tw-text-white">{item.rating.toFixed(1)}</span>
                  “{item.quote}”
                  <span className="tw-mt-1 tw-block tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.14em] tw-text-mist-400">
                    {item.contract} · {item.period}
                  </span>
                </li>
              ))}
            </ul>
          </Container>
        ) : (
          <div className="tw-relative tw-mt-6 tw-overflow-hidden">
            <div
              aria-hidden
              className="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-left-0 tw-z-10 tw-w-16 tw-bg-gradient-to-r tw-from-ink-950 tw-to-transparent sm:tw-w-24"
            />
            <div
              aria-hidden
              className="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-z-10 tw-w-16 tw-bg-gradient-to-l tw-from-ink-950 tw-to-transparent sm:tw-w-24"
            />
            <div className="tw-flex tw-w-max tw-animate-marquee tw-items-center tw-gap-12 tw-py-2 hover:tw-[animation-play-state:paused]">
              {marquee.map((item, index) => (
                <span key={`${item.id}-${index}`} className="tw-inline-flex tw-items-center tw-gap-12" aria-hidden>
                  <EarlierLine {...item} />
                  <span className="tw-h-1 tw-w-1 tw-rounded-full tw-bg-white/30" />
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
