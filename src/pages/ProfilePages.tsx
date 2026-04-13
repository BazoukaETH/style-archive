import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ChevronRight, LogOut, Package, Heart, CreditCard, MapPin, Bell, HelpCircle, Info } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { orders } from '@/data/mockData';
import { PageTransition } from '@/components/PageTransition';

const ProfilePage = () => {
  const { items, outfitsList } = useApp();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Package, label: 'My Orders', path: '/profile/orders', badge: '2' },
    { icon: Heart, label: 'Saved Stylists', path: '/stylists' },
    { icon: CreditCard, label: 'Payment Methods', path: '#' },
    { icon: MapPin, label: 'Shipping Addresses', path: '#' },
    { icon: Bell, label: 'Notifications', path: '/profile/notifications' },
    { icon: HelpCircle, label: 'Help & Support', path: '#' },
    { icon: Info, label: 'About taqm', path: '#' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pb-24 px-5 pt-14">
        {/* Profile header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-card flex items-center justify-center mb-3">
            <span className="font-heading text-2xl font-medium">SA</span>
          </div>
          <h1 className="font-heading text-xl font-medium">Sarah Ahmad</h1>
          <p className="text-xs text-muted-foreground">sarah@email.com</p>
        </div>

        {/* Stats */}
        <div className="bg-card rounded-2xl p-4 mb-6 card-shadow">
          <div className="grid grid-cols-3 text-center">
            <div>
              <p className="font-heading text-2xl font-medium">{items.length}</p>
              <p className="label-caps">Items</p>
            </div>
            <div className="border-x border-border">
              <p className="font-heading text-2xl font-medium">{outfitsList.length}</p>
              <p className="label-caps">Outfits</p>
            </div>
            <div>
              <p className="font-heading text-2xl font-medium">{orders.length}</p>
              <p className="label-caps">Orders</p>
            </div>
          </div>
          <p className="text-center label-caps mt-3">Member since Jan 2024</p>
        </div>

        {/* Menu */}
        <div className="space-y-1">
          {menuItems.map(({ icon: Icon, label, path, badge }) => (
            <button key={label} onClick={() => navigate(path)} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-card transition-colors text-left">
              <Icon size={18} strokeWidth={1.5} className="text-muted-foreground" />
              <span className="flex-1 text-sm font-body">{label}</span>
              {badge && <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-body font-medium">{badge}</span>}
              <ChevronRight size={16} strokeWidth={1.5} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-destructive mt-4">
          <LogOut size={18} strokeWidth={1.5} />
          <span className="text-sm font-body font-medium">Sign Out</span>
        </button>
      </div>
    </PageTransition>
  );
};

const OrdersPage = () => {
  const navigate = useNavigate();
  const statusColors = { preparing: 'bg-primary/20 text-primary', shipped: 'bg-primary/20 text-primary', delivered: 'bg-success/20 text-success' };

  return (
    <PageTransition>
      <div className="min-h-screen pb-24 px-5 pt-14">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)}><ArrowLeft size={22} strokeWidth={1.5} /></button>
          <h1 className="font-heading text-xl font-medium">My Orders</h1>
        </div>
        <div className="space-y-3">
          {orders.map(order => (
            <div key={order.id} className="bg-card rounded-2xl p-4 card-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-body font-medium text-sm">#{order.orderNumber}</p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-body font-medium capitalize ${statusColors[order.status]}`}>{order.status}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{order.itemCount} tags</span>
                <span className="font-medium">${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    stylists: true, orders: true, tips: false, outfits: true, promos: false,
  });

  const toggles = [
    { key: 'stylists' as const, label: 'New stylist recommendations' },
    { key: 'orders' as const, label: 'Order updates' },
    { key: 'tips' as const, label: 'Style tips and trends' },
    { key: 'outfits' as const, label: 'Outfit suggestions' },
    { key: 'promos' as const, label: 'Promotional offers' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pb-24 px-5 pt-14">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)}><ArrowLeft size={22} strokeWidth={1.5} /></button>
          <h1 className="font-heading text-xl font-medium">Notifications</h1>
        </div>
        <div className="space-y-1">
          {toggles.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between px-4 py-4 rounded-xl">
              <span className="text-sm font-body">{label}</span>
              <button
                onClick={() => setSettings(s => ({ ...s, [key]: !s[key] }))}
                className={`w-11 h-6 rounded-full transition-colors relative ${settings[key] ? 'bg-primary' : 'bg-border'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-background absolute top-0.5 transition-transform shadow-sm ${settings[key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

import { useState } from 'react';

const TagPreviewPage = () => {
  const { id } = useParams();
  const { items } = useApp();
  const navigate = useNavigate();
  const item = items.find(i => i.id === id);

  if (!item) return null;

  return (
    <PageTransition>
      <div className="min-h-screen pb-24 px-5 pt-14">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)}><ArrowLeft size={22} strokeWidth={1.5} /></button>
          <h1 className="font-heading text-xl font-medium">Tag Preview</h1>
        </div>
        <div className="bg-card rounded-2xl p-6 card-shadow max-w-[260px] mx-auto">
          <div className="w-full aspect-square rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: item.photos[0] }}>
            <span className="label-caps opacity-40">{item.name}</span>
          </div>
          <div className="flex justify-center mb-3">
            <div className="bg-background p-3 rounded-xl">
              {/* inline QR import */}
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=taqm://item/${item.id}`} alt="QR" className="w-24 h-24" />
            </div>
          </div>
          <p className="text-center text-sm font-body font-medium">{item.name}</p>
          <p className="text-center text-xs text-muted-foreground">{item.brand}</p>
          <div className="border-t border-dashed border-border mt-4 pt-2">
            <p className="text-center label-caps">Cut along line</p>
          </div>
        </div>
        <div className="space-y-3 mt-6 max-w-[260px] mx-auto">
          <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-body font-medium">Save to Photos</button>
          <button className="w-full py-3 rounded-xl border border-border text-sm font-body font-medium">Print</button>
          <button onClick={() => navigate('/order-tags')} className="w-full text-center text-primary text-sm font-body font-medium py-2">Order Professional Tags</button>
        </div>
      </div>
    </PageTransition>
  );
};

export { ProfilePage, OrdersPage, NotificationsPage, TagPreviewPage };
