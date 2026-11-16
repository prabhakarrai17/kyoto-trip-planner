const paths = {
  bed: "M3 19V6M3 15h18v4M21 15v-2.5A2.5 2.5 0 0 0 18.5 10H11v5M7 13.8a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.5 8.5l-2 5-5 2 2-5z",
  bowl: "M3 12h18a9 7 0 0 1-18 0zM8 8c0-1.2 1.2-1.2 1.2-2.6M12 8c0-1.2 1.2-1.2 1.2-2.6M16 8c0-1.2 1.2-1.2 1.2-2.6",
  pin: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 11.8a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6z",
  calendar: "M5.5 5h13a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM3.5 10h17M8 3v4M16 3v4",
  user: "M12 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM5 20a7 7 0 0 1 14 0",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowUp: "M12 19V5M6 11l6-6 6 6",
  star: "M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9l-5.3 2.7 1-5.8-4.2-4.1 5.9-.9z",
  walk: "M13 4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM10 21l2-6 3 3v3M9 11l2-3.5 3 1 2 3.5h2M11 7.5L8 13",
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18",
  check: "M5 12.5l4.5 4.5L19 7.5",
  image: "M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18V6A1.5 1.5 0 0 1 5 4.5zM3.5 16l5-5 4 4 3-3 5 5M15.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
} as const;

export type IconName = keyof typeof paths;

export default function Icon({
  name,
  size = 16,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={paths[name]} />
    </svg>
  );
}
