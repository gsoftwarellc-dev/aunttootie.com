import { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { api } from '../api';
import './Recipes.css';

// ─── Toolbar Button ──────────────────────────────────────────────────────────
function TBtn({ active, onClick, title, children, disabled }) {
  return (
    <button type="button" className={`rtb-btn${active ? ' rtb-btn--active' : ''}`} onClick={onClick} title={title} disabled={disabled}>
      {children}
    </button>
  );
}

// ─── Editor Toolbar ──────────────────────────────────────────────────────────
function Toolbar({ editor, onImage }) {
  if (!editor) return null;

  const headingLevel = editor.isActive('heading', { level: 1 }) ? '1'
    : editor.isActive('heading', { level: 2 }) ? '2'
    : editor.isActive('heading', { level: 3 }) ? '3'
    : editor.isActive('heading', { level: 4 }) ? '4'
    : 'p';

  const setHeading = (v) => {
    if (v === 'p') editor.chain().focus().setParagraph().run();
    else editor.chain().focus().toggleHeading({ level: parseInt(v) }).run();
  };

  const addLink = () => {
    const url = prompt('Enter URL:');
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  return (
    <div className="rtb">
      {/* Text style */}
      <div className="rtb-group">
        <select className="rtb-select" value={headingLevel} onChange={e => setHeading(e.target.value)}>
          <option value="p">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
        </select>
      </div>

      <div className="rtb-divider" />

      {/* Format */}
      <div className="rtb-group">
        <TBtn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold"><strong>B</strong></TBtn>
        <TBtn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic"><em>I</em></TBtn>
        <TBtn active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline"><u>U</u></TBtn>
        <TBtn active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()} title="Highlight">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        </TBtn>
      </div>

      <div className="rtb-divider" />

      {/* Alignment */}
      <div className="rtb-group">
        <TBtn active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} title="Align left">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>
        </TBtn>
        <TBtn active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} title="Center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
        </TBtn>
        <TBtn active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} title="Align right">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="6" y1="18" x2="21" y2="18"/></svg>
        </TBtn>
      </div>

      <div className="rtb-divider" />

      {/* Lists */}
      <div className="rtb-group">
        <TBtn active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none"/></svg>
        </TBtn>
        <TBtn active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered list">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4" strokeWidth="1.5"/><path d="M4 10h2" strokeWidth="1.5"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" strokeWidth="1.5"/></svg>
        </TBtn>
      </div>

      <div className="rtb-divider" />

      {/* Blocks */}
      <div className="rtb-group">
        <TBtn active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
        </TBtn>
        <TBtn active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()} title="Inline code">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        </TBtn>
        <TBtn active={false} onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </TBtn>
      </div>

      <div className="rtb-divider" />

      {/* Link */}
      <div className="rtb-group">
        <TBtn active={editor.isActive('link')} onClick={addLink} title="Add link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        </TBtn>
        <TBtn active={false} onClick={() => editor.chain().focus().unsetLink().run()} title="Remove link" disabled={!editor.isActive('link')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/><line x1="4" y1="4" x2="20" y2="20"/></svg>
        </TBtn>
      </div>

      <div className="rtb-divider" />

      {/* Table */}
      <div className="rtb-group">
        <TBtn active={false} onClick={insertTable} title="Insert table">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>
        </TBtn>
        {editor.isActive('table') && <>
          <TBtn active={false} onClick={() => editor.chain().focus().addColumnAfter().run()} title="Add column">+Col</TBtn>
          <TBtn active={false} onClick={() => editor.chain().focus().addRowAfter().run()} title="Add row">+Row</TBtn>
          <TBtn active={false} onClick={() => editor.chain().focus().deleteTable().run()} title="Delete table">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          </TBtn>
        </>}
      </div>

      <div className="rtb-divider" />

      {/* Image */}
      <div className="rtb-group">
        <label className="rtb-btn" title="Insert image" style={{ cursor: 'pointer' }}>
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={onImage} />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </label>
      </div>

      {/* Undo / Redo */}
      <div className="rtb-divider" />
      <div className="rtb-group">
        <TBtn active={false} onClick={() => editor.chain().focus().undo().run()} title="Undo" disabled={!editor.can().undo()}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
        </TBtn>
        <TBtn active={false} onClick={() => editor.chain().focus().redo().run()} title="Redo" disabled={!editor.can().redo()}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/></svg>
        </TBtn>
      </div>
    </div>
  );
}

