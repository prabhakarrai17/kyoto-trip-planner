import Icon from "@/components/Icon";
import { formatDay, formatDuration, usd } from "@/lib/format";
import type { ExperienceCardData } from "@/lib/types";
import base from "./cardBase.module.css";
import Filler from "./Filler";
import styles from "./ExperienceCard.module.css";

// Layout: no image box. The start time is the biggest text, beside a
// timeline line, so this card reads as "when" rather than "where".
export default function ExperienceCard({
  data,
  onSeeAll,
}: {
  data: ExperienceCardData;
  onSeeAll: () => void;
}) {
  const item = data.items[0];
  const isFiller = (field: string) => item.filled_fields.includes(field);

  return (
    <article className={`${base.card} ${styles.card}`} aria-label={`Experience: ${data.headline}`}>
      <header className={base.strip}>
        <Icon name="compass" />
        {data.header_label}
        <span className={`${base.stripEnd} ${styles.availability}`}>{item.availability}</span>
      </header>

      <div className={base.body}>
        <div className={styles.slot}>
          <div className={styles.when}>
            <time className={styles.time} dateTime={`${item.date}T${item.start_time}`}>
              {item.start_time}
            </time>
            <span className={styles.day}>{formatDay(item.date)}</span>
          </div>
          <div className={styles.what}>
            <h3 className={styles.title}>{data.headline}</h3>
            <p className={styles.sub}>
              {item.category} · {formatDuration(item.duration_min)}
            </p>
          </div>
        </div>

        <dl className={styles.facts}>
          <div>
            <dt>Host</dt>
            <dd>
              <Filler value={item.host} isFiller={isFiller("host")} />
            </dd>
          </div>
          <div>
            <dt>Meet at</dt>
            <dd>
              <Filler value={item.meeting_point} isFiller={isFiller("meeting_point")} />
            </dd>
          </div>
          <div>
            <dt>Rating</dt>
            <dd className={styles.rating}>
              <Icon name="star" size={13} />
              {item.rating.toFixed(2)}
            </dd>
          </div>
        </dl>

        <p className={styles.price}>
          <strong>{usd(item.price_usd)}</strong> per guest · {usd(item.total_usd)} for 2
        </p>

        <button type="button" className={base.cta} onClick={onSeeAll} aria-haspopup="dialog">
          {data.cta.label}
          <Icon name="arrowRight" />
        </button>
      </div>
    </article>
  );
}
