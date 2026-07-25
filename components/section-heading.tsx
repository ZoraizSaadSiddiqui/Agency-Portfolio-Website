type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  heading,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-medium uppercase tracking-wider text-indigo-300">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {heading}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
