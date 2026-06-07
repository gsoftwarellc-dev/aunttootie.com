import { useEffect, useState, useRef, useCallback } from 'react';
import { api } from '../api';

const SITE_URL_FOR_IMG = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';

function ImageField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview]     = useState(value || '');
  const inputRef = useRef(null);

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const res = await api.uploadImage(file);
    setUploading(false);
    if (res.url) {
      setPreview(res.url);
      onChange(res.url);
    }
  }

  const src = preview
    ? (preview.startsWith('http') ? preview : `${SITE_URL_FOR_IMG}${preview}`)
    : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {src && (
        <div style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', border: '1px solid var(--border)' }}>
          <img src={src} alt={label} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', transition: 'background 0.2s' }} />
        </div>
      )}
      <button
        type="button"
        className="btn btn-ghost btn-sm"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        style={{ alignSelf: 'flex-start' }}
      >
        {uploading ? 'Uploading…' : src ? '🔄 Replace Image' : '📁 Upload Image'}
      </button>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
    </div>
  );
}

const SITE_URL = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';

const PAGES = {
  home: {
    label: '🏠 Home Page',
    previewPath: '/',
    sections: [
      {
        key: 'hero',
        label: '🏠 Hero',
        fields: [
          { key: 'label',     label: 'Top Label',    type: 'text' },
          { key: 'title',     label: 'Main Title',   type: 'text' },
          { key: 'image',     label: 'Hero Image',   type: 'image' },
        ],
      },
      {
        key: 'about',
        label: '📖 Our Story',
        fields: [
          { key: 'label',  label: 'Section Label', type: 'text' },
          { key: 'title',  label: 'Title',         type: 'text' },
          { key: 'body1',  label: 'Paragraph 1',   type: 'textarea' },
          { key: 'body2',  label: 'Paragraph 2',   type: 'textarea' },
          { key: 'image1', label: 'Main Image',    type: 'image' },
          { key: 'image2', label: 'Second Image',  type: 'image' },
        ],
      },
      {
        key: 'premium',
        label: '⭐ Premium',
        fields: [
          { key: 'title', label: 'Title',       type: 'text' },
          { key: 'desc',  label: 'Description', type: 'textarea' },
          { key: 'image', label: 'Image',       type: 'image' },
        ],
      },
      {
        key: 'magazine',
        label: '📚 Magazine',
        fields: [
          { key: 'title',  label: 'Title',       type: 'text' },
          { key: 'desc',   label: 'Description', type: 'textarea' },
          { key: 'cover1', label: 'Cover 1',     type: 'image' },
          { key: 'cover2', label: 'Cover 2',     type: 'image' },
        ],
      },
    ],
  },
  footer: {
    label: '🔻 Footer',
    previewPath: '/',
    sections: [
      {
        key: 'brand',
        label: '🏷️ Brand',
        fields: [
          { key: 'tagline',       label: 'Tagline',       type: 'textarea' },
          { key: 'instagram_url', label: 'Instagram URL', type: 'text' },
          { key: 'facebook_url',  label: 'Facebook URL',  type: 'text' },
          { key: 'tiktok_url',    label: 'TikTok URL',    type: 'text' },
          { key: 'youtube_url',   label: 'YouTube URL',   type: 'text' },
          { key: 'pinterest_url', label: 'Pinterest URL', type: 'text' },
        ],
      },
      {
        key: 'connect',
        label: '✉️ Connect',
        fields: [
          { key: 'contact_email', label: 'Contact Email', type: 'text' },
        ],
      },
      {
        key: 'newsletter',
        label: '📬 Newsletter Box',
        fields: [
          { key: 'title', label: 'Title',       type: 'text' },
          { key: 'desc',  label: 'Description', type: 'textarea' },
        ],
      },
      {
        key: 'bottom',
        label: '©️ Copyright',
        fields: [
          { key: 'copyright', label: 'Copyright text', type: 'text', hint: 'e.g. Aunt Tootie. All rights reserved.' },
        ],
      },
    ],
  },
  team: {
    label: '👥 Team Page',
    previewPath: '/meet-the-team',
    sections: [
      {
        key: 'hero',
        label: '🖼️ Hero',
        fields: [
          { key: 'label',    label: 'Top Label',  type: 'text' },
          { key: 'title',    label: 'Main Title', type: 'text' },
          { key: 'subtitle', label: 'Subtitle',   type: 'text' },
          { key: 'image',    label: 'Hero Image', type: 'image' },
        ],
      },
      {
        key: 'intro',
        label: '📝 Intro',
        fields: [
          { key: 'label', label: 'Section Label', type: 'text' },
          { key: 'title', label: 'Title',         type: 'text' },
          { key: 'body',  label: 'Description',   type: 'textarea' },
        ],
      },
      {
        key: 'member1',
        label: '🐝 Member 1',
        fields: [
          { key: 'name',  label: 'Name',  type: 'text' },
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'bio',   label: 'Bio',   type: 'textarea' },
          { key: 'image', label: 'Photo', type: 'image' },
        ],
      },
      {
        key: 'member2',
        label: '🦋 Member 2',
        fields: [
          { key: 'name',  label: 'Name',  type: 'text' },
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'bio',   label: 'Bio',   type: 'textarea' },
          { key: 'image', label: 'Photo', type: 'image' },
        ],
      },
      {
        key: 'member3',
        label: '🌿 Member 3',
        fields: [
          { key: 'name',  label: 'Name',  type: 'text' },
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'bio',   label: 'Bio',   type: 'textarea' },
          { key: 'image', label: 'Photo', type: 'image' },
        ],
      },
      {
        key: 'member4',
        label: '🌸 Member 4',
        fields: [
          { key: 'name',  label: 'Name',  type: 'text' },
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'bio',   label: 'Bio',   type: 'textarea' },
          { key: 'image', label: 'Photo', type: 'image' },
        ],
      },
      {
        key: 'member5',
        label: '🌱 Member 5',
        fields: [
          { key: 'name',  label: 'Name',  type: 'text' },
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'bio',   label: 'Bio',   type: 'textarea' },
          { key: 'image', label: 'Photo', type: 'image' },
        ],
      },
      {
        key: 'member6',
        label: '🍽️ Member 6',
        fields: [
          { key: 'name',  label: 'Name',  type: 'text' },
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'bio',   label: 'Bio',   type: 'textarea' },
          { key: 'image', label: 'Photo', type: 'image' },
        ],
      },
      {
        key: 'quote',
        label: '💬 Closing Quote',
        fields: [
          { key: 'text', label: 'Quote Text', type: 'textarea', hint: 'No quotation marks needed' },
        ],
      },
    ],
  },
  about: {
    label: '📋 About Page',
    previewPath: '/about',
    sections: [
      {
        key: 'hero',
        label: '🖼️ Hero',
        fields: [
          { key: 'label',    label: 'Top Label',  type: 'text' },
          { key: 'title',    label: 'Main Title', type: 'text' },
          { key: 'subtitle', label: 'Subtitle',   type: 'text' },
          { key: 'image',    label: 'Hero Image', type: 'image' },
        ],
      },
      {
        key: 'story',
        label: '📖 The Beginning',
        fields: [
          { key: 'label',  label: 'Section Label', type: 'text' },
          { key: 'title',  label: 'Title',         type: 'text' },
          { key: 'body1',  label: 'Paragraph 1',   type: 'textarea' },
          { key: 'body2',  label: 'Paragraph 2',   type: 'textarea' },
          { key: 'body3',  label: 'Paragraph 3',   type: 'textarea' },
          { key: 'image1', label: 'Main Image',    type: 'image' },
          { key: 'image2', label: 'Second Image',  type: 'image' },
        ],
      },
      {
        key: 'quote',
        label: '💬 Pull Quote',
        fields: [
          { key: 'text', label: 'Quote Text', type: 'textarea', hint: 'No quotation marks needed' },
        ],
      },
      {
        key: 'philosophy',
        label: '⚖️ Philosophy',
        fields: [
          { key: 'label', label: 'Section Label', type: 'text' },
          { key: 'title', label: 'Title',         type: 'text' },
          { key: 'body1', label: 'Paragraph 1',   type: 'textarea' },
          { key: 'body2', label: 'Paragraph 2',   type: 'textarea' },
          { key: 'body3', label: 'Paragraph 3',   type: 'textarea' },
          { key: 'body4', label: 'Paragraph 4',   type: 'textarea' },
        ],
      },
      {
        key: 'values',
        label: '🃏 Value Cards',
        fields: [
          { key: 'card1_icon',  label: 'Card 1 Icon',  type: 'text', hint: 'Emoji e.g. 🌱' },
          { key: 'card1_title', label: 'Card 1 Title', type: 'text' },
          { key: 'card1_body',  label: 'Card 1 Text',  type: 'textarea' },
          { key: 'card2_icon',  label: 'Card 2 Icon',  type: 'text', hint: 'Emoji e.g. 🍽️' },
          { key: 'card2_title', label: 'Card 2 Title', type: 'text' },
          { key: 'card2_body',  label: 'Card 2 Text',  type: 'textarea' },
          { key: 'card3_icon',  label: 'Card 3 Icon',  type: 'text', hint: 'Emoji e.g. ⚖️' },
          { key: 'card3_title', label: 'Card 3 Title', type: 'text' },
          { key: 'card3_body',  label: 'Card 3 Text',  type: 'textarea' },
          { key: 'card4_icon',  label: 'Card 4 Icon',  type: 'text', hint: 'Emoji e.g. 🤝' },
          { key: 'card4_title', label: 'Card 4 Title', type: 'text' },
          { key: 'card4_body',  label: 'Card 4 Text',  type: 'textarea' },
        ],
      },
      {
        key: 'cta',
        label: '📣 Call to Action',
        fields: [
          { key: 'title', label: 'Title',       type: 'text' },
          { key: 'desc',  label: 'Description', type: 'textarea' },
          { key: 'image', label: 'Background Image', type: 'image' },
        ],
      },
    ],
  },
};

