import { ASSISTANT_BUBBLE } from "@/components/bubbleClasses";
import Icon from "@/components/Icon";

// Follows "Assistant Bubble Error Message Guidelines" (Design Systems):
// - Lead line is 8 words or fewer and in the guest's terms. One supporting
//   sentence says what happens next. No blame, no exclamation marks, and none
//   of: error, failed, invalid, null, undefined, timeout or status codes.
// - Exactly one action, "Try again", in the chat's primary button style,
//   inside the bubble and directly below the message. No toast or modal.
// - Same shape as a normal reply. Neutral colours only: no red anywhere and
//   no warning icon. The optional icon is small, muted and hidden from
//   screen readers.
// - The thread around it is a polite live region that is already on the
//   page, so screen readers announce the message when it appears.
export const ERROR_LEAD = "We couldn't put your plan together.";
export const ERROR_SUPPORT = "Your search is saved, so you can try again.";

export default function ErrorBubble({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      className={`${ASSISTANT_BUBBLE} border-gray-200 bg-white text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100`}
    >
      <p className="flex items-center gap-2 font-medium">
        <Icon name="compass" className="h-4 w-4 shrink-0 text-gray-400" />
        {ERROR_LEAD}
      </p>
      <p className="mt-1 text-[14px] text-gray-800 dark:text-gray-200">{ERROR_SUPPORT}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 inline-flex min-h-[44px] items-center rounded-full border-0 bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-gray-100 dark:focus-visible:ring-offset-gray-900"
      >
        Try again
      </button>
    </div>
  );
}
