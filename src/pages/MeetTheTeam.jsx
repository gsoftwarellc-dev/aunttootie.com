import './MeetTheTeam.css';

const team = [
  {
    img: '/DSC00341.JPG',
    name: 'The Head of Pollination',
    title: 'Bumblebee, Senior Partner',
    bio: 'Tireless, fuzzy, and absolutely essential. Shows up every single day without being asked, asks for nothing in return except a good flower. The unsung backbone of every harvest.',
  },
  {
    img: '/DSC00550.JPG',
    name: 'The Creative Director',
    title: 'Garden Visitor, Chief Aesthetic Officer',
    bio: 'Brings unmatched beauty to the workplace and keeps morale high. Never misses a bloom. Has never once complained about the commute.',
  },
  {
    img: '/IMG_1072 (1).JPEG',
    name: 'The Quiet Achiever',
    title: 'Pollinator, Operations Lead',
    bio: 'Works in the background, rarely takes credit, and gets more done before 9am than most do all day. The garden simply would not function without this one.',
  },
  {
    img: '/IMG_5289.jpeg',
    name: 'The Free Spirit',
    title: 'Butterfly, Roving Ambassador',
    bio: 'Floats through the garden on their own schedule, touches everything lightly, and somehow improves every corner they visit. Official morale officer.',
  },
  {
    img: '/photo_6098128823703506918_y.jpg',
    name: 'The Garden Itself',
    title: 'Co-Founder & Silent Partner',
    bio: 'Patient, generous, and endlessly giving. Does not ask for recognition — only intention, water, and a little time. The original teacher behind everything grown here.',
  },
  {
    img: '/photo_6098128823703506920_y.jpg',
    name: 'The Harvest Table',
    title: 'Head of Output & Delivery',
    bio: 'Where it all comes together. Every seed planted, every pollinator visit, every careful harvest lands here. The reason for all of it.',
  },
];

export default function MeetTheTeam() {
  return (
    <main className="mtt-page page-enter">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="/photo_6098128823703506924_y.jpg" alt="Garden" />
          <div className="page-hero-overlay" />
        </div>
        <div className="page-hero-content container">
          <p className="section-label page-hero-label">The Real Garden Crew</p>
          <h1 className="page-hero-title">Meet the Team</h1>
          <p className="page-hero-sub">No benefits. No complaints. No days off.</p>
        </div>
      </section>

      {/* Intro */}
      <section className="mtt-intro section-pad">
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <p className="section-label">Our People</p>
          <h2>Every Garden Has Its Cast</h2>
          <div className="divider divider-center" />
          <p className="mtt-intro-text">
            Behind every recipe, every harvest, every jar of something wonderful — there's a team.
            They work long hours, never ask for a raise, and bring an unmatched dedication to the job.
            Allow us to introduce the crew that makes Aunt Tootie's garden what it is.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="mtt-grid-section section-pad" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="mtt-grid">
            {team.map((member) => (
              <div key={member.name} className="mtt-card">
                <div className="mtt-card-img-wrap">
                  <img src={member.img} alt={member.name} />
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
            <p>"A garden is never the work of one. It is a collaboration with everything alive."</p>
            <cite>— Aunt Tootie</cite>
          </blockquote>
        </div>
      </section>
    </main>
  );
}
