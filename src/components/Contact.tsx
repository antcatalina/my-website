import { useState, type ChangeEvent, type FormEvent, type ReactElement } from 'react';
import { useLocale } from '../hooks/useLocale';
import './Sections.css';

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
  _hp: string;
};

const EMPTY: ContactForm = { name: '', email: '', subject: '', message: '', _hp: '' };
const CONTACT_API = import.meta.env.VITE_CONTACT_API_URL as string | undefined;

export const Contact = (): ReactElement => {
  const { strings: i18n } = useLocale();
  const [form, setForm] = useState<ContactForm>(EMPTY);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!CONTACT_API) {
      setSent(true);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSent(true);
    } catch {
      setError(i18n.CONTACT_ERROR);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="contact__done">
        <span className="contact__seal" aria-hidden="true">
          <svg viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="1" opacity="0.35" />
            <path
              d="M13 22l7 7 11-13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="entry__title">{i18n.CONTACT_SUCCESS_TITLE}</h2>
        <p className="section__body">{i18n.CONTACT_SUCCESS_BODY}</p>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => {
            setSent(false);
            setForm(EMPTY);
          }}
        >
          {i18n.CONTACT_SEND_ANOTHER}
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {/* Honeypot. Hidden from sighted users, from AT, and from the tab order —
          bots fill it, people never see it. */}
      <input
        name="_hp"
        value={form._hp}
        onChange={set}
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        className="form__hp"
      />

      <div className="form__row">
        <div className="field">
          <label htmlFor="c-name">{i18n.CONTACT_NAME}</label>
          <input
            id="c-name"
            name="name"
            value={form.name}
            onChange={set}
            autoComplete="name"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="c-email">{i18n.CONTACT_EMAIL}</label>
          <input
            id="c-email"
            name="email"
            type="email"
            value={form.email}
            onChange={set}
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="c-subject">{i18n.CONTACT_SUBJECT}</label>
        <select id="c-subject" name="subject" value={form.subject} onChange={set} required>
          <option value="">{i18n.CONTACT_SUBJECT_PLACEHOLDER}</option>
          <option>{i18n.CONTACT_SUBJECT_WORK}</option>
          <option>{i18n.CONTACT_SUBJECT_COLLAB}</option>
          <option>{i18n.CONTACT_SUBJECT_GENERAL}</option>
          <option>{i18n.CONTACT_SUBJECT_OTHER}</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="c-message">{i18n.CONTACT_MESSAGE}</label>
        <textarea
          id="c-message"
          name="message"
          value={form.message}
          onChange={set}
          rows={5}
          placeholder={i18n.CONTACT_MESSAGE_PLACEHOLDER}
          required
        />
      </div>

      {/* Announced to screen readers the moment a send fails. */}
      <p className="form__error" role="alert">
        {error}
      </p>

      <button type="submit" className="btn" disabled={loading} aria-busy={loading}>
        {loading ? i18n.CONTACT_SENDING : i18n.CONTACT_SUBMIT}
      </button>
    </form>
  );
};
