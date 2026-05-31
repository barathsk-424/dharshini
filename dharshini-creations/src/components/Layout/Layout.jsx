import Navbar from './Navbar';
import Footer from './Footer';
import MobileNav from './MobileNav';
import WhatsAppFloat from '../UI/WhatsAppFloat';
import CartDrawer from '../UI/CartDrawer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#050505' }}>
      <Navbar />
      <main className="flex-1 pt-[64px] sm:pt-[72px] pb-20 lg:pb-0 mobile-safe-bottom">
        {children}
      </main>
      <Footer />
      <MobileNav />
      <WhatsAppFloat />
      <CartDrawer />
    </div>
  );
}