// ─── Recipe Editor Modal ──────────────────────────────────────────────────────
const FALLBACK_CATEGORIES = [
  'Garden to Table', 'Good Eats without Meats', 'Brunch Bangers',
  'Dip and Drizzle', 'The Sip Section', 'Premium Pairings',
];

function RecipeEditor({ recipe, categories: catList = FALLBACK_CATEGORIES, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: recipe?.title || '',
    slug: recipe?.slug || '',
    category: recipe?.category || '',
    image: recipe?.image || '',
    time: recipe?.time || '',
    serves: recipe?.serves || '',
    difficulty: recipe?.difficulty || 'Easy',
    premium: !!recipe?.premium,
    featured: !!recipe?.featured,
    teaser: recipe?.teaser || '',
  });
  const [imgPreview, setImgPreview] = useState(recipe?.image || '');
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: false }),
      Underline,
      Highlight,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({ placeholder: 'Start writing your recipe — add steps, tips, ingredients, headings, images, tables and more…' }),
    ],
    content: (() => {
      const siteUrl = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';
      return (recipe?.description || '').split('src="/').join(`src="${siteUrl}/`);
    })(),
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const autoSlug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const handleTitle = (v) => {
    set('title', v);
    if (!recipe) set('slug', autoSlug(v));
  };

  const handleCoverImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const res = await api.uploadImage(file);
    if (res?.url) { set('image', res.url); setImgPreview(res.url); }
  };

  const handleEditorImage = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    const res = await api.uploadImage(file);
    if (res?.url) {
      const siteUrl = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';
      const fullUrl = res.url.startsWith('http') ? res.url : `${siteUrl}${res.url}`;
      editor.chain().focus().setImage({ src: fullUrl }).run();
    }
  }, [editor]);

  const handleSave = async () => {
    if (!form.title || !form.slug) return alert('Title and slug are required.');
    setSaving(true);
    const siteUrl = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';
    const html = (editor?.getHTML() || '').split(`src="${siteUrl}`).join('src="');
    await onSave({
      ...form,
      description: html,
      ingredients: recipe?.ingredients || [],
      instructions: recipe?.instructions || [],
      tags: recipe?.tags || [],
    });
    setSaving(false);
  };

  return (
    <div className="re-overlay" onClick={onCancel}>
      <div className="re-modal" onClick={e => e.stopPropagation()}>
        <div className="re-header">
          <h2>{recipe ? 'Edit Recipe' : 'New Recipe'}</h2>
          <button type="button" className="re-close" onClick={onCancel}>✕</button>
        </div>

        <div className="re-body">
          {/* ─ Meta column ─ */}
          <div className="re-meta">
            <div className="rf">
              <label>Title *</label>
              <input value={form.title} onChange={e => handleTitle(e.target.value)} placeholder="Recipe title" />
            </div>
            <div className="rf">
              <label>Teaser</label>
              <textarea rows={2} value={form.teaser} onChange={e => set('teaser', e.target.value)} placeholder="Short preview shown on recipe cards" />
            </div>
            <div className="rf">
              <label>Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)}>
                <option value="">Select…</option>
                {catList.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="rf">
              <label>Cover Image</label>
              <div className="rf-image">
                {imgPreview && (
                  <img
                    src={imgPreview.startsWith('http') ? imgPreview : `${import.meta.env.VITE_SITE_URL || 'http://localhost:5173'}${imgPreview}`}
                    alt="cover"
                    className="rf-thumb"
                  />
                )}
                <label className="btn btn-ghost btn-sm" style={{ cursor: 'pointer' }}>
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleCoverImage} />
                  {imgPreview ? 'Replace Image' : 'Upload Image'}
                </label>
              </div>
            </div>
            <div className="rf">
              <label>Access</label>
              <div className="rf-toggle">
                <button
                  type="button"
                  className={`rf-toggle-btn ${!form.premium ? 'rf-toggle-btn--active' : ''}`}
                  onClick={() => set('premium', false)}
                >
                  Free
                </button>
                <button
                  type="button"
                  className={`rf-toggle-btn ${form.premium ? 'rf-toggle-btn--active rf-toggle-btn--premium' : ''}`}
                  onClick={() => set('premium', true)}
                >
                  Premium
                </button>
              </div>
            </div>
          </div>

          {/* ─ Editor column ─ */}
          <div className="re-editor-col">
            <div className="rf-label">Recipe Content (steps, tips, notes…)</div>
            <div className="tiptap-wrap">
              <Toolbar editor={editor} onImage={handleEditorImage} />
              <EditorContent editor={editor} className="tiptap-body" />
            </div>
          </div>
        </div>

        <div className="re-footer">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save Recipe'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [dbCategories, setDbCategories] = useState(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState('All');
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const load = async () => {
    setLoading(true);
    const [data, cats] = await Promise.all([api.getRecipes(), api.getCategories()]);
    setRecipes(Array.isArray(data) ? data : []);
    if (Array.isArray(cats) && cats.length) setDbCategories(cats.map(c => c.name));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const cats = ['All', ...dbCategories];

  const filtered = recipes.filter(r => {
    const matchCat = filterCat === 'All' || r.category === filterCat;
    const matchSearch = !search || r.title?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSave = async (payload) => {
    if (editing?.id) await api.updateRecipe(editing.id, payload);
    else await api.createRecipe(payload);
    setShowEditor(false);
    setEditing(null);
    load();
  };

  const handleDelete = async (id) => {
    await api.deleteRecipe(id);
    setDeleting(null);
    load();
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1>Recipes</h1>
          <p>{recipes.length} total · {recipes.filter(r => r.premium).length} premium</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditing(null); setShowEditor(true); }}>
          + New Recipe
        </button>
      </div>

      {/* Toolbar */}
      <div className="rp-toolbar">
        <input
          className="rp-search"
          type="text"
          placeholder="Search recipes…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="rp-cats">
          {cats.map(cat => (
            <button
              key={cat}
              className={`cat-pill${filterCat === cat ? ' cat-pill--active' : ''}`}
              onClick={() => setFilterCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p style={{ color: 'var(--text-light)', padding: '40px 0' }}>Loading recipes…</p>
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Recipe</th>
                <th>Category</th>
                <th>Status</th>
                <th style={{ width: 140 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>No recipes found.</td></tr>
              ) : filtered.map(r => (
                <tr key={r.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {r.image && (
                        <img
                          src={`${import.meta.env.VITE_SITE_URL || 'http://localhost:5173'}${r.image}`}
                          alt=""
                          style={{ width: 52, height: 38, objectFit: 'cover', borderRadius: 4, flexShrink: 0, border: '1px solid var(--border)' }}
                        />
                      )}
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{r.title}</div>
                    </div>
                  </td>
                  <td>{r.category || '—'}</td>
                  <td>
                    {r.premium
                      ? <span className="badge badge-gold">Premium</span>
                      : <span className="badge badge-green">Free</span>
                    }
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => { setEditing(r); setShowEditor(true); }}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => setDeleting(r)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Recipe Editor */}
      {showEditor && (
        <RecipeEditor
          recipe={editing}
          categories={dbCategories}
          onSave={handleSave}
          onCancel={() => { setShowEditor(false); setEditing(null); }}
        />
      )}

      {/* Delete Confirm */}
      {deleting && (
        <div className="re-overlay" onClick={() => setDeleting(null)}>
          <div className="confirm-box" onClick={e => e.stopPropagation()}>
            <h3>Delete Recipe?</h3>
            <p style={{ color: 'var(--text-light)', margin: '8px 0 20px' }}>
              "<strong>{deleting.title}</strong>" will be permanently deleted.
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setDeleting(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleting.id)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
