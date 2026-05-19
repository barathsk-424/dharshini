import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/Home/HeroSection';
import FeaturedCategories from '../components/Home/FeaturedCategories';
import ProductShowcase from '../components/Home/ProductShowcase';
import AIDesignBuilder from '../components/Home/AIDesignBuilder';
import PriceCalculator from '../components/Home/PriceCalculator';
import GallerySection from '../components/Home/GallerySection';
import InstagramFeed from '../components/Home/InstagramFeed';
import CustomerReviews from '../components/Home/CustomerReviews';
import ShippingTracker from '../components/Home/ShippingTracker';
import AboutArtist from '../components/Home/AboutArtist';
import ContactSection from '../components/Home/ContactSection';

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <Helmet>
        <title>Dharshini Creations — Handmade Embroidery & Fabric Painting</title>
        <meta name="description" content="Premium handcrafted embroidery and fabric painting. Every stitch tells a story. Custom orders, fabric art, and embroidery works." />
      </Helmet>
      <HeroSection />
      <FeaturedCategories />
      <ProductShowcase />
      <AIDesignBuilder />
      <PriceCalculator />
      <GallerySection />
      <InstagramFeed />
      <CustomerReviews />
      <ShippingTracker />
      <AboutArtist />
      <ContactSection />
    </motion.div>
  );
}
