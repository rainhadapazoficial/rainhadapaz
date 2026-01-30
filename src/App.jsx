import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { useEffect, useState } from 'react'
import { getConfig } from './services/contentService'
import { injectTrackingScripts, updateSEO } from './services/seoService'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import News from './pages/News'
import Events from './pages/Events'
import Multimedia from './pages/Multimedia'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import PrayerRequest from './pages/PrayerRequest'
import DailyLiturgy from './pages/DailyLiturgy'
import DailySaint from './pages/DailySaint'
import Donate from './pages/Donate'
import NewsDetail from './pages/NewsDetail'
import EventDetail from './pages/EventDetail'
import FormationPath from './pages/FormationPath'

function App() {
  const [siteConfig, setSiteConfig] = useState(null);

  useEffect(() => {
    const loadConfig = async () => {
      const config = await getConfig();
      setSiteConfig(config);

      // Injetar Scripts (Analytics, Pixel, GTM)
      injectTrackingScripts(config);

      // SEO Global Inicial
      updateSEO({
        siteTitle: config.siteTitle,
        description: config.seo_description
      });
    };
    loadConfig();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/noticias" element={<News />} />
            <Route path="/noticia/:id" element={<NewsDetail />} />
            <Route path="/evento/:id" element={<EventDetail />} />
            <Route path="/formacao" element={<FormationPath />} />
            <Route path="/eventos" element={<Events />} />
            <Route path="/multimidia" element={<Multimedia />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/pedido-oracao" element={<PrayerRequest />} />
            <Route path="/liturgia" element={<DailyLiturgy />} />
            <Route path="/santo-dia" element={<DailySaint />} />
            <Route path="/colabore" element={<Donate />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
