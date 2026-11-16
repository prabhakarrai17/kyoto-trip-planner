"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { ASSISTANT_BUBBLE, ASSISTANT_BUBBLE_COLORS } from "@/components/bubbleClasses";
import ErrorBubble from "@/components/ErrorBubble";
import Icon from "@/components/Icon";
import ResultsSheet from "@/components/ResultsSheet";
import ThinkingDots from "@/components/ThinkingDots";
import TripReplyView from "@/components/TripReplyView";
import type { ResultsKind } from "@/lib/mockReply";
import { fetchReplyBody, readTrigger } from "@/lib/mockServer";
import { parseTripReply } from "@/lib/parseReply";
import type { Intent, TripReply } from "@/lib/types";
import styles from "./ChatPage.module.css";

// How long the reply bubble shows the thinking dots before the cards arrive.
const THINKING_MS = 1800;
const SUGGESTION = "Kyoto weekend plan";

type Message =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; status: "thinking" }
  | { id: number; role: "assistant"; status: "done"; reply: TripReply }
  // The reply couldn't be turned into cards. Keeps the query so Try again can resend it.
  | { id: number; role: "assistant"; status: "error"; query: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [results, setResults] = useState<{ kind: ResultsKind; intent: Intent } | null>(null);
  const closeResults = useCallback(() => setResults(null), []);

  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // Keep the newest question at the top of the thread, so the reply reads
  // from its start instead of jumping to the bottom of the last card.
  useEffect(() => {
    const thread = threadRef.current;
    if (!thread || messages.length === 0) return;
    const lastQuestion = thread.querySelector<HTMLElement>("[data-last-question]");
    if (!lastQuestion) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    thread.scrollTo({
      top: lastQuestion.offsetTop - 16,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [messages]);

  // Give focus back to the box once it unlocks.
  useEffect(() => {
    if (!isThinking && messages.length > 0) inputRef.current?.focus();
  }, [isThinking, messages.length]);

  // Locks the box, waits, then asks the mock server and checks its answer.
  // A body that can't become three cards turns the bubble into the error bubble.
  function requestReply(replyId: number, query: string, forceFailure: boolean) {
    setIsThinking(true);
    timer.current = setTimeout(() => {
      const reply = parseTripReply(fetchReplyBody(query, { forceFailure }));
      setMessages((prev) =>
        prev.map((m) => {
          if (m.id !== replyId) return m;
          return reply
            ? { id: replyId, role: "assistant", status: "done", reply }
            : { id: replyId, role: "assistant", status: "error", query };
        }),
      );
      setIsThinking(false);
    }, THINKING_MS);
  }

  function send(text: string) {
    if (isThinking) return;
    // "/fail" at the end forces the broken reply. It's taken off what the guest sees.
    const { query, forceFailure } = readTrigger(text);
    if (!query) return;

    const questionId = nextId.current++;
    const replyId = nextId.current++;

    setMessages((prev) => [
      ...prev,
      { id: questionId, role: "user", text: query },
      { id: replyId, role: "assistant", status: "thinking" },
    ]);
    setDraft("");
    requestReply(replyId, query, forceFailure);
  }

  // Try again sends the same query, without the trigger, so the broken answer
  // is skipped: the same bubble shows the thinking dots, then the three cards.
  function retry(replyId: number, query: string) {
    if (isThinking) return;
    setMessages((prev) =>
      prev.map((m) => (m.id === replyId ? { id: replyId, role: "assistant", status: "thinking" } : m)),
    );
    requestReply(replyId, query, false);
  }

  // A link like /?q=Kyoto%20weekend%20plan sends that query once the page
  // loads, so testers and the README screenshots can open straight to a reply.
  // Add %20%2Ffail to the end to open straight to the error bubble.
  // The cleanup cancels the timer, so React's double-run in dev still sends once.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (!q) return;
    const t = setTimeout(() => send(q), 300);
    return () => clearTimeout(t);
    // Runs once on load; `send` only reads state that is still initial here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send(draft);
  }

  const lastQuestionId = [...messages].reverse().find((m) => m.role === "user")?.id;

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.mark} aria-hidden="true">
            <Icon name="compass" size={18} />
          </span>
          <div className={styles.titles}>
            <h1 className={styles.title}>Trip planner</h1>
            <p className={styles.subtitle}>Say where and when. Get a stay, a plan and a meal.</p>
          </div>
          <span className={styles.badge}>Prototype</span>
        </div>
      </header>

      <div className={styles.thread} ref={threadRef}>
        <div className={styles.threadInner} role="log" aria-live="polite" aria-label="Conversation">
          {messages.length === 0 ? (
            <div className={styles.empty}>
              <h2 className={styles.emptyTitle}>Where are you headed?</h2>
              <p className={styles.emptyText}>
                Type a trip idea in your own words. You&apos;ll get a place to stay, something to do and
                somewhere to eat, before you set a single filter.
              </p>
              <button type="button" className={styles.suggestion} onClick={() => send(SUGGESTION)}>
                Try &ldquo;{SUGGESTION}&rdquo;
                <Icon name="arrowRight" size={15} />
              </button>
            </div>
          ) : (
            messages.map((m) => {
              if (m.role === "user") {
                return (
                  <div
                    key={m.id}
                    className={styles.userRow}
                    data-last-question={m.id === lastQuestionId ? "" : undefined}
                  >
                    <p className={styles.userBubble}>{m.text}</p>
                  </div>
                );
              }
              if (m.status === "thinking") {
                return (
                  <div key={m.id} className={styles.botRow}>
                    <span className={styles.avatar} aria-hidden="true">
                      <Icon name="spark" size={15} />
                    </span>
                    <div className={`${ASSISTANT_BUBBLE} ${ASSISTANT_BUBBLE_COLORS}`}>
                      <ThinkingDots label="Planning your trip" />
                    </div>
                  </div>
                );
              }
              if (m.status === "error") {
                return (
                  <div key={m.id} className={styles.botRow}>
                    <span className={styles.avatar} aria-hidden="true">
                      <Icon name="spark" size={15} />
                    </span>
                    <ErrorBubble onRetry={() => retry(m.id, m.query)} />
                  </div>
                );
              }
              return (
                <div key={m.id} className={styles.botRow}>
                  <span className={styles.avatar} aria-hidden="true">
                    <Icon name="spark" size={15} />
                  </span>
                  <TripReplyView
                    reply={m.reply}
                    onSeeAll={(kind) => setResults({ kind, intent: m.reply.intent })}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>

      <footer className={styles.composer}>
        <form className={styles.form} onSubmit={onSubmit} aria-busy={isThinking}>
          <label htmlFor="trip-query" className="visually-hidden">
            Describe your trip
          </label>
          <input
            id="trip-query"
            ref={inputRef}
            className={styles.input}
            type="text"
            autoComplete="off"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={isThinking}
            placeholder={isThinking ? "Planning your trip…" : "Try “Kyoto weekend plan”"}
          />
          <button
            type="submit"
            className={styles.send}
            disabled={isThinking || draft.trim() === ""}
            aria-label="Send"
          >
            <Icon name="arrowUp" size={18} />
          </button>
        </form>
      </footer>

      {results && <ResultsSheet kind={results.kind} intent={results.intent} onClose={closeResults} />}
    </div>
  );
}
