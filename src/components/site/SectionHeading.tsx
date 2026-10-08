interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'tw-text-center tw-mx-auto' : 'tw-text-left';
  return (
    <div className={`tw-max-w-2xl ${alignment} ${className}`}>
      {eyebrow && (
        <p className="tw-mb-3 tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.2em] tw-text-accent-400">
          {eyebrow}
        </p>
      )}
      <h2 className="tw-text-balance tw-text-3xl tw-font-semibold tw-tracking-tight tw-text-white sm:tw-text-4xl">
        {title}
      </h2>
      {description && (
        <p className="tw-mt-4 tw-text-base tw-leading-relaxed tw-text-mist-300 sm:tw-text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
