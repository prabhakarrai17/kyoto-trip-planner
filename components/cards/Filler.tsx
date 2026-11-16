import styles from "./Filler.module.css";

// Shows a value from the content pack. When the cell was empty, the value is
// filler text, styled so testers can tell it apart from real content.
export default function Filler({ value, isFiller }: { value: string; isFiller: boolean }) {
  if (!isFiller) return <>{value}</>;
  return (
    <span className={styles.filler} title="Not in the content pack yet">
      {value}
    </span>
  );
}
