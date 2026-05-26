import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AdminRoutes from './admin/AdminRoutes';
import { AnimatePresence } from 'framer-motion';
import { useUIStore } from './store/useStore';
import Layout from './components/Layout/Layout';
import Orders from './pages/Orders';
import Designs from './pages/Designs';
import Wishlist from './pages/Wishlist';
import ProfileSettings from './pages/ProfileSettings';
import Activity from './pages/Activity';
import Notifications from './pages/Notifications';
import Addresses from './pages/Addresses';
import Support from './pages/Support';
import Logout from './pages/Logout';
import OpeningAnimation from './components/OpeningAnimation';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Pricing from './pages/Pricing';
import Reviews from './pages/Reviews';
import TrackOrder from './pages/TrackOrder';
import About from './pages/About';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import ProductCustomize from './pages/ProductCustomize';
import OrderReview from './pages/OrderReview';
import CustomCursor from './components/UI/CustomCursor';

function App() {
  const location = useLocation();
  const { showOpeningAnimation } = useUIStore();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (showOpeningAnimation) {
    return <OpeningAnimation />;
  }

  if (isAdminRoute) {
    return <AdminRoutes />;
  }

  return (
    <>
      <CustomCursor />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<ProductDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/orders" element={<Orders />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/designs" element={<Designs />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/addresses" element={<Addresses />} />
          <Route path="/support" element={<Support />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/customize/:id" element={<ProductCustomize />} />
            <Route path="/review/:id" element={<OrderReview />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </>
  );
}

export default App;
