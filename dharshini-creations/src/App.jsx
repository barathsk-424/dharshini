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
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation();
  const { showOpeningAnimation } = useUIStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (showOpeningAnimation) {
    return <OpeningAnimation />;
  }

  return (
    <>
      <CustomCursor />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/"            element={<Home />} />
            <Route path="/shop"        element={<Shop />} />
            <Route path="/shop/:id"    element={<ProductDetail />} />
            <Route path="/pricing"     element={<Pricing />} />
            <Route path="/reviews"     element={<Reviews />} />
            <Route path="/about"       element={<About />} />
            <Route path="/contact"     element={<Contact />} />
            <Route path="/auth"        element={<Auth />} />
            <Route path="/customize/:id" element={<ProductCustomize />} />

            {/* Protected Routes */}
            <Route path="/orders"          element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/track-order"     element={<ProtectedRoute><TrackOrder /></ProtectedRoute>} />
            <Route path="/designs"         element={<ProtectedRoute><Designs /></ProtectedRoute>} />
            <Route path="/wishlist"        element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
            <Route path="/profile-settings" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
            <Route path="/activity"        element={<ProtectedRoute><Activity /></ProtectedRoute>} />
            <Route path="/notifications"   element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/addresses"       element={<ProtectedRoute><Addresses /></ProtectedRoute>} />
            <Route path="/support"         element={<ProtectedRoute><Support /></ProtectedRoute>} />
            <Route path="/checkout"        element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/review/:id"      element={<ProtectedRoute><OrderReview /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </>
  );
}

export default App;
