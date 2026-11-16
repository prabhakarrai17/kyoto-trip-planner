import ExperienceCard from "@/components/cards/ExperienceCard";
import FoodCard from "@/components/cards/FoodCard";
import StayCard from "@/components/cards/StayCard";
import Icon from "@/components/Icon";
import { formatDateRange, usd } from "@/lib/format";
import type { TripReply } from "@/lib/types";
import styles from "./TripReplyView.module.css";

export default function TripReplyView({ reply }: { reply: TripReply }) {
  const { intent, cards, budget } = reply;
  const [stay, experience, food] = cards;
  const share = Math.min(100, Math.round((budget.total_usd / budget.reference_usd) * 100));

  return (
    <div className={styles.reply}>
      <div className={styles.intro}>
        <p>Here&apos;s a starting point for a weekend in {intent.place}.</p>
        <ul className={styles.chips} aria-label="What I understood">
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
      </div>

      <div className={styles.cards}>
        <StayCard data={stay} />
        <ExperienceCard data={experience} />
        <FoodCard data={food} />
      </div>

      <div className={styles.budget}>
        <p>
          Together these come to <strong>{usd(budget.total_usd)}</strong> of your{" "}
          {usd(budget.reference_usd)} weekend budget for 2.
        </p>
        <div className={styles.meter} aria-hidden="true">
          <span style={{ width: `${share}%` }} />
        </div>
      </div>
    </div>
  );
}
