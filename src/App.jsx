import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

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

function App() {
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
            <Route path="/eventos" element={<Events />} />
            <Route path="/multimidia" element={<Multimedia />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/pedido-oracao" element={<PrayerRequest />} />
            <Route path="/liturgia" element={<DailyLiturgy />} />
            <Route path="/santo-dia" element={<DailySaint />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
