import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useUIStore } from './store/useStore';
import Layout from './components/Layout/Layout';
import OpeningAnimation from './components/OpeningAnimation';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Shop from './pages/Shop';
import CustomOrders from './pages/CustomOrders';
import Pricing from './pages/Pricing';
import Reviews from './pages/Reviews';
import TrackOrder from './pages/TrackOrder';
import About from './pages/About';
import Contact from './pages/Contact';
import CustomCursor from './components/UI/CustomCursor';

function App() {
  const location = useLocation();
  const { showOpeningAnimation } = useUIStore();

  if (showOpeningAnimation) {
    return <OpeningAnimation />;
  }

  return (
    <>
      <CustomCursor />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/custom-orders" element={<CustomOrders />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </>
  );
}

export default App;
