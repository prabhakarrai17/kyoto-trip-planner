import styles from "./ThinkingDots.module.css";

export default function ThinkingDots({ label }: { label: string }) {
  return (
    <span className={styles.dots} role="status">
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className="visually-hidden">{label}</span>
    </span>
  );
}
