"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Filler from "@/components/cards/Filler";
import Icon, { type IconName } from "@/components/Icon";
import { formatDateRange, formatDay, formatDuration, usd } from "@/lib/format";
import { allExperiences, allFood, allStays, PICKED_ROWS, type ResultsKind } from "@/lib/mockReply";
import type { Intent } from "@/lib/types";
import styles from "./ResultsSheet.module.css";

const HEADINGS: Record<ResultsKind, { title: string; icon: IconName }> = {
  stay: { title: "Stays", icon: "bed" },
  experience: { title: "Experiences", icon: "compass" },
  food: { title: "Food", icon: "bowl" },
};

// Opens over the conversation, so closing it returns to the chat exactly as it was.
export default function ResultsSheet({
  kind,
  intent,
  onClose,
}: {
  kind: ResultsKind;
  intent: Intent;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  const { title, icon } = HEADINGS[kind];
  const titleId = `results-title-${kind}`;

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.sheet} ${styles[kind]}`}
      aria-labelledby={titleId}
      onClick={(e) => {
        // A click on the dimmed backdrop lands on the dialog element itself.
        if (e.target === e.currentTarget) dialogRef.current?.close();
      }}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <button type="button" className={styles.back} onClick={() => dialogRef.current?.close()} autoFocus>
            <Icon name="arrowRight" size={16} className={styles.backIcon} />
            Back to chat
          </button>
          <h2 id={titleId} className={styles.title}>
            <span className={styles.titleIcon}>
              <Icon name={icon} size={18} />
            </span>
            {title} in {intent.place}
          </h2>
          <ul className={styles.filters} aria-label="Filters applied">
            <li>
              <Icon name="pin" size={13} />
              {intent.place}
            </li>
            <li>
              <Icon name="calendar" size={13} />
              {formatDateRange(intent.check_in, intent.check_out)}
            </li>
            <li>
              <Icon name="user" size={13} />
              {intent.guests} guests
            </li>
          </ul>
        </header>

        {kind === "stay" && <StayResults />}
        {kind === "experience" && <ExperienceResults />}
        {kind === "food" && <FoodResults />}
      </div>
    </dialog>
  );
}

function Thumb({ src, alt }: { src: string | null; alt: string | null }) {
  return (
    <div className={styles.thumb}>
      {src ? (
        <Image src={src} alt={alt ?? ""} fill sizes="112px" className={styles.img} />
      ) : (
        <span className={styles.noPhoto}>
          <Icon name="image" size={16} />
          Photo soon
        </span>
      )}
    </div>
  );
}

function InPlan() {
  return <span className={styles.inPlan}>In your plan</span>;
}

function StayResults() {
  const items = allStays();
  return (
    <>
      <p className={styles.count}>
        {items.length} places · prices for {items[0].nights} nights, 2 guests
      </p>
      <ul className={styles.list}>
        {items.map((s) => {
          const filler = (f: string) => s.filled_fields.includes(f);
          return (
            <li key={s.option_id} className={styles.row}>
              <Thumb src={s.image_url} alt={s.image_alt} />
              <div className={styles.rowBody}>
                <div className={styles.rowTop}>
                  <h3 className={styles.rowTitle}>{s.title}</h3>
                  {s.option_id === PICKED_ROWS.stay && <InPlan />}
                </div>
                <p className={styles.meta}>
                  {s.property_type} · {s.neighbourhood} · Hosted by{" "}
                  <Filler value={s.host} isFiller={filler("host")} />
                </p>
                <p className={styles.meta}>
                  <Filler value={s.highlight} isFiller={filler("highlight")} />
                </p>
                <p className={styles.price}>
                  <strong>{usd(s.price_usd)}</strong> / night · {usd(s.total_usd)} total
                  <span className={styles.rating}>
                    <Icon name="star" size={12} />
                    {s.rating.toFixed(2)} ({s.review_count})
                  </span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function ExperienceResults() {
  const items = allExperiences();
  const open = items.filter((e) => e.availability === "Spots open");
  const soldOut = items.filter((e) => e.availability !== "Spots open");

  const renderRow = (e: (typeof items)[number], isSoldOut: boolean) => {
    const filler = (f: string) => e.filled_fields.includes(f);
    return (
      <li key={e.option_id} className={`${styles.row} ${isSoldOut ? styles.soldOut : ""}`}>
        <Thumb src={e.image_url} alt={e.image_alt} />
        <div className={styles.rowBody}>
          <p className={styles.when}>
            {formatDay(e.date)} · {e.start_time} · {formatDuration(e.duration_min)}
          </p>
          <div className={styles.rowTop}>
            <h3 className={styles.rowTitle}>{e.title}</h3>
            {e.option_id === PICKED_ROWS.experience && <InPlan />}
            {isSoldOut && <span className={styles.soldOutPill}>Sold out</span>}
          </div>
          <p className={styles.meta}>
            {e.category} · Host: <Filler value={e.host} isFiller={filler("host")} />
          </p>
          <p className={styles.meta}>
            Meet at <Filler value={e.meeting_point} isFiller={filler("meeting_point")} />
          </p>
          <p className={styles.price}>
            <strong>{usd(e.price_usd)}</strong> per guest · {usd(e.total_usd)} for 2
            <span className={styles.rating}>
              <Icon name="star" size={12} />
              {e.rating.toFixed(2)}
            </span>
          </p>
        </div>
      </li>
    );
  };

  return (
    <>
      <p className={styles.count}>
        {open.length} open on your dates
        {soldOut.length > 0 && ` · ${soldOut.length} sold out`}
      </p>
      <ul className={styles.list}>{open.map((e) => renderRow(e, false))}</ul>
      {soldOut.length > 0 && (
        <>
          <h3 className={styles.sectionLabel}>Sold out on your dates</h3>
          <ul className={styles.list}>{soldOut.map((e) => renderRow(e, true))}</ul>
        </>
      )}
    </>
  );
}

function FoodResults() {
  const items = allFood();
  return (
    <>
      <p className={styles.count}>{items.length} places to eat · costs for 2</p>
      <ul className={styles.list}>
        {items.map((f) => {
          const filler = (field: string) => f.filled_fields.includes(field);
          return (
            <li key={f.option_id} className={styles.row}>
              <Thumb src={f.image_url} alt={f.image_alt} />
              <div className={styles.rowBody}>
                <div className={styles.rowTop}>
                  <h3 className={styles.rowTitle}>{f.title}</h3>
                  {f.option_id === PICKED_ROWS.food && <InPlan />}
                </div>
                <p className={styles.meta}>
                  {f.cuisine} · {f.neighbourhood} · {f.meal} · {f.price_level}
                </p>
                <p className={styles.meta}>
                  <Filler value={f.booking_note} isFiller={filler("booking_note")} />
                </p>
                <p className={styles.price}>
                  About <strong>{usd(f.total_usd)}</strong> for 2 · {f.walk_min} min walk
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
