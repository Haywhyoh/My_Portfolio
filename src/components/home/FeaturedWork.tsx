'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Container from '@/components/site/Container';
import SectionHeading from '@/components/site/SectionHeading';
import Button from '@/components/site/Button';
import { showcaseProjects } from '@/lib/projectsData';

function pad(value: number) {
  return String(value).padStart(2, '0');
}

function hostOf(url?: string) {
  if (!url) return null;
  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return null;
  }
}

export default function FeaturedWork() {
  const projects = showcaseProjects;
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ left: false, right: true });
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const fromKeyboard = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const project = projects[active];
  const host = hostOf(project.liveUrl);
  const total = projects.length;

  function select(index: number) {
    const next = (index + total) % total;
    setActive(next);
  }

  function measureEdges() {
    const el = scrollerRef.current;
    if (!el) return;
    setEdges({
      left: el.scrollLeft > 8,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 8,
    });
  }

  useEffect(() => {
    const scroller = scrollerRef.current;
    const tab = tabRefs.current[active];
    if (scroller && tab) {
      const left = tab.offsetLeft - scroller.clientWidth / 2 + tab.clientWidth / 2;
      scroller.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' });
    }
    if (fromKeyboard.current) {
      tab?.focus();
      fromKeyboard.current = false;
    }
    measureEdges();
  }, [active, reduce]);

  useEffect(() => {
    measureEdges();
    window.addEventListener('resize', measureEdges);
    return () => window.removeEventListener('resize', measureEdges);
  }, []);

  function onTabsKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const key = event.key;
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(key)) return;
    event.preventDefault();
    fromKeyboard.current = true;
    if (key === 'Home') select(0);
    else if (key === 'End') select(total - 1);
    else if (key === 'ArrowRight' || key === 'ArrowDown') select(active + 1);
    else select(active - 1);
  }

  function onTouchStart(event: React.TouchEvent) {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }

  function onTouchEnd(event: React.TouchEvent) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    fromKeyboard.current = false;
    select(dx < 0 ? active + 1 : active - 1);
  }

  return (
    <section
      id="work"
      className="tw-relative tw-scroll-mt-24 tw-overflow-hidden tw-border-t tw-border-white/10 tw-bg-ink-950 tw-py-20 sm:tw-py-28"
    >
      <div
        aria-hidden
        className="tw-pointer-events-none tw-absolute tw-left-1/2 tw-top-40 tw-h-[420px] tw-w-[min(920px,90vw)] -tw-translate-x-1/2 tw-rounded-full tw-bg-white/[0.045] tw-blur-3xl"
      />

      <Container className="tw-relative">
        <div className="tw-flex tw-flex-col tw-items-start tw-justify-between tw-gap-6 sm:tw-flex-row sm:tw-items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Products I've shipped end to end."
            description="AI products, marketplaces, care practices, and industrial sites, taken from the data model to a live URL."
          />
          <Button href="/work" variant="secondary">
            All projects <ArrowUpRight className="tw-h-4 tw-w-4" />
          </Button>
        </div>

        <div className="tw-mt-12 sm:tw-mt-14">
          <div className="tw-mb-3 tw-flex tw-items-center tw-justify-between tw-gap-4 tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.18em] tw-text-mist-400">
            <span>
              {pad(active + 1)}
              <span className="tw-text-white/25"> / {pad(total)}</span>
            </span>
            {host && project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tw-inline-flex tw-min-w-0 tw-items-center tw-gap-2 tw-normal-case tw-tracking-normal tw-text-mist-200 tw-transition-colors hover:tw-text-white"
              >
                <span className="tw-h-1.5 tw-w-1.5 tw-flex-shrink-0 tw-rounded-full tw-bg-white" />
                <span className="tw-truncate">{host}</span>
              </a>
            ) : (
              <span />
            )}
            <span className="tw-flex-shrink-0">{project.year}</span>
          </div>

          <div
            className="tw-relative tw-touch-pan-y tw-overflow-hidden tw-rounded-[1.35rem] tw-bg-black tw-shadow-card tw-ring-1 tw-ring-inset tw-ring-white/10"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="tw-relative tw-aspect-[3142/1804] tw-w-full">
              {projects.map((item, index) => (
                <div
                  key={item.slug}
                  className={`tw-absolute tw-inset-0 tw-transition-opacity tw-duration-500 tw-ease-out ${
                    index === active ? 'tw-opacity-100' : 'tw-pointer-events-none tw-opacity-0'
                  }`}
                  aria-hidden={index !== active}
                >
                  <Image
                    src={item.image}
                    alt={index === active ? `${item.name} on a MacBook` : ''}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1280px) 1200px, 100vw"
                    draggable={false}
                    className="tw-pointer-events-none tw-select-none tw-object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="tw-relative tw-mt-5 sm:tw-mt-6">
            <div
              ref={scrollerRef}
              role="tablist"
              aria-label="Selected projects"
              onKeyDown={onTabsKeyDown}
              onScroll={measureEdges}
              className="tw-no-scrollbar tw-flex tw-snap-x tw-snap-mandatory tw-gap-2.5 tw-overflow-x-auto tw-py-1 max-lg:-tw-mx-5 max-lg:tw-px-5 sm:tw-gap-3 sm:max-lg:-tw-mx-8 sm:max-lg:tw-px-8 lg:tw-gap-2.5"
            >
              {projects.map((item, index) => {
                const selected = index === active;
                return (
                  <button
                    key={item.slug}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`work-tab-${item.slug}`}
                    title={item.name}
                    aria-selected={selected}
                    aria-controls="work-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(index)}
                    className={`tw-group tw-snap-start tw-shrink-0 tw-w-[8.25rem] tw-rounded-2xl tw-p-1.5 tw-text-left tw-transition-all tw-duration-300 focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-white/50 sm:tw-w-[9.25rem] lg:tw-w-auto lg:tw-min-w-0 lg:tw-flex-1 ${
                      selected
                        ? 'tw-bg-white/[0.08] tw-ring-1 tw-ring-white'
                        : 'tw-bg-white/[0.03] tw-ring-1 tw-ring-white/10 hover:tw-bg-white/[0.06] hover:tw-ring-white/30'
                    }`}
                  >
                    <span className="tw-relative tw-block tw-aspect-[16/10] tw-overflow-hidden tw-rounded-xl tw-bg-black">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="148px"
                        draggable={false}
                        className={`tw-pointer-events-none tw-object-cover tw-object-[center_36%] tw-transition-transform tw-duration-500 ${
                          selected ? 'tw-scale-100' : 'tw-scale-[1.04] group-hover:tw-scale-100'
                        }`}
                      />
                      <span
                        className={`tw-absolute tw-left-1.5 tw-top-1.5 tw-rounded-md tw-px-1.5 tw-py-0.5 tw-font-mono tw-text-[9px] tw-leading-none tw-tracking-[0.14em] ${
                          selected ? 'tw-bg-white tw-text-ink-950' : 'tw-bg-black/75 tw-text-white/80'
                        }`}
                      >
                        {pad(index + 1)}
                      </span>
                    </span>
                    <span
                      className={`tw-mt-1.5 tw-block tw-truncate tw-px-1 tw-pb-0.5 tw-text-[11px] tw-font-medium sm:tw-text-xs ${
                        selected ? 'tw-text-white' : 'tw-text-mist-300 group-hover:tw-text-white'
                      }`}
                    >
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
            <div
              aria-hidden
              className={`tw-pointer-events-none tw-absolute tw-inset-y-0 tw-left-0 tw-w-8 tw-bg-gradient-to-r tw-from-ink-950 tw-to-transparent tw-transition-opacity ${
                edges.left ? 'tw-opacity-100' : 'tw-opacity-0'
              }`}
            />
            <div
              aria-hidden
              className={`tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-w-10 tw-bg-gradient-to-l tw-from-ink-950 tw-to-transparent tw-transition-opacity ${
                edges.right ? 'tw-opacity-100' : 'tw-opacity-0'
              }`}
            />
          </div>

          <div
            id="work-panel"
            role="tabpanel"
            aria-labelledby={`work-tab-${project.slug}`}
            className="tw-mt-6 sm:tw-mt-8"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.slug}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="tw-grid tw-grid-cols-1 tw-gap-6 lg:tw-grid-cols-[auto_minmax(0,1fr)_auto] lg:tw-items-end lg:tw-gap-10"
              >
                <p className="tw-font-mono tw-text-5xl tw-font-medium tw-leading-none tw-tracking-tighter tw-text-white/20 sm:tw-text-6xl">
                  {pad(active + 1)}
                </p>

                <div className="tw-min-w-0">
                  <h3 className="tw-text-2xl tw-font-semibold tw-tracking-tight tw-text-white sm:tw-text-3xl">
                    {project.name}
                  </h3>
                  <p className="tw-mt-2 tw-max-w-2xl tw-text-sm tw-leading-relaxed tw-text-mist-300 sm:tw-min-h-[3.25rem] sm:tw-text-base">
                    {project.tagline}
                  </p>
                  <p className="tw-mt-3 tw-text-sm tw-text-mist-400">{project.role}</p>
                  <div className="tw-mt-4 tw-flex tw-flex-wrap tw-gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="tw-rounded-full tw-bg-white/5 tw-px-2.5 tw-py-1 tw-text-xs tw-font-medium tw-text-mist-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-x-5 tw-gap-y-3 lg:tw-flex-col lg:tw-items-end">
                  <Link
                    href={`/work/${project.slug}`}
                    className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-sm tw-font-medium tw-text-white tw-transition-colors hover:tw-text-mist-100"
                  >
                    Case study <ArrowUpRight className="tw-h-4 tw-w-4" />
                  </Link>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-sm tw-font-medium tw-text-mist-300 tw-transition-colors hover:tw-text-white"
                    >
                      Live site <ArrowUpRight className="tw-h-4 tw-w-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
