import Icon from "@/components/Icon";
import { usd } from "@/lib/format";
import type { FoodCardData } from "@/lib/types";
import base from "./cardBase.module.css";
import Filler from "./Filler";
import styles from "./FoodCard.module.css";

// Layout: small square image box to the right of the headline, then a short
// list of practical notes and tag pills.
export default function FoodCard({ data }: { data: FoodCardData }) {
  const item = data.items[0];
  const isFiller = (field: string) => item.filled_fields.includes(field);

  return (
    <article className={`${base.card} ${styles.card}`} aria-label={`Food: ${data.headline}`}>
      <header className={base.strip}>
        <Icon name="bowl" />
        {data.header_label}
        <span className={base.stripEnd}>{item.price_level}</span>
      </header>

      <div className={base.body}>
        <div className={styles.top}>
          <div className={styles.heading}>
            <h3 className={styles.title}>{data.headline}</h3>
            <p className={styles.sub}>{item.neighbourhood}</p>
          </div>
          <div className={styles.thumb}>
            <Icon name="image" size={16} />
            <span>Photo soon</span>
          </div>
        </div>

        <ul className={styles.notes}>
          <li>
            <Icon name="walk" size={15} />
            {item.walk_min} min walk from your stay
          </li>
          <li>
            <Icon name="user" size={15} />
            About {usd(item.total_usd)} for 2
          </li>
          <li>
            <Icon name="calendar" size={15} />
            <span>
              <Filler value={item.booking_note} isFiller={isFiller("booking_note")} />
            </span>
          </li>
        </ul>

        <ul className={styles.tags} aria-label="Tags">
          {data.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <button type="button" className={base.cta}>
          {data.cta.label}
          <Icon name="arrowRight" />
        </button>
      </div>
    </article>
  );
}
