import { useState, useEffect } from 'react';
import './MeetTheTeam.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const DEFAULTS = {
  hero:   { label: 'The Real Garden Crew', title: 'Meet the Team', subtitle: 'No benefits. No complaints. No days off.', image: '/photo_6098128823703506924_y.jpg' },
  intro:  { label: 'Our People', title: 'Every Garden Has Its Cast', body: 'Behind every recipe, every harvest, every jar of something wonderful — there\'s a team. They work long hours, never ask for a raise, and bring an unmatched dedication to the job. Allow us to introduce the crew that makes Aunt Tootie\'s garden what it is.' },
  quote:  { text: 'A garden is never the work of one. It is a collaboration with everything alive.' },
  member1: { name: 'The Head of Pollination',  title: 'Bumblebee, Senior Partner',                  bio: 'Tireless, fuzzy, and absolutely essential. Shows up every single day without being asked, asks for nothing in return except a good flower. The unsung backbone of every harvest.',                                                         image: '/DSC00341.JPG' },
  member2: { name: 'The Creative Director',    title: 'Garden Visitor, Chief Aesthetic Officer',    bio: 'Brings unmatched beauty to the workplace and keeps morale high. Never misses a bloom. Has never once complained about the commute.',                                                                                                      image: '/DSC00550.JPG' },
  member3: { name: 'The Quiet Achiever',       title: 'Pollinator, Operations Lead',                bio: 'Works in the background, rarely takes credit, and gets more done before 9am than most do all day. The garden simply would not function without this one.',                                                                              image: '/IMG_1072 (1).JPEG' },
  member4: { name: 'The Free Spirit',          title: 'Butterfly, Roving Ambassador',               bio: 'Floats through the garden on their own schedule, touches everything lightly, and somehow improves every corner they visit. Official morale officer.',                                                                                   image: '/IMG_5289.jpeg' },
  member5: { name: 'The Garden Itself',        title: 'Co-Founder & Silent Partner',                bio: 'Patient, generous, and endlessly giving. Does not ask for recognition — only intention, water, and a little time. The original teacher behind everything grown here.',                                                                  image: '/photo_6098128823703506918_y.jpg' },
  member6: { name: 'The Harvest Table',        title: 'Head of Output & Delivery',                  bio: 'Where it all comes together. Every seed planted, every pollinator visit, every careful harvest lands here. The reason for all of it.',                                                                                                  image: '/photo_6098128823703506920_y.jpg' },
};

export default function MeetTheTeam() {
  const [c, setC] = useState(DEFAULTS);

  useEffect(() => {
    fetch(`${API}/content/team`)
      .then(r => r.json())
      .then(data => {
        if (data && !data.message) setC(prev => ({ ...prev, ...data }));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    function onMessage(e) {
      if (e.data?.type === 'PREVIEW_UPDATE') {
        setC(prev => ({ ...prev, ...e.data.content }));
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const members = [1, 2, 3, 4, 5, 6].map(n => c[`member${n}`]).filter(Boolean);

  return (
    <main className="mtt-page page-enter">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src={c.hero?.image || '/photo_6098128823703506924_y.jpg'} alt="Garden" />
          <div className="page-hero-overlay" />
        </div>
        <div className="page-hero-content container">
          <p className="section-label page-hero-label">{c.hero?.label}</p>
          <h1 className="page-hero-title">{c.hero?.title}</h1>
          <p className="page-hero-sub">{c.hero?.subtitle}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="mtt-intro section-pad">
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <p className="section-label">{c.intro?.label}</p>
          <h2>{c.intro?.title}</h2>
          <div className="divider divider-center" />
          <p className="mtt-intro-text">{c.intro?.body}</p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="mtt-grid-section section-pad" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="mtt-grid">
            {members.map((member, i) => (
              <div key={i} className="mtt-card">
                <div className="mtt-card-img-wrap">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="mtt-card-body">
                  <p className="mtt-card-title">{member.title}</p>
                  <h3 className="mtt-card-name">{member.name}</h3>
                  <div className="divider" />
                  <p className="mtt-card-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing quote */}
      <section className="mtt-quote">
        <div className="container-narrow">
          <blockquote className="pull-quote">
            <p>"{c.quote?.text}"</p>
            <cite>— Aunt Tootie</cite>
          </blockquote>
        </div>
      </section>
    </main>
  );
}
