"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import ThinkingDots from "@/components/ThinkingDots";
import TripReplyView from "@/components/TripReplyView";
import { buildMockReply } from "@/lib/mockReply";
import type { TripReply } from "@/lib/types";
import styles from "./ChatPage.module.css";

// How long the reply bubble shows the thinking dots before the cards arrive.
const THINKING_MS = 1800;
const SUGGESTION = "Kyoto weekend plan";

type Message =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; status: "thinking" }
  | { id: number; role: "assistant"; status: "done"; reply: TripReply };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [isThinking, setIsThinking] = useState(false);

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

  // A link like /?q=Kyoto%20weekend%20plan sends that query once the page
  // loads, so testers and the README screenshot can open straight to a reply.
  // The cleanup cancels the timer, so React's double-run in dev still sends once.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (!q) return;
    const t = setTimeout(() => send(q), 300);
    return () => clearTimeout(t);
    // Runs once on load; `send` only reads state that is still initial here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Give focus back to the box once it unlocks.
  useEffect(() => {
    if (!isThinking && messages.length > 0) inputRef.current?.focus();
  }, [isThinking, messages.length]);

  function send(text: string) {
    const query = text.trim();
    if (!query || isThinking) return;

    const questionId = nextId.current++;
    const replyId = nextId.current++;

    setMessages((prev) => [
      ...prev,
      { id: questionId, role: "user", text: query },
      { id: replyId, role: "assistant", status: "thinking" },
    ]);
    setDraft("");
    setIsThinking(true);

    timer.current = setTimeout(() => {
      const reply = buildMockReply(query);
      setMessages((prev) =>
        prev.map((m) => (m.id === replyId ? { id: replyId, role: "assistant", status: "done", reply } : m)),
      );
      setIsThinking(false);
    }, THINKING_MS);
  }

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
                    <div className={styles.thinkingBubble}>
                      <ThinkingDots label="Planning your trip" />
                    </div>
                  </div>
                );
              }
              return (
                <div key={m.id} className={styles.botRow}>
                  <span className={styles.avatar} aria-hidden="true">
                    <Icon name="spark" size={15} />
                  </span>
                  <TripReplyView reply={m.reply} />
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
    </div>
  );
}