export default function Pages() {
  const [activePage, setActivePage]       = useState('home');
  const [activeSection, setActiveSection] = useState('hero');
  const [content, setContent]             = useState({});
  const [saving, setSaving]               = useState(false);
  const [saved, setSaved]                 = useState(false);
  const [loading, setLoading]             = useState(true);
  const [iframeReady, setIframeReady]     = useState(false);
  const iframeRef = useRef(null);

  // Load content when page changes
  useEffect(() => {
    setLoading(true);
    setIframeReady(false);
    setContent({});
    setActiveSection(PAGES[activePage].sections[0].key);
    api.getContent(activePage).then(data => {
      setContent(data && !data.message ? data : {});
      setLoading(false);
    });
  }, [activePage]);

  // Push content to iframe whenever it changes
  const pushToIframe = useCallback((c) => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: 'PREVIEW_UPDATE', content: c },
      SITE_URL
    );
  }, []);

  useEffect(() => {
    if (iframeReady && !loading) pushToIframe(content);
  }, [content, iframeReady, loading, pushToIframe]);

  function set(section, field, value) {
    setContent(c => ({ ...c, [section]: { ...c[section], [field]: value } }));
  }

  async function save() {
    setSaving(true);
    setSaved(false);
    await api.saveContent(activePage, content);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const page    = PAGES[activePage];
  const section = page.sections.find(s => s.key === activeSection);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 48px)', marginTop: -8 }}>

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', marginBottom: 12, flexShrink: 0 }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 600 }}>Page Editor</h1>
          <p style={{ color: 'var(--text-light)', fontSize: 12, marginTop: 2 }}>Edit on the left — see changes live on the right</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {Object.entries(PAGES).map(([key, p]) => (
            <button key={key} onClick={() => setActivePage(key)} className={`btn btn-sm ${activePage === key ? 'btn-primary' : 'btn-ghost'}`}>
              {p.label}
            </button>
          ))}
          <div style={{ width: 1, height: 24, background: 'var(--border)', margin: '0 4px' }} />
          <button className="btn btn-primary btn-sm" onClick={save} disabled={saving || loading}>
            {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Editor + Preview */}
      <div style={{ display: 'flex', gap: 12, flex: 1, minHeight: 0 }}>

        {/* Left panel — fixed width, fully scrollable */}
        <div style={{ width: 300, flexShrink: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0 }}>

          {/* Section pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
            {page.sections.map(s => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                style={{
                  padding: '5px 11px', borderRadius: 20, border: '1px solid',
                  borderColor: activeSection === s.key ? 'var(--gold)' : 'var(--border)',
                  background: activeSection === s.key ? 'var(--gold)' : 'var(--white)',
                  color: activeSection === s.key ? '#fff' : 'var(--text-light)',
                  fontSize: 12, fontWeight: 500, cursor: 'pointer',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* All fields for selected section — no card border, just stacked */}
          {loading ? (
            <div style={{ padding: 24, color: '#999', textAlign: 'center' }}>Loading…</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {section.fields.map(f => (
                <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    {f.label}
                  </label>
                  {f.hint && <span style={{ fontSize: 11, color: '#bbb' }}>{f.hint}</span>}
                  {f.type === 'image' ? (
                    <ImageField
                      label={f.label}
                      value={content[section.key]?.[f.key] || ''}
                      onChange={url => set(section.key, f.key, url)}
                    />
                  ) : f.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      value={content[section.key]?.[f.key] || ''}
                      onChange={e => set(section.key, f.key, e.target.value)}
                      style={{ fontSize: 13, resize: 'vertical' }}
                    />
                  ) : (
                    <input
                      type="text"
                      value={content[section.key]?.[f.key] || ''}
                      onChange={e => set(section.key, f.key, e.target.value)}
                      style={{ fontSize: 13 }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right — live preview iframe */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.12)' }}>
          {/* Browser bar */}
          <div style={{ background: '#2b2b2b', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: 5 }}>
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57', display: 'block' }} />
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e', display: 'block' }} />
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840', display: 'block' }} />
            </div>
            <span style={{ fontSize: 11, color: '#888', flex: 1, textAlign: 'center', background: '#1a1a1a', borderRadius: 4, padding: '2px 10px' }}>
              {SITE_URL}{page.previewPath}
            </span>
            <a href={`${SITE_URL}${page.previewPath}`} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: '#888', textDecoration: 'none', flexShrink: 0 }}>
              ↗ Open
            </a>
          </div>
          <iframe
            ref={iframeRef}
            src={`${SITE_URL}${page.previewPath}`}
            onLoad={() => { setIframeReady(true); setTimeout(() => pushToIframe(content), 300); }}
            style={{ flex: 1, border: 'none', background: '#fff' }}
            title="Page Preview"
          />
        </div>
      </div>
    </div>
  );
}
