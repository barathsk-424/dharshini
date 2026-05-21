import Navbar from './Navbar';
import Footer from './Footer';
import MobileNav from './MobileNav';
import WhatsAppFloat from '../UI/WhatsAppFloat';
import CartDrawer from '../UI/CartDrawer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#050505' }}>
      <Navbar />
      <main className="flex-1 pt-[72px] pb-16 lg:pb-0">
        {children}
      </main>
      <Footer />
      <MobileNav />
      <WhatsAppFloat />
      <CartDrawer />
    </div>
  );
}
