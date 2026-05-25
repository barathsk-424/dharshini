import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/Home/HeroSection';
import FeaturedCategories from '../components/Home/FeaturedCategories';
import ProductShowcase from '../components/Home/ProductShowcase';
import CustomerReviews from '../components/Home/CustomerReviews';
import ShippingTracker from '../components/Home/ShippingTracker';
import AboutArtist from '../components/Home/AboutArtist';
import ContactSection from '../components/Home/ContactSection';

/* Subtle decorative divider between sections */
function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.25))' }} />
      <div className="w-1.5 h-1.5 rounded-full mx-4" style={{ background: 'rgba(167,139,250,0.4)' }} />
      <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(90deg, rgba(167,139,250,0.25), transparent)' }} />
    </div>
  );
}

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <Helmet>
        <title>Dharshini Creations — Handmade Embroidery & Fabric Painting</title>
        <meta name="description" content="Premium handcrafted embroidery and fabric painting. Every stitch tells a story. Custom orders, fabric art, and embroidery works." />
      </Helmet>
      <HeroSection />
      <SectionDivider />
      <FeaturedCategories />
      <SectionDivider />
      <ProductShowcase />
      <SectionDivider />
      <CustomerReviews />
      <SectionDivider />
      <ShippingTracker />
      <SectionDivider />
      <AboutArtist />
      <SectionDivider />
      <ContactSection />
    </motion.div>
  );
}
