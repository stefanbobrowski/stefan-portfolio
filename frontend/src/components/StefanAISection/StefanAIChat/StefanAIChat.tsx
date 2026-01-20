import { useState, useEffect, useRef } from 'react';
import { apiEndpoints } from '../../../config/api';
import styles from './StefanAIChat.module.scss';

export default function StefanAIChat({
  onSendPreset,
}: {
  onSendPreset?: (fn: (msg: string) => void) => void;
}) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    {
      role: 'assistant',
      text: "I'm Stefan AI, built to help you navigate Stefan's website and answer any questions you may have about his work or technical background. How may I assist you?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  async function askStefan(message?: string) {
    const text = message ?? input.trim();
    if (!text) return;

    const userMessage = { role: 'user' as const, text };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch(apiEndpoints.askStefan, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text }),
      });

      const data = await res.json();

      // Check for rate limiting or other errors
      if (!res.ok) {
        const errorMessage = data.error || 'An error occurred. Please try again.';
        setMessages(prev => [...prev, { role: 'assistant', text: errorMessage }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: data.answer ?? 'No response.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Error contacting Stefan AI.' }]);
    }

    setInput('');
    setLoading(false);
  }

  // expose askStefan to parent
  if (onSendPreset) {
    onSendPreset(askStefan);
  }

  // auto-scroll to bottom when messages change
  useEffect(() => {
    const el = chatBoxRef.current;
    if (!el) return;
    // wait a tick for DOM updates
    requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    });
  }, [messages, loading]);

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.bubbleFrame}>
        <div className={styles.bubblePointer}></div>

        <div className={styles.chatBox} ref={chatBoxRef}>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`${styles.message} ${
                m.role === 'user' ? styles.userMessage : styles.assistantMessage
              }`}
            >
              {m.text}
            </div>
          ))}

          {loading && <div className={styles.loadingBubble}>Stefan AI is thinking…</div>}
        </div>
      </div>

      <div className={styles.inputRow}>
        <input
          className={styles.inputField}
          value={input}
          placeholder="Ask Stefan AI anything…"
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && askStefan()}
        />
        <button type="button" className={styles.sendButton} onClick={() => askStefan()}>
          Send
        </button>
      </div>
    </div>
  );
}
