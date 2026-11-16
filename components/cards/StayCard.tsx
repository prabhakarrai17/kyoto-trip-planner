import Image from "next/image";
import Icon from "@/components/Icon";
import { usd } from "@/lib/format";
import type { StayCardData } from "@/lib/types";
import base from "./cardBase.module.css";
import Filler from "./Filler";
import styles from "./StayCard.module.css";

// Layout: wide image box under the headline, price and rating on the photo.
export default function StayCard({ data, onSeeAll }: { data: StayCardData; onSeeAll: () => void }) {
  const item = data.items[0];
  const isFiller = (field: string) => item.filled_fields.includes(field);

  return (
    <article className={`${base.card} ${styles.card}`} aria-label={`Stay: ${data.headline}`}>
      <header className={base.strip}>
        <Icon name="bed" />
        {data.header_label}
        <span className={base.stripEnd}>{item.nights} nights</span>
      </header>

      <div className={base.body}>
        <h3 className={styles.title}>{data.headline}</h3>

        <div className={styles.photo}>
          {item.image_url ? (
            <>
              <Image
                src={item.image_url}
                alt={item.image_alt ?? ""}
                fill
                sizes="(min-width: 900px) 320px, 440px"
                className={styles.img}
              />
              <span className={styles.sample}>Sample photo</span>
            </>
          ) : (
            <span className={styles.photoNote}>
              <Icon name="image" size={15} />
              Photo coming soon
            </span>
          )}
          <span className={styles.price}>
            {usd(item.price_usd)}
            <small> / {item.price_unit}</small>
          </span>
          <span className={styles.rating}>
            <Icon name="star" size={13} />
            {item.rating.toFixed(2)} · {item.review_count} reviews
          </span>
        </div>

        <p className={styles.meta}>
          {data.tags.join(" · ")} · Hosted by <Filler value={item.host} isFiller={isFiller("host")} />
        </p>

        <p className={styles.highlight}>
          <Icon name="check" size={15} />
          <span>
            <Filler value={item.highlight} isFiller={isFiller("highlight")} />
          </span>
        </p>

        <p className={styles.total}>
          <strong>{usd(item.total_usd)}</strong> total for {item.nights} nights
        </p>

        <button type="button" className={base.cta} onClick={onSeeAll} aria-haspopup="dialog">
          {data.cta.label}
          <Icon name="arrowRight" />
        </button>
      </div>
    </article>
  );
}
