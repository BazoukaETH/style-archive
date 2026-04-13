import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { PageTransition } from '@/components/PageTransition';
import ItemPhoto from '@/components/ItemPhoto';

const OrderTagsSelectPage = () => {
  const { items } = useApp();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  return (
    <PageTransition>
      <div className="min-h-screen pb-32 px-5 pt-14">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate(-1)}><ArrowLeft size={22} strokeWidth={1.5} /></button>
          <h1 className="font-heading text-xl font-medium">Order Printed Tags</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Select items you want professional tags for</p>

        <div className="grid grid-cols-3 gap-2">
          {items.map(item => {
            const isSelected = selected.includes(item.id);
            return (
              <button key={item.id} onClick={() => toggle(item.id)} className="relative">
                <ItemPhoto color={item.photos[0]} name="" className="aspect-square rounded-lg" />
                {isSelected && (
                  <div className="absolute inset-0 rounded-lg bg-primary/30 flex items-center justify-center">
                    <Check size={20} strokeWidth={2} className="text-primary-foreground" />
                  </div>
                )}
                <p className="text-[10px] font-body truncate mt-1">{item.name}</p>
              </button>
            );
          })}
        </div>

        <div className="fixed bottom-20 left-0 right-0 px-5 py-4 bg-background/95 backdrop-blur-sm border-t border-border z-40">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">{selected.length} items selected</span>
            <span className="font-heading text-lg font-medium">${(selected.length * 3.5).toFixed(2)}</span>
          </div>
          <button disabled={selected.length === 0} onClick={() => navigate('/order-tags/shipping', { state: { selected } })}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-body font-medium text-sm disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </PageTransition>
  );
};

const OrderTagsShippingPage = () => {
  const navigate = useNavigate();
  return (
    <PageTransition>
      <div className="min-h-screen pb-24 px-5 pt-14">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)}><ArrowLeft size={22} strokeWidth={1.5} /></button>
          <h1 className="font-heading text-xl font-medium">Shipping Address</h1>
        </div>
        <div className="space-y-4">
          {['Full Name', 'Phone Number', 'Address Line 1', 'Address Line 2', 'City', 'Postal Code'].map(field => (
            <div key={field}>
              <label className="label-caps mb-1.5 block">{field}</label>
              <input className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm font-body focus:outline-none focus:ring-1 focus:ring-primary" placeholder={field} />
            </div>
          ))}
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded border border-border bg-card flex items-center justify-center">
              <Check size={12} strokeWidth={2} className="text-primary" />
            </div>
            <span className="text-sm font-body">Save as default address</span>
          </div>
          <button onClick={() => navigate('/order-tags/review')} className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-body font-medium text-sm mt-4">Review Order</button>
        </div>
      </div>
    </PageTransition>
  );
};

const OrderTagsReviewPage = () => {
  const navigate = useNavigate();
  return (
    <PageTransition>
      <div className="min-h-screen pb-24 px-5 pt-14">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)}><ArrowLeft size={22} strokeWidth={1.5} /></button>
          <h1 className="font-heading text-xl font-medium">Review Order</h1>
        </div>

        <div className="bg-card rounded-2xl p-5 card-shadow mb-4 space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Tags</span><span>4 items</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Price per tag</span><span>$3.50</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>$14.00</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>$5.00</span></div>
          <div className="border-t border-border pt-3 flex justify-between font-medium"><span>Total</span><span className="font-heading text-xl">${19.00}</span></div>
        </div>

        <div className="bg-card rounded-2xl p-5 card-shadow mb-4">
          <span className="label-caps block mb-2">Payment Method</span>
          <div className="flex items-center gap-3 p-3 rounded-xl border border-border">
            <div className="w-10 h-7 rounded bg-foreground/10" />
            <span className="text-sm font-body">•••• •••• •••• 4242</span>
          </div>
        </div>

        <button onClick={() => navigate('/order-tags/confirmation')} className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-body font-medium text-sm">Place Order</button>
      </div>
    </PageTransition>
  );
};

const OrderTagsConfirmPage = () => {
  const navigate = useNavigate();
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24">
        <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-6">
          <Check size={32} strokeWidth={1.5} className="text-success" />
        </div>
        <h2 className="font-heading text-2xl font-medium mb-2">Order Placed!</h2>
        <p className="text-muted-foreground text-sm mb-1">Order #CT-20240115</p>
        <p className="text-muted-foreground text-sm mb-8">Estimated delivery: 3-5 business days</p>
        <div className="w-full space-y-3">
          <button className="w-full py-3 rounded-xl border border-border text-sm font-body font-medium">Track Order</button>
          <button onClick={() => navigate('/home')} className="w-full text-center text-muted-foreground text-sm py-2">Continue Shopping</button>
        </div>
      </div>
    </PageTransition>
  );
};

export { OrderTagsSelectPage, OrderTagsShippingPage, OrderTagsReviewPage, OrderTagsConfirmPage };
