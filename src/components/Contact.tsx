import { useState, type ChangeEvent, type ReactElement } from 'react';
import { useLocale } from '../hooks/useLocale';

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

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setError(null);
    if (!CONTACT_API) { setSent(true); return; }
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
      <div className="px-5 py-5 container info-container rounded-3 contact-success">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
          <circle cx="22" cy="22" r="20" fill="rgba(118,116,255,0.12)" stroke="var(--home-text-tertiary)" strokeWidth="1.5" />
          <path d="M13 22l7 7 11-13" stroke="var(--home-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h4 className="pt-3 primary-text">{i18n.CONTACT_SUCCESS_TITLE}</h4>
        <p className="secondary-text">{i18n.CONTACT_SUCCESS_BODY}</p>
        <button
          className="contact-btn-outline mt-2"
          onClick={() => { setSent(false); setForm(EMPTY); }}
        >
          {i18n.CONTACT_SEND_ANOTHER}
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 py-4 container info-container rounded-3">
      <h4 className="pt-2 primary-text">{i18n.CONTACT}</h4>
      <form className="contact-form pt-3" onSubmit={handleSubmit} noValidate>
        <input name="_hp" value={form._hp} onChange={set} tabIndex={-1} aria-hidden="true" style={{ display: 'none' }} />

        <div className="contact-row">
          <div className="contact-field">
            <label htmlFor="c-name" className="tertiary-text">{i18n.CONTACT_NAME}</label>
            <input id="c-name" name="name" value={form.name} onChange={set} placeholder="Jane Smith" required />
          </div>
          <div className="contact-field">
            <label htmlFor="c-email" className="tertiary-text">{i18n.CONTACT_EMAIL}</label>
            <input id="c-email" name="email" type="email" value={form.email} onChange={set} placeholder="jane@example.com" required />
          </div>
        </div>

        <div className="contact-field">
          <label htmlFor="c-subject" className="tertiary-text">{i18n.CONTACT_SUBJECT}</label>
          <select id="c-subject" name="subject" value={form.subject} onChange={set} required>
            <option value="">{i18n.CONTACT_SUBJECT_PLACEHOLDER}</option>
            <option>{i18n.CONTACT_SUBJECT_WORK}</option>
            <option>{i18n.CONTACT_SUBJECT_COLLAB}</option>
            <option>{i18n.CONTACT_SUBJECT_GENERAL}</option>
            <option>{i18n.CONTACT_SUBJECT_OTHER}</option>
          </select>
        </div>

        <div className="contact-field">
          <label htmlFor="c-message" className="tertiary-text">{i18n.CONTACT_MESSAGE}</label>
          <textarea id="c-message" name="message" value={form.message} onChange={set} rows={4} placeholder={i18n.CONTACT_MESSAGE_PLACEHOLDER} required />
        </div>

        {error && <p className="contact-error">{error}</p>}

        <button type="submit" className="contact-btn-primary" disabled={loading}>
          {loading ? i18n.CONTACT_SENDING : i18n.CONTACT_SUBMIT}
        </button>
      </form>
    </div>
  );
};
