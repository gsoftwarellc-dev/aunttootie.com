import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopBtn from './components/ScrollToTop';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import Magazine from './pages/Magazine';
import Garden from './pages/Garden';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Services from './pages/Services';
import Subscribe from './pages/Subscribe';
import MeetTheTeam from './pages/MeetTheTeam';

function ComingSoon({ title }) {
  return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem' }}>{title}</h1>
        <p style={{ color: 'var(--grey)' }}>Coming soon.</p>
      </div>
    </main>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppInner() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:slug" element={<RecipeDetail />} />
        <Route path="/magazine" element={<Magazine />} />
        <Route path="/products" element={<ComingSoon title="Products" />} />
        <Route path="/garden" element={<Garden />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/meet-the-team" element={<MeetTheTeam />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <ScrollToTopBtn />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
